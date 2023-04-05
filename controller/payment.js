const crypto = require("crypto");
const express = require("express");
const route = express.Router();
const { getPayUrl, initiateTransaction, dopost,statuscheck, updatedata } = require("../utility/payment");
route.get("/", (req, res)=> {
    res.send("welcome to payment");
});
//get url
 route.post("/easypay/get-pay-url", async (req, res) => {
   const { userId, amount, planId } = req?.body;
const initiatedInfo = await initiateTransaction(userId, planId, amount);
console.log({initiatedInfo});
if (userId && planId && amount && initiatedInfo?.orderId){
let url = getPayUrl(initiatedInfo?.sscode,initiatedInfo?.orderId,amount);
    res.send({url});
}
else{
  res.status(400).json({error: "bad request"})
}
 });
 //get acesstoken
route.post("/easypay/get-token", async (req, res)=>{
  const { username, password} = req?.body;
  const acessInfo = await dopost( req?.body?.username,req?.body?.password);
  if(username && password){
res.status(200).json(acessInfo)
  }
  else{
  res.status(400).json({error: "bad request"})
  }
})
//checkstatus
route.post("/easypay/get-status", async (req, res)=>{
  const token=req?.headers["authorization"].split(" ")[1]
  const{ mobile, orderId} = req?.body;
  const statusInfo = await statuscheck(req?.body.mobile, req?.body?.orderId, token);
if(mobile && orderId){
  res.status(200).json(statusInfo);
}
else{
  res.status(400).json({error: "bad request"})
}
})
//status update
route.post("/easypay/get-updated", async (req, res)=>{
  const transInfo = await updatedata(req?.body);
  res.status(200).json(transInfo);
})
module.exports = route;