import * as readline from 'node:readline/promises';
import { stdin as input } from 'node:process';
import { exit, getArguments, showWorkingDirectory, getAbsolutePath } from './helper.js';
import { getWorkingDirectory, setWorkingDirectory} from './path.js';
import { changeDirectory, moveUp, showListOfContent } from './commands/nwd.js';
import {errorInvalidOperation, errorOperationFailed} from './errors.js'
import { readAndPrintFile, createEmptyFile, renameFile, copyFile, moveFile } from './commands/fs.js';


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
                    await moveUp();
                    break;
                case "cd":
                    await changeDirectory(arg1);
                    break;
                case "ls":
                    await showListOfContent();
                    break;
                case "cat":
                    await readAndPrintFile(arg1);
                    break;
                case "add":
                    await createEmptyFile(arg1);
                    break;
                case "rn":
                    await renameFile(arg1, arg2);
                    break;
                case "cp":
                    await copyFile(arg1, arg2);
                    break;
                case "mv":
                    await moveFile(arg1, arg2);
                    break;
                
            }
        }catch (error){
            errorOperationFailed()
        }
        showWorkingDirectory(getWorkingDirectory())
    }); 
}