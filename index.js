const express = require("express");
const { PORT, NODE_ENV } = require("./config/config");
require("./config/database");
require("./services/passport");

const app = express();
const bodyParser = require("body-parser");
//const cors = require("cors");

//app.use(cors());
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
// parse various different custom JSON types as JSON
app.use(bodyParser.json());

// import function and immediately invoke
require("./config/session")(app);
require("./routes/authRoutes")(app);
require("./routes/surveyRoutes")(app);

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get("/hi", (req, res, next) => {
  res.send({msg: 'This is CORS-enabled for a Single Route'})
});

if(NODE_ENV === 'production')     {
  // express will serve up production assets
  // like our main.js file or main.css
  app.use(express.static('client/build'));

  // Expres will serve up index.html
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log("Listing on port: 5000"));
