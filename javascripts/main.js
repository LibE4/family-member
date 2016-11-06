'use strict';
var firebaseCredentials = require("./firebaseMethods.js").firebaseCredentials;
var putFamilyInDOM = require("./DOM.js");
var addMember = require("./addMember.js");
var deleteMember = require("./deleteMember.js");

let apiKeys = {};
let uid = "";

$(document).ready(function(){
	firebaseCredentials().then(function(keys){
		console.log("keys", keys);
		apiKeys = keys;
		firebase.initializeApp(apiKeys);
		
		putFamilyInDOM(apiKeys);
	});

	$("#data").on("click", "#add", function(){
		let newItem = {
      "name": $("#inputName").val(),
      "age": $("#inputAge").val(),
      "gender": $(".inputGender").val(),
      "skills": $("#inputSkills").val().split(",")
		};
		for (let list in newItem) {
			if (newItem[list] === "") {
				window.alert("Please fill all fields!");
				return;
			}
		}
		addMember(apiKeys, newItem).then(function(){
			putFamilyInDOM(apiKeys);
		});
	});

	$("#data").on("click", ".delete", function(){
		let itemId = $(this).data("fbid");
		deleteMember(apiKeys, itemId).then(function(){
			putFamilyInDOM(apiKeys);
		});
	});

});