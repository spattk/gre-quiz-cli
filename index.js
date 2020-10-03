const readXlsxFile = require('read-excel-file/node');
const inquirer = require('inquirer');
const prompt = require('prompt-sync')();
const fs = require('fs')
const path = require('path');
const { dir } = require('console');
const { exit } = require('process');

questions = [];
correct_answers = [];
answers = [];
prompt_array = [];
score = 0;

function shuffle(arr) {
    let ctr = arr.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let quizPath = path.join(__dirname, '/Quiz.xlsx');
if (!fs.existsSync(quizPath)) {
    console.log(`Quiz.xlsx file not found !!!. Expected Quiz.xlsx at the location ${path.join(__dirname, '\/')}`);
    exit(0)
}
  
indexes = [];
readXlsxFile(quizPath).then((rows) => {

    rows.forEach((row, index)=> {
        indexes.push(index);
        questions.push(row[0]);
        correct_answers.push(row[1]);

    })
    shuffle(indexes);
    len = indexes.length;

    indexes = indexes.slice(0,10)
    indexes.forEach((index)=> {
        choices = [];
        choices.push(correct_answers[index]);
        for(i=0;i<4;i++){
            val = getRandomInt(len);
            while (val == index) {
                val = getRandomInt(len);
            }
            choices.push(correct_answers[val]);
        }
        shuffle(choices);
        prompt_array.push({
            type:'list',
            name:questions[index],
            message:questions[index],
            choices: choices
        })

    })
    error_questions = {}
    inquirer.prompt(prompt_array)
    .then(response=> {
        for(let attr in response){
            q_index = questions.indexOf(attr);
            if (response[attr] == correct_answers[q_index]){
                score++;
            } else {
                error_questions[questions[q_index]] = correct_answers[q_index]
            }
        }
        console.log("\n \uD83D\uDE00 SCORE " , score);
        console.log("Wrong Answer")
        console.log(error_questions)
    })
    .catch((err) => {
        console.log(err)
    })
})    
