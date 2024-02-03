import * as readline from 'node:readline/promises';
import { stdin as input } from 'node:process';
import { exit, getArguments, showWorkingDirectory, getAbsolutePath } from './helper.js';
import { getWorkingDirectory, setWorkingDirectory} from './path.js';
import { changeDirectory, moveUp, showListOfContent } from './commands/nwd.js';
import {errorInvalidOperation, errorOperationFailed} from './errors.js'
import { readAndPrintFile, createEmptyFile, renameFile } from './commands/fs.js';


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
                case "cat":
                    readAndPrintFile(arg1);
                    break;
                case "add":
                    createEmptyFile(arg1);
                    break;
                case "rn":
                    renameFile(arg1, arg2);
                    break;
                case "cp":
                     copyFile(arg1, arg2);
                    break;
                
            }
        }catch (error){
            errorOperationFailed()
        }
        showWorkingDirectory(getWorkingDirectory())
    }); 
}