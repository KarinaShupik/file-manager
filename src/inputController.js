import * as readline from 'node:readline/promises';
import { stdin as input } from 'node:process';
import { exit, getArguments, showWorkingDirectory, getWorkingDirectory } from './helper.js'
import { changeDirectory, moveUp, showListOfContent } from './commands/nwd.js';
import {errorInvalidOperation, errorOperationFailed} from './errors.js'


export const listenInputCommands = () => {

    const rl = readline.createInterface({ input });

    rl.on('line', async (input) => {
        if (input === '.exit'){
            exit();
        }

        const [command, arg1, arg2] = getArguments(input);

        try{
            switch(command){
                case "up":
                    moveUp();
                    break;
                case "cd":
                    changeDirectory(arg1);
                    break;
                case "ls":
                    showListOfContent();
                    break;
            }
        }catch (error){
            errorOperationFailed()
        }
    }); 
}