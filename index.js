const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

const FILE_PATH ="./data.json";

 
const attackCommit = n => {
    if(n===0) return simpleGit().push();
    const x = random.int(2,65);
    const y = random.int(0, 6);
    const DATE = moment().subtract(2, 'y').subtract(44, 'd')
                    .add(x, 'w').add(y, 'd').format();
    const MESSAGE = "Code Iterations On Date : "+DATE;
    const data = {
        date: DATE,
        message: MESSAGE
    }
    console.log( n + " : " + DATE);
    console.log( "    Message Commit : " + MESSAGE);
    jsonfile.writeFile(FILE_PATH, data, ()=>{
        simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE, '--message': MESSAGE}, 
        attackCommit.bind(this, --n));
    });
}

attackCommit(680)