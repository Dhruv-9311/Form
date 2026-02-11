const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
  try {
    console.log("📧 Starting email send process...");
    console.log(`📨 To: ${to}`);
    console.log(`📝 Subject: ${subject}`);
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhruvrajput9560@gmail.com",       
        pass: "tjac rtrd ersn puwk" 
      }
    });

    const mailOptions = {
      from: "dhruvrajput9560@gmail.com",
      to: to,
      subject: subject,
      text: message
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email Sent Successfully!");
    console.log("📋 Message ID:", info.messageId);
    console.log("📬 Gmail Response:", info.response);
    console.log("🔗 Preview URL:", info.previewUrl);
    
    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
      previewUrl: info.previewUrl
    };
    
  } catch (error) {
    console.log("❌ Error sending email:", error.message);
    console.log("🔍 Full error:", error);
    
    return {
      success: false,
      error: error.message,
      fullError: error
    };
  }
};

module.exports = sendEmail;
