
//jshint esversion: 6
const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
var firstName= req.body.fName;
var lastName=req.body.lName;
var email=req.body.email;
console.log(firstName, lastName, email);
var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME:lastName
      }

    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us19.api.mailchimp.com/3.0/lists/8aa40cce05";

const options={
  method:"POST",
  auth: "SoumyajitD:f28427e96b8f14c059bdfbb164577177-us19"
}
const request=https.request(url,options,function(response){
  if (response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html")
  }

response.on("data", function (data) {
  console.log(JSON.parse(data));

})
})

request.write(jsonData);
request.end();

}
);









app.get('/github.com/SoumyajitD',(req,res)=>res.redirect('https://github.com/SoumyajitD'))
app.get('/failure',(req,res)=>res.sendFile(__dirname+"/signup.html"));
app.post('/failure',(req,res)=>res.redirect('https://github.com/SoumyajitD'))

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on Port 3000");

})


// Api Key
// f28427e96b8f14c059bdfbb164577177-us19

//List // IDEA: 8aa40cce05
