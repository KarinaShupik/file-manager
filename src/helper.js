import os from 'node:os';

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

//show current working directory
export const showWorkingDirectory = () => {
    let currentPath = os.homedir();
    console.log('You are currently in', currentPath);
}

