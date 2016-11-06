"use strict";

function deleteMember(apiKeys, itemId){
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: "DELETE",
			url: `${apiKeys.databaseURL}/family/${itemId}.json`,
		}).then((response)=>{
			console.log("delete", response);
			resolve(response);
		}, (error)=>{
			reject(error);
		});
	});
}

module.exports = deleteMember;
