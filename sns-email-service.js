'use strict';
var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    const decoded_USERNAME = decodeURIComponent(event.USERNAME);
    var sns = new AWS.SNS();
    var params = {
        Message: decoded_USERNAME, 
        Subject: "New Student",
        TopicArn: "*******"
    };
    sns.publish(params, context.done);
};