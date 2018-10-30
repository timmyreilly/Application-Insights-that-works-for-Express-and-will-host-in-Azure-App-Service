var express = require('express')
var app = express()

console.log(process.env.APPINSIGHTS_INSTRUMENTATIONKEY); 
console.log(Date.now()); 

let appInsights = require('applicationinsights');
appInsights.setup() 
appInsights.start(); 
let client = appInsights.defaultClient;

client.trackEvent({name: "AppStart", properties: {customProperty: "the value of starting"}});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    console.log("Sent to client"); 
    client.trackMetric({name: "custom metric", value: 3});
    client.trackTrace({message: "trace message: " + Date.now()});
    res.send('Hello World!');
}); 

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT || 3000}!`))