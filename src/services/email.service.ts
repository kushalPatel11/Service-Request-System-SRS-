import {injectable, BindingScope} from '@loopback/core';
import nodemailer from 'nodemailer';

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  constructor() {}

  async sendOTP(email: string, otp: number): Promise<void> {
    // Create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
      auth: {
        user: 'kushalpatel1218@gmail.com',
        pass: 'AF53599083CA0DD2934CF4D6F158B84672BA',
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'kushalpatel1218@gmail.com',
      to: email,
      subject: 'OTP Verification',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <span style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #000;text-decoration:none;font-weight:600">Service Genie</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following OTP to reset your password. OTP is valid for 5 minutes.</p>
    <span>
    <span style="width:min-content; background: #000; font-weight:700; font-size:24px; margin: 0 auto;  padding: 5px 10px;color: #fff;border-radius: 4px;">${otp}</span>
    </span>
      <p style="font-size:0.9em;">Regards,<br />Service Genie</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Service Genie Inc</p>
      <p>416 Summit Ave</p>
      <p>Arlington</p>
    </div>
  </div>
</div>`,
      // text: `Your OTP is: ${otp}, \nIt will expire in 5 Minutes`,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
