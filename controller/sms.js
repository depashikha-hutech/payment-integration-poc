 const express = require("express");
 const route = express.Router();
 const { getTemplate,sendSMS} = require("../utility/sms");
 route.get("/", (req, res)=> {
     res.send("welcome to sms integregation");
 });

 route.post("/api/get-sms", async (req, res)=>{ 
     const template = await getTemplate(req?.body?.id);
    const smsSent=await sendSMS({to:req?.body?.to,message:template?.text})
    res.status(200).json(smsSent);
  });
 module.exports = route;
