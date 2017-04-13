var clozeQuestions = require("./cloze.json");
var basicQuestions = require("./basic.json");
var inquirer = require("inquirer");
var fs = require("fs");
var count = 0;


//function for basic cards to accept front and back arguments
function basicCards (front, back) {
	this.front = front,
	this.back = back
};

function clozeCards (text, cloze) {
	this.text = text,
	this.cloze = cloze,
	this.full = this.text + " " + this.cloze,
	this.clozeReturn = function() {
		return this.cloze;
	},
	this.clozePartial = function() {
		return this.text;
	},
	this.clozeFull = function() {
		return this.full;
	},
	this.checkError = function() {
		if (this.full.includes(this.cloze)===false){
			throw error;
		};
	}
};

function restart () {
	inquirer.prompt([
		{
			type: "confirm",
			name: "restart",
			message: "Go back to the start?"
		}
		]).then(function(answers) {
			if (answers.restart === true) {
				basicCards();
			} else {
				console.log("PEACE OUT!");
				process.exit();
			}
		});
};

var basicFlashcard = function() {
	if (count < basicQuestions.length) {
		inquirer.prompt([
			{
				name: "basic",
				type: "input",
				message: basicQuestions[count].front
			}
		]).then(function(answers) {
			if (answers.basic === basicQuestions[count].back) {
				console.log("correct!!");
			} else {
				console.log("wrong ):");
			};
			count++;
			basicFlashcard();
		});
	} else {
		console.log("you finished all of the basic cards!");
	};
};
basicFlashcard();