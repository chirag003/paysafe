var mongoose = require("mongoose");

var paySafeSchema = mongoose.Schema({
    email: {type: String, required: true},
    payid: {type: String, required: true},
    
    created_at : { type : Date, default : Date.now },
});

module.exports = mongoose.model("paysafe_payids", paySafeSchema);