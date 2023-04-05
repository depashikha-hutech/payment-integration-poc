const {post } = require("../controller/sms");
const db = require('../model/db');
require("dotenv")?.config();
const env = process?.env
var axios = require('axios');
const { json } = require("sequelize");
const { Templates } = require("../model/db");
 async function sendSMS(smsdetails){
let msg='DELCAP Use OTP 123456 to register with Zefayar. Do not share OTP with anyone for security reasons.'
var config = {
  method: 'get',
  url: `http://sms.alphacomputers.biz/api/v3/index.php?method=${env?.SMS_METHOD}&to=${smsdetails?.to}&message=${smsdetails?.message}&sender=${env?.SMS_SENDER}&api_key=${env?.SMS_APIKEY} `,
  headers: {
    'Cookie': 'AWSALB=LcNztDc3nVisavef/GwJoOUMCd0ilMqMG2vF8R7t5h+6FYNySE4n+nXVKc9K0vRlmUrCkwHWcyzyrTHeSQdP+bc8QkxCT7XCNEFMH4EOrlPxeearqHUhvT+1aRsl; AWSALBCORS=LcNztDc3nVisavef/GwJoOUMCd0ilMqMG2vF8R7t5h+6FYNySE4n+nXVKc9K0vRlmUrCkwHWcyzyrTHeSQdP+bc8QkxCT7XCNEFMH4EOrlPxeearqHUhvT+1aRsl'
  }
};

axios(config)
.then(function (response) {
  //console.log(JSON.stringify(response.data));
  return JSON.stringify(response.data)
})
.catch(function (error) {
  console.log(error);
});
}
 async function getTemplate(id){
    const pvalue = await db?.Templates?.findByPk(id);
  return pvalue.get();
}

module.exports={sendSMS, getTemplate}
