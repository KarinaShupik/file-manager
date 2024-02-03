import path from "path";
import { getWorkingDirectory } from "./path.js";

export const getUsername = () => {
    const args = process.argv.slice(2);
    const result = args[0].split("=")[1];
    return result;
}

//Messages
export const contentWelcomeMessage = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
}

export const contentGoodbyeMessage = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

//on exit
export const exit = () => process.exit(0);

export const onClose = () => {
    process.on('SIGINT', () => {
        exit();
    });
}
export const showGoodbyeMessage = () => {
    process.on('exit', () => {
       contentGoodbyeMessage(getUsername())
    });
}

export const getArguments = (args) => {
    const listOfCommands = args.split(" ");
    return listOfCommands
}

export const showWorkingDirectory = () => {
    console.log('You are currently in', getWorkingDirectory());
}

export const getAbsolutePath = (newPath) => {
    return path.resolve(getWorkingDirectory(), newPath)
}

