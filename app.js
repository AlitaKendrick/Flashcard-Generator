var clozeQuestions = require("./cloze.json");
var basicQuestions = require("./basic.json");
var inquirer = require("inquirer");
far fs = require("fs");
var count = 0;


//function for basic cards to accept front and back arguments
function BasicCards (front, back) {
	this.front = front,
	this.back = back
};