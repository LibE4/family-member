(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
let getFamilyMembers = require("./firebaseMethods.js").getFamilyMembers;

function putFamilyInDOM(apiKeys){
  getFamilyMembers(apiKeys).then(function(items){
    console.log("items from FB", items);
    $("#data").html("");
    if (items === null) return;
    let dataInDOM = "";
    switch (Array.isArray(items)){
      case false:
        Object.keys(items).forEach(function(key){
          dataInDOM += "<tr>";
            dataInDOM += `<td>${items[key].name}</td>`;
            dataInDOM += `<td>${items[key].age}</td>`;
            dataInDOM += `<td>${items[key].gender}</td>`;
            dataInDOM += `<td>${items[key].skills.toString()}</td>`;
            dataInDOM += `<td><button class="btn btn-danger delete" data-fbid="${key}">Delete</button></td>`;
          dataInDOM += "</tr>";
        });
        break;
      case true: 
        items.forEach(function(item, itemId){
          if(item !== null) {
            dataInDOM += "<tr>";
              dataInDOM += `<td>${item.name}</td>`;
              dataInDOM += `<td>${item.age}</td>`;
              dataInDOM += `<td>${item.gender}</td>`;
              dataInDOM += `<td>${item.skills.toString()}</td>`;
              dataInDOM += `<td><button class="btn btn-danger delete" data-fbid="${itemId}">Delete</button></td>`;
            dataInDOM += "</tr>";
          }
        });
        break;
    }
	  dataInDOM += "<tr>";
      dataInDOM += '<td><input type="text" id="inputName" class="form-control" placeholder="Firstname Lastname" required></td>';
      dataInDOM += '<td><input type="number" id="inputAge" class="form-control" placeholder="Age" required></td>';
      dataInDOM += '<td><input type="Radio" name="Gender" class="inputGender" value="male">Male<input type="Radio" name="Gender" class="inputGender" value="female">Female</td>';
	    dataInDOM += '<td><textarea type="text" id="inputSkills" class="form-control" placeholder="Skill1,Skill2,Skill3..." required></textarea></td>';
      dataInDOM += '<td><button class="btn btn-success" id="add">Add</button></td>';
	  dataInDOM += "</tr>";
    //apend to list
    $('#data').append(dataInDOM);
  });
}

module.exports = putFamilyInDOM;
},{"./firebaseMethods.js":4}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{"./DOM.js":1,"./addMember.js":2,"./deleteMember.js":3,"./firebaseMethods.js":4}]},{},[5]);
