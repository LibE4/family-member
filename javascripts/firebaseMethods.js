'use strict';

function firebaseCredentials(){
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: 'GET',
			url: 'apiKeys.json'
		}).then((response)=>{
			resolve(response);
		}, (error)=>{
			reject(error);
		});
	});
}

function getFamilyMembers(apiKeys){
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: "GET",
			url: `${apiKeys.databaseURL}/family.json`
		}).then((response)=>{
			resolve(response);
		}, (error)=>{
			reject(error);
		});
	});
}

module.exports.firebaseCredentials = firebaseCredentials;
module.exports.getFamilyMembers = getFamilyMembers;
