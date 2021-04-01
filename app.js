require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/", (req, res) => {
  let from = req.body.from_email;
  //   let to = req.body.to_email;
  let sub = req.body.subject;
  let msg = req.body.message;
  let msgToSend = `From: ${from} \n` + msg;

  let mailOptions = {
    from: from,
    to: process.env.EMAIL,
    subject: sub,
    text: msgToSend,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      res.send("MESSAGE CAN'T SEND");
    } else {
      res.send("MESSAGE SENT");
    }
  });
});
app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
