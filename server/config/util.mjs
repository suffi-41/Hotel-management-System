import bcrypt from 'bcrypt';
import otpGenerator from "otp-generator"

// conver password to hash format
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// compare password with hash password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const otpSender = async (id, ModelName, mailFunction) => {
  try {
    const user = await ModelName.findById(id, { email: 1 });
    const { email } = await user;
    if (user) {
      const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
      user.otp = otp;
      await user.save();
      const subject = "Verify your account";
      const mailSms = `Your One Time Password is ${otp} don't share otp (One Time Password) with anyone!`;
      const mailInfo = await mailFunction(email, subject, mailSms)
      console.log(mailInfo)
      if (mailInfo) {
        console.log(mailInfo)
        return { status: true, "message": "Verification code sent successfully on your mail" };
      }

      // setTimeout(() => {
      //     user.otp = null;
      //     user.save();
      // }, 1000 * 2);
    }

    else {
      return { status: false, "message": "Some error ocupied" };
    }
  } catch (error) {
    console.log(error)
    return { status: false, "message": "Some error ocupied" };
  }
}
