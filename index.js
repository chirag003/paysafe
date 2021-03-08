const express = require('express')
mongoose    = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
Paysafe = require("./models/paysafe");
const request = require('request');
const app = express();
var helper = require("./helpers/index");
var token = require("./helpers/token");
var payment = require("./helpers/payment");
var path = require('path');

const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/paysafe");

app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.use(express.static(path.join(__dirname, 'public')));


//routes for token
app.post("/token", function(req, res) {
	
	var param={"email":req.body.email}
		Paysafe.find(param, async function(err,paysafe){
			if(err){
				console.log(err);
			}else{
				if(paysafe.length==0){
					 await helper.getId(req.body,
						 function(result){
							 console.log(result,'==========================47');
							var newpaysafe={
								payid:result,
								email:req.body.email
							}
							// console.log(newpaysafe)
							Paysafe.create(newpaysafe,async function(err, d){
								if(err){
									console.log(err);
								} else {
									paysafe=d;
									console.log("paysafe**********",paysafe)
									await token.getToken(paysafe.payid,function(result){
                                    // console.log(result,'-------------------tokensent')
									res.send({token:result});
								})
								}
							});
					 });	
				}else{
					console.log("paysafe",paysafe)
						await token.getToken(paysafe[0].payid,function(result){
                        // console.log(result,'-------------------tokensent')
						res.send({token:result});
					})
				}
			}
		});
	
	});
//routes for payment
app.post("/payment", async(req, res) => {
  	console.log(req.body);
	await payment.onPay(req.body,function(result){
		res.send({data:result.status});
	});
});


app.listen(port, () => console.log(`App listening on port ${port}!`));


// Where we will keep books

