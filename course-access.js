'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    const bdy = event.BODY;
    
    const info = bdy.split('&');
    
    const usr = info[0].split('=');
    const uname = decodeURIComponent(usr[1]);
    
    const crs = info[1].split('=');
    const course = crs[1];
    
    const params = {
        TableName: '******',
        Key: {
          username: uname
        }
    };
    
    dynamoDb.get(params, (error,result) => {
        if (error) {
            var response_error = {
              statuscode: 404,
              body: "Something has gone wrong please try again."
            };
            
            callback(null,JSON.stringify(response_error));
        
        }else{

            const registeredCourses = result.Item.courses.values;
            if (registeredCourses.indexOf(course) > -1){
               

	            const response_exists = {
	                statuscode: 200,
	                body: '1'
	            };
	            callback(null, JSON.stringify(response_exists));

            }else{
            	const response_nonexist = {
                    statuscode: 200,
                    body: '0'
            	};
               	callback(null, JSON.stringify(response_nonexist));
       	 		}	
            }
    });
};