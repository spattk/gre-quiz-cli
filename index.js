const readXlsxFile = require('read-excel-file/node');
const inquirer = require('inquirer');
const prompt = require('prompt-sync')();

questions = [];
corr_answer = [];
answers = [];
prompt_arr = [];
score = 0;

function shuffle(arr) {
    var ctr = arr.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}
indexes = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



let path = '/Users/siteshpattanaik/Downloads/Test\ Quiz.xlsx';

readXlsxFile(path).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    rows.forEach((row,index) => {
        indexes.push(index);
        questions.push(row[0]);
        corr_answer.push(row[1]);
        answers.push(row[1]);
    });
    // console.log("question :  " + questions);
    // console.log("answers : " + answers);
    shuffle(indexes);
    // console.log(indexes);
    len = indexes.length;
    // console.log(len)
    // console.log(getRandomInt(len))
    indexes.forEach((index)=> {
        choice_arr = [];
        choice_arr.push(corr_answer[index]);
        for(i=0;i<=4;i++){
            val = getRandomInt(len);
            if (val == index) {
                val = getRandomInt(len);
            }
            choice_arr.push(corr_answer[val]);
        }
        shuffle(choice_arr);
        prompt_arr.push({
            type:'list',
            name:questions[index],
            message:questions[index],
            choices: choice_arr
        })

    })
    inquirer.prompt(prompt_arr)
    .then(response=> {
        for(let attr in response){
            q_index = questions.indexOf(attr);
            if (q_index==-1){
                console.log("-1 : ", attr);
            }
            if (response[attr] == corr_answer[q_index]){
                score++;
            }
            //console.log(attr + " " + response[attr]);
        }
        console.log("\n\nSCORE " , score);
        //console.log("options : ", response);
    })
    .catch((err) => {
        console.log("sth wrong happened");
    })
})    
