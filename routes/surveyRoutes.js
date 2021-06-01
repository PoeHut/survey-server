const isLoggedIn = require("../middleware/auth");
const mongoose = require("mongoose");
require("../models/Survey");

const Survey = mongoose.model("survey");

module.exports = (app) => {

  app.post("/api/survey", isLoggedIn, async (req, res) => {

    
    const { title, subject, body, recipients } = req.body;
    console.log("Body Data ==>", req.body)
    await new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    }).save();

  });

};
