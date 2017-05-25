'use strict';

var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    
var course = event.COURSE;

var params = {
    Bucket : "*****" + course,
    Key : "*.pdf",
    Expires : 100
};

var credentials = {
    accessKeyId : process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION
};


var s3 = new AWS.S3(credentials);

const url = s3.getSignedUrl('getObject', params, function(err,url) {
    if (err){
        console.log(err);
    }
    const response = {
        statuscode: 200,
        body: url
    };
    callback(null, response);
});
};