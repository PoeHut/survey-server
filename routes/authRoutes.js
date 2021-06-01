const passport = require("passport");
const isLoggedIn = require("../middleware/auth");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"),
    (req, res) => {
      res.redirect('/survey')
    }
  );

  app.get("/api/auth/success", isLoggedIn, (req, res) => {
    res.send(req.user);
  });

  app.get("/api/auth/failure", (req, res) => {
    res.send("Something went wrong. Failure ur login.");
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
