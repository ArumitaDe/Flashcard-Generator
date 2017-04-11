var admin = require("./admin.js");
var myAdmin= new admin();
var inquirer = require("inquirer");
function getdata()
        {       
        
        // Create a "Prompt" with a series of questions.
        inquirer.prompt([


                {
                type   : "list",
                message: "\nWhat do you want to do?\n",
                choices: ["Add a Question?", "Play", "Exit"],
                name   : "options"
                },

                ]).then(function(data) 
                {

                if(data.options=="Add a Question?")
                {
                        inquirer.prompt([
                        {
                        type   : "list",
                        message: "\nWhat type of question do you want to add?\n",
                        choices: ["Clozed Question", "Basic Question"],
                        name   : "options"
                        },
                        ]).then(function (answers) 
                                {
                                if(answers.options=="Clozed Question")
                                inquirer.prompt([
                                {
                                type   : "input",
                                message: "\n\n\nWhat is the Question?\n",
                                name   : "Question3",
                                default: "Question"
                                },
                                {
                                type   : "input",
                                message: "\n\n\nWhat is the text to be removed?\n",
                                name   : "textToRemove",
                                default: "textToRemove"
                                },
                                ]).then(function (answers) {
                                    myAdmin.putClozeData(answers.Question3,answers.textToRemove);
                                    getdata();
                                });
                                if(answers.options=="Basic Question")
                                inquirer.prompt([
                                {
                                type   : "input",
                                message: "\nWhat is the Question?\n",
                                name   : "Question",
                                default: "Question"
                                },
                                {
                                type   : "input",
                                message: "\nWhat is the Answer?\n",
                                name   : "Answer",
                                default: "Answer"
                                },
                                ]).then(function (answer) {
                                    myAdmin.putBasicData(answer.Question,answer.Answer);
                                    getdata();
                                });
                                });
                }
                if(data.options=="Exit")
                {}
                if(data.options=="Play")
                {
                       inquirer.prompt([
                        {
                        type   : "list",
                        message: "\nWhat type of game do you want to play?\n",
                        choices: ["Clozed Question Game", "Basic Question Game"],
                        name   : "options"
                        },
                        ]).then(function (answers) 
                                {
                                if(answers.options=="Clozed Question Game")
                                myAdmin.playClozeGame();
                                if(answers.options=="Basic Question Game")
                                myAdmin.playBasicGame(); 
                                 
                                });
                }
                });


        }
getdata();

