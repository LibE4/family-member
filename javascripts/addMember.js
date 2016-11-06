"use strict";

function addMember(apiKeys, newItem){
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: "POST",
			url: `${apiKeys.databaseURL}/family.json`,
			data:JSON.stringify(newItem),
			dataType:"json"
		}).then((response)=>{
			console.log("response", response);
			resolve(response);
		}, (error)=>{
			reject(error);
		});
	});
}

module.exports =  addMember;

