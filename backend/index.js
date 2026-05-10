require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)

.then(() => {

  console.log("MongoDB Connected");

})

.catch((error) => {

  console.log(error);

});

const emailSchema = new mongoose.Schema({

  subject: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  recipients: {
    type: Array,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  sentAt: {
    type: Date,
    default: Date.now,
  },

});

const Email = mongoose.model("Email", emailSchema);

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,

  },

});

app.post("/send-email", async (req, res) => {

  try {

    const { subject, body, recipients } = req.body;

    if (!subject || !body || !recipients.length) {

      return res.status(400).json({

        message: "All fields are required",

      });

    }

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: recipients,

      subject: subject,

      text: body,

    });

    const newEmail = new Email({

      subject,

      body,

      recipients,

      status: "Success",

    });

    await newEmail.save();

    res.status(200).json({

      message: "Emails Sent Successfully",

    });

  } catch (error) {

    console.log(error);

    const failedEmail = new Email({

      subject: req.body.subject,

      body: req.body.body,

      recipients: req.body.recipients,

      status: "Failed",

    });

    await failedEmail.save();

    res.status(500).json({

      message: "Failed to Send Emails",

    });

  }

});

app.get("/history", async (req, res) => {

  try {

    const emails = await Email.find()

      .sort({ sentAt: -1 });

    res.status(200).json(emails);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Failed to Fetch History",

    });

  }

});

app.get("/", (req, res) => {

  res.send("BulkMail Backend Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server Running on Port ${PORT}`);

});
