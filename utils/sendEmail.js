const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "Gmail",
	secure: true,
	auth: {
		user: "epay.online.transfer@gmail.com",
		pass: "yonulhvcllpcejgx",
	},
});

async function sendEmail(email) {
	try {
		const a = await transporter.sendMail({
			from: "epay.online.transfer@gmail.com",
			to: email.email,
			subject: email.subject,
			text: email.text,
			html: email.html,
		});
		console.log(a);
		console.log("Email sent successfully");
	} catch (error) {
		console.log("Error sending email", error);
	}
}

module.exports = sendEmail;
