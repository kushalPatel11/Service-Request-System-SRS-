import {AuthenticationStrategy, TokenService} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, Request, RestBindings} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {TokenServiceBindings} from '../../keys';
import {UserSession, User} from '../../models';
import {UserSessionRepository, UserRepository} from '../../repositories';
import {UserService} from '../user.service';

export type AuthCredentials = {
  user: User;
  session: UserSession;
  usertType: string;
};

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: TokenService,
    @repository(UserSessionRepository)
    public userSessionRepository: UserSessionRepository,
    @repository(UserRepository)
    public usersRepository: UserRepository,
    @service(UserService)
    public userService: UserService,
  ) {}

  async authenticate(
    request: Request,
  ): Promise<UserProfile | AuthCredentials | undefined | any> {
    return this.performJWTStrategy(request);
  }

  async performJWTStrategy(request: Request) {
    if (!request.headers.authorization) {
      throw new HttpErrors[401](`Authorization Header not found.`);
    }

    const authHeaderValue = <string>request.headers.authorization;
    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors[401](`Authorization header is not of type 'Bearer'`);
    }

    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2) {
      throw new HttpErrors[401](
        `Authorization value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
    }

    try {
      const token = parts[1];

      const session: any = <UserSession>(
        await this.userSessionRepository.findSessionByToken(token)
      );

      const userProfile: UserProfile =
        await this.tokenService.verifyToken(token);

      let user = await this.userService.findUserById(userProfile[securityId]);
      return {
        user,
        session,
        usertype: user.userType,
      };
    } catch (err: any) {
      throw new HttpErrors[400](err);
    }
  }
}
