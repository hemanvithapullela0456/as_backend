import express from "express";
import ServerlessHttp from "serverless-http";

const app = express(); 

app.get('/.netlify/functions/api',(req,res)=>{
    return res.json({
        messages :"hello world!"
    })
})

const handler = ServerlessHttp(app);


module.exports.handler = async(event,context) =>{
    const result = await handler(event, context);  // Pass event and context to the handler
    return result;
}