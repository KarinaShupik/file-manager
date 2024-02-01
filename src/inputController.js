import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { exit } from './helper.js'

export const listenInputCommands = () => {

    const rl = readline.createInterface({ input });

    rl.on('line', async (input) => {
        if (input === '.exit'){
            exit();
        }
    }); 
}