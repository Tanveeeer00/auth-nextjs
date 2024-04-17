import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //Todo: Configure mail for usage
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c60b33b39eba59", // env variable
        pass: "7bac48df349797", // env variable
      },
    });
    const mailOptions = {
      from: "tanveer@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      text: "Hello world?", // plain text body
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}</p>`, // html body
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
