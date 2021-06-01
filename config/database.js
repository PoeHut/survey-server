const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
 // () => console.log("Connect to mongo successfully")
)
.then(() => console.log("Connect to mongo successfully"))
.catch(err => {
  console.log("Cannot connect to database server");
  process.exit();
})
