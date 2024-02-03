import os from 'node:os';

export const getEOL = () => {
    const defaultEOL = os.EOL;
    console.log(defaultEOL)
}

export const getCPU = () => {
    console.table(
        os
          .cpus()
          .map(({ model, speed }) => ({ "Model": model, "Speed (GHz)": speed/1000 }))
      );

}

export const getUsername = () => {
    const username = os.userInfo().username;
    console.log(username)
}
