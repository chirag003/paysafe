const request = require('request');

function uuidv4() {
					  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
					    return v.toString(16);
					  });}

 onPay=async (req, callbackfunc)=>{
	var values = {
            "merchantRefNum": uuidv4(),
            "amount": req.amount,
            "currencyCode": "USD",
            "paymentHandleToken": req.token,
            "description": "Assignment check"
        }	
	//options for post request,headersand url
	const options = {
				  url: 'https://api.test.paysafe.com/paymenthub/v1/payments',
				  headers: {
					'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4',
					'Simulator': 'EXTERNAL',
					'Content-Type': 'application/json'
					},
				  body: JSON.stringify(values),
   				  method: 'POST'
				};
	//callback for requests	
	 function callback(error, response, body) {
		console.log(JSON.parse(body))
		return callbackfunc(JSON.parse(body));
	}			
	console.log(options);
	 console.log(values);
	  request(options, callback);			

				
	
	
};

module.exports.onPay = onPay;