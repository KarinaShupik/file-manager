import os from 'node:os';

export const getEOL = () => {
    const defaultEOL = os.EOL;
    console.log(defaultEOL)
}