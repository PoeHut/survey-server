//middleware for auth
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.send({ error: "You need to login." });
};

module.exports = isLoggedIn;
