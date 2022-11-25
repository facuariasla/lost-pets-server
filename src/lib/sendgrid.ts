import 'dotenv/config';
import * as sgMail from '@sendgrid/mail';

export interface Message {
  to: string,
  from: string,
  subject: string,
  text?: string,
  html: string
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (msg: Message) => {
  try {
    await sgMail.send(msg);
    console.log("Message send successfully!");
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

