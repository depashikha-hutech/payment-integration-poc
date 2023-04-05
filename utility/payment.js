const fetch = require("node-fetch")
const crypto = require("crypto");
const db = require('../model/db');
const { post } = require("../controller/payment");
const axios = require('axios');
require("dotenv")?.config();
const env = process?.env
function getPayUrl (sscode, orderId, amount) {
  const secret = env?.EPSECRET;
  const CPCODE = env?.CPCODE;
  const MOBILENUMBER = "7036430358";
    const rawData = `${CPCODE}|${sscode}|${amount}|${MOBILENUMBER}|${orderId}`;
let hmac = crypto.createHmac("SHA512", Buffer.from(secret, "hex"));
//passing the data to be hashed
const checksumData = hmac.update(rawData).digest("base64");
let url = `https://uat5yesmoney.easypay.co.in:5043/epyesbc/easypaygateway/v1?checksum=${checksumData}&cpcode=${CPCODE}&sscode=${sscode}&amount=${amount}&mobile=${MOBILENUMBER}&txnid=${orderId}&returnUrl=https://zefayar.hutechweb.com/dashboard`;
return url;
}
async function initiateTransaction(userId,planId,amount){
 try {
  sscode = parseInt(new Date().valueOf());
  orderId = "EPTXN061" + sscode;
  const initiated = db?.Subscription?.create({
    userID:userId,
    planID:planId,
    amount,
    sscode,
    orderId:orderId,
  });
  if (initiated){
    return { sscode, orderId };
  }else {
    return {};
  }
 } catch (error) {
  console.log(error);
 }
  }
  async function dopost(username, password) {
    try {
var auth = 'Basic ' + new Buffer.from(username + ':' + password).toString('base64');

var hash = {'Authorization': auth};
var hashing = hash.Authorization;

  var config = {
    method: 'post',
    url: 'https://uat5yesmoney.easypay.co.in:5043/epMoney/oauth/token?grant_type=client_credentials',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': hashing
    }
  };
      let res = await axios(config)
      let data = res?.data;
      return data
    } catch (error) {
      console.log(error);
    }
  }
  async function statuscheck(mobile,orderId,token){
    try{
      var data = JSON.stringify ({ 
                    "CUSTOMER_MOBILE": mobile,
                   "REQUEST_REFERENCE_NO":orderId,
                   "CPCODE": env?.CPCODE
      });
      var config = {
         method:'post',
         url:' https://uat5yesmoney.easypay.co.in:5043/epMoney/transaction-status/gateway/v1.0/',
         headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
         },
         data : data
      };
      let read = await axios(config)
      let status = read.data;
      console.log({status});
      if(status?.RESP_CODE==='111'){
        return status
      }else{
        transactionDetails = await updatedata({
          TXN_STATUS:status?.DATA?.TRANSACTION_STATUS,
          RESP_MSG:status?.DATA?.TRANSACTION_STATUSMESSAGE,
          RES_CODE:status?.DATA?.RESP_CODE,
          RRN:status?.DATA?.REQUEST_REFERENCE_NO
        })
          return transactionDetails
      }
    }catch (error){
      console.log(error);
      return {}
    } 
  }
  async function updatedata(transactionDetails){
    try{
      const updateDetails={
        status:transactionDetails?.TXN_STATUS,
        message: transactionDetails?.RESP_MSG,
        resCode:transactionDetails?.RES_CODE,
        rrn: transactionDetails?.RRN
      }
      const updatedData = await db?.Subscription?.update(updateDetails, { where:{orderId:transactionDetails?.RRN} });
      if(updatedData[0]===1){
        return {
          "RESP_CODE": 300,
          "RESPONSE": "Success",
          "RESP_MSG": "Status Updated Successfully"
        }
      }else{
        return {
        "RESP_CODE": 302,
        "RESPONSE": "Failed",
        "RESP_MSG": "Transaction Failed"
        } 
      }
    }catch (error){
          console.log(error);
          return {
            "RESP_CODE": 302,
            "RESPONSE": "Failed",
            "RESP_MSG": "Transaction Failed"
            } 
          }
        }
 module.exports = { getPayUrl, initiateTransaction,dopost,statuscheck, updatedata };