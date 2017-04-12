var fs = require("fs");
var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./BasicCard.js");
var arr=[];
var flag=0;  
var score =0;
var total=0;
var inquirer = require("inquirer");

function playClozeQuiz()
    {
    inquirer.prompt([
    {
    type   : "input",
    message:"\n"+arr[flag].clozeDelete()+"\n",
    name   :"question",
    default: " "
    },
    ]).then(function (answer) 
    {
    if((answer.question)==(arr[flag].cloze))
    {
    console.log("\nThats right !! The right answer is  "+ arr[flag].cloze);
    score++;
    total ++;
    }
    else
    {
    console.log("\nThats wrong. The right answer is  "+ arr[flag].cloze);
    total ++;
    }
    flag=flag+1;
    if(flag<(arr.length))
    playClozeQuiz(); 
    else
    console.log("Your score is "+score+" out of a total of "+ total);
    });
    }
function playBasicQuiz()
    {
    inquirer.prompt([
    {
    type   : "input",
    message:"\n"+arr[flag].front+"\n",
    name   :"question",
    default: " "
    },
    ]).then(function (answer) 
    {
    if((answer.question)==(arr[flag].back))
    {
    console.log("\nThats right !! The right answer is  "+ arr[flag].back);
    score++;
    total ++;
    }
    else
    {
    console.log("\n\n\nThats wrong. The right answer is  "+ arr[flag].back);
    total++;
    }
    flag=flag+1;
    if(flag<(arr.length))
    playBasicQuiz();    
    else
        console.log("Your score is "+score+" out of a total of "+ total);
    });
    }

var Admin=function()
{
    this.playClozeGame=function()
    {   
        flag=0;
        arr=[];
        score=0;
        total=0;
        fs.readFile("cloze.txt", "utf8", function(err, data) 
        {
        var data2=[];
        if(data!='')
        {
        data2=JSON.parse(data);   
        for (var i = 0; i < data2.length; i++) 
            {
            var newquestion= new ClozeCard((data2[i].question),(data2[i].cloze));
            arr.push(newquestion);
            }       
        playClozeQuiz();
        }
        else
        console.log("No questions to ask");
            
        });
    };  
    this.playBasicGame=function()
    {   
        flag=0;
        arr=[];
        score=0;
        total=0;
        fs.readFile("basic.txt", "utf8", function(err, data) 
        {
        var data2=[];
        if(data!='')
        {
        data2=JSON.parse(data);  
        for (var i = 0; i < data2.length; i++) 
            {
            var newquestion= new BasicCard((data2[i].front),(data2[i].back));
            arr.push(newquestion);
            }       
        playBasicQuiz();
        }
        else
        console.log("No questions to ask");
        });
       
    };  
    this.putClozeData=function(str1,str2)   
    {
        fs.readFile("cloze.txt", "utf8", function(err, data) 
        {
        var data2=[];
        if(data!='')
        data2=JSON.parse(data);
        var myObj = { "question":str1, "cloze":str2}
        data2.push(myObj);
        var myJSON = JSON.stringify(data2);
        fs.writeFile("cloze.txt", myJSON)
        });
    };
    this.putBasicData=function(str1,str2)   
    {
        fs.readFile("basic.txt", "utf8", function(err, data) 
        {
        var data2=[];
        if(data!='')
        data2=JSON.parse(data);
        var myObj = { "front":str1, "back":str2}
        data2.push(myObj);
        var myJSON = JSON.stringify(data2);
        fs.writeFile("basic.txt", myJSON)
        });
    };
}
module.exports = Admin;