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