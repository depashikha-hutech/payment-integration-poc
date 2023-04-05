const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let db = require("./model/db");
const cors = require("cors");
const paymentroutes = require("./controller/payment");
const smsroutes = require("./controller/sms");
require("dotenv").config();
const port = process?.env?.port || 4004;
app.use(bodyParser.json());
app.use(cors());
db.sequelize
  .authenticate()
  .then(() => {
    console.error(
      `payment connected to  ${ process?.env?.SERVERHOST || "NA" } database "${process?.env?.DBNAME || "NA"}"`
      );

    // db.sequelize.sync({ force:true});
     db?.sequelize?.sync({ alter:true});
  })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
  });
app.get("/", (req, res)=> {
    res.send("welcome to payment");
});
app.use("/sms", smsroutes)
app.use("/payment", paymentroutes)
app.listen(port, (err)  => {
  if (!err) {
    console.log("server is running at port 4004");
  }
});