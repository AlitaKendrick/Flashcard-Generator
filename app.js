//variables to grab flashcard info from json files
var clozeQuestions = require("./cloze.json");
var basicQuestions = require("./basic.json");
var inquirer = require("inquirer");
var fs = require("fs");
var count = 0;

//function to begin the game with a prompt to select type of flashcards 
function begin() {
	inquirer.prompt([
			{
			name: "begin",
			type: "list",
			message: "Select the type of flashcards you would like.",
			choices: ["basic flashcards", "cloze flashcards"]
			} 
		]).then(function(answer) {
			if(answer.begin === "basic flashcards") {
				basicFlashcard();
			} else {
				clozeFlashcard();
			}
		}); // closes promise
}; //closes function
begin();


//function to ask if you want to restart the game once all questions have been answered in a set
function restart () {
	inquirer.prompt([
		{
			type: "confirm",
			name: "restart",
			message: "Go back to the start?"
		}
		]).then(function(answers) {
			if (answers.restart === true) {
				console.log("------------------------------------");
				begin();
			} else {
				console.log("PEACE OUT!");
				process.exit();
			}
		}); //close promise
}; // close function


//if user selects basic flashcards this function will run and go through all questions
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
				console.log("Correct!!");
				console.log("------------------------------------");
			} else {
				console.log("Wrong. The correct answer was " + basicQuestions[count].back);
				console.log("------------------------------------");
			};
			count++;
			basicFlashcard();
		}); //close promise
	} else {
		console.log("------------------------------------");
		console.log("you finished all of the basic cards!");
		restart();
	}; //closes if/else statement
}; // closes function

// basicFlashcard();


//if user selects cloze flashcards this function will run and go through all questions
var clozeFlashcard = function() {
	if (count < clozeQuestions.length) {
		inquirer.prompt([
			{
				name: "clozeC",
				type: "input",
				message: clozeQuestions[count].text
			}
		]).then(function(answers) {
			if (answers.clozeC === clozeQuestions[count].cloze) {
				console.log("Correct!!");
				console.log("------------------------------------");
			} else {
				console.log("Wrong! The correct answer was " + clozeQuestions[count].cloze);
				console.log("------------------------------------");
			}; //closes promise if/else statement
			count++;
			clozeFlashcard();
		}); //closes promise
	} else {
		console.log("You have finished all of the cloze cards! Here are all of the facts: ");
			for(var i = 0; i < clozeQuestions.length; i++) {
				console.log(clozeQuestions[i].full)
			}; //closes loop
		console.log("------------------------------------");
		restart();
	}; // closes if/else statement
}; //closes cloze function

// clozeFlashcard();