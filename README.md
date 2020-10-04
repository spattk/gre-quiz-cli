# GRE-Quiz-cli

A very small utility tool to prepare for your vocabs for your GRE.

## Usage
1. Very small
2. cli, so don't have to open up anything.
3. More customizations coming soon !!!
4. Effortless


## Steps to run

``` git clone git@github.com:spattk/gre-quiz-cli.git```

```cd gre-quiz-cli```

```npm install```

```node index.js```

If you want to have your own word list, just replace the Quiz.xlsx file with the first row being the original word and the second column as the correct meaning.

then run  - ```node index.js```

By default the quiz asks for 10 questions in one go. Want to change that ?

run using the additional argument ```node index.js <no_of question> ``` <br>
Example: ```node index.js 20``` <br>
The above will create a quiz for 20 questions.
