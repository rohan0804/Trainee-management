module.exports = function(email, text) {
  let mailOptions = {};
  (mailOptions.from = "rohanshrivastav1999@gmail.com"),
    (mailOptions.to = email),
    (mailOptions.subject = `Mail From Mentor`),
    (mailOptions.html = `
                      <p>Dear,<p>
                      <p>Mentor send you a mail</p>
                      <p>${text}</p>

                      <p>From Mentor</p>
                      <p>regards</p>`);
  return mailOptions;
};
