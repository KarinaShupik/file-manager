import os from 'node:os';

export const getEOL = () => {
    const defaultEOL = os.EOL;
    console.log(defaultEOL)
}

export const getCPU = () => {
    const cpusInfo = os.cpus();

    console.table(
        os
          .cpus()
          .map(({ model, speed }) => ({ "Model": model, "Speed (GHz)": speed/1000 }))
      );

}