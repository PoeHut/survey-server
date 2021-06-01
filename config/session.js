const session = require("express-session");
const passport = require("passport");

module.exports = (app) => {
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 
      }
    })
  );

  // wire up passport to use session to handle authentication.
  app.use(passport.initialize());
  app.use(passport.session());
};
