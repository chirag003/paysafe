const request = require('request');

getToken = async (payid, callbackfunc) => {
	//url
	const url = 'https://api.test.paysafe.com/paymenthub/v1/customers';
	//body
	var values = {
		"merchantRefNum": "Ref123",
		"paymentTypes": [
			"CARD"
		]
	}
	//options for post request,headersand url
	const options = {
		url: 'https://api.test.paysafe.com/paymenthub/v1/customers/' + payid + '/singleusecustomertokens',
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
		console.log(JSON.parse(body).singleUseCustomerToken,'=========================token')
		return callbackfunc(JSON.parse(body).singleUseCustomerToken);
	}

	request(options, callback);
};

module.exports.getToken = getToken;