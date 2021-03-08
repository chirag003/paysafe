const request = require('request');

 getId=async (req, callbackfunc)=>{
	//url
	const url = 'https://api.test.paysafe.com/paymenthub/v1/customers';
  	//body
	var values = {
					merchantCustomerId: req.email+req.firstName+req.phone,
					firstName: req.firstName,
					email: req.email,
					phone: req.phone,
				}
	//options for post request,headersand url
	const options = {
				  url: url,
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
		// console.log(error)
		// console.log(response)
		console.log(JSON.parse(body).id)
		return callbackfunc(JSON.parse(body).id);
	}			
	
	  request(options, callback);			

				
	
	
};

module.exports.getId = getId;