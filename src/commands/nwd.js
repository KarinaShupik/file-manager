import { errorInvalidOperation, errorOperationFailed } from "../errors.js";
import path from "path";
import fs from "fs/promises";
import { getWorkingDirectory, setWorkingDirectory, showWorkingDirectory } from "../helper.js";

export const changeDirectory = async (newPath) => {
    if (newPath === undefined){
        errorInvalidOperation()
        return;
    }

    newPath = path.resolve(getWorkingDirectory,  newPath);

    try {
        // Check if the provided path is a directory
        const stats = await fs.stat(newPath);
            
        if (stats.isDirectory()) {
            showWorkingDirectory(setWorkingDirectory(newPath));
        } else {
            errorInvalidOperation();
        }
    } catch (error) {
        errorOperationFailed();
    }
};

export const moveUp = () => {
    const newDir = path.join(getWorkingDirectory(), "..");
    showWorkingDirectory(setWorkingDirectory(newDir));
}