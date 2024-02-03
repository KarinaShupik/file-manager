import * as readline from 'node:readline/promises';
import { stdin as input } from 'node:process';
import { exit, getArguments, showWorkingDirectory, getAbsolutePath } from './helper.js';
import { getWorkingDirectory, setWorkingDirectory} from './path.js';
import { changeDirectory, moveUp, showListOfContent } from './commands/nwd.js';
import {errorInvalidOperation, errorOperationFailed} from './errors.js'
import { readAndPrintFile, createEmptyFile, renameFile, copyFile, moveFile, removeFile } from './commands/fs.js';
import { getEOL, getCPU, getUsername, getArchitecture } from './commands/os.js';
import { calculateHash } from './commands/hash.js';


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
                case "rm":
                    await removeFile(arg1);
                    break;
                case "os":
                    {
                        switch(arg1){
                            case "--EOL":
                                await getEOL();
                                break;
                            case "--cpus":
                                await getCPU();
                                break;
                            case "--username":
                                await getUsername();
                                break;
                            case "--architecture":
                                await getArchitecture();
                                break;
                        }}
                    break;
                case "hash":
                    await calculateHash(arg1);
                    break;
                
            }
        }catch (error){
            errorOperationFailed()
        }
        showWorkingDirectory(getWorkingDirectory())
    }); 
}