import fs from "fs/promises";
import { errorInvalidOperation, errorOperationFailed } from "../errors.js";
import { getWorkingDirectory, setWorkingDirectory, showWorkingDirectory } from "../helper.js";

export const readAndPrintFile = async (newPath) => {
    if (newPath === undefined){
        errorInvalidOperation();
        return;
    }

    try {
        const content = await fs.readFile(newPath, { encoding: 'utf8' });
        console.log(content)
        showWorkingDirectory(setWorkingDirectory(newPath));
    } catch (error) {
        console.log("Error:", error.message);
        errorOperationFailed();
    }
}