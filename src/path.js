import os from 'node:os';

let currentPath = os.homedir();

export const getWorkingDirectory = () =>{
    return  currentPath
}

export const setWorkingDirectory = (newPath) => {
    currentPath = newPath
}

