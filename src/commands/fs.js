import fs from "fs/promises";
import path from "path";
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

export const createEmptyFile = async (fileName) => {
    try {
        const currentDirectory = getWorkingDirectory();
        const filePath = path.join(currentDirectory, fileName);
        // Create an empty file using fs.promises.writeFile
        await fs.writeFile(filePath, "");

        showWorkingDirectory(setWorkingDirectory(currentDirectory));
    } catch (error) {
        console.log("Error:", error.message);
        errorOperationFailed();
    }
}

export const renameFile = async (currentFilePath, newFileName) => {
    if (currentFilePath === undefined){
        errorInvalidOperation();
        return;
    }

    try {
        // Check if the current file exists and get its stats
        const stats = await fs.stat(currentFilePath);

        if (!stats.isFile()) {
            errorInvalidOperation();
        }

        const currentDirectory = path.dirname(currentFilePath);
        const newFilePath = path.join(currentDirectory, newFileName);

        // Rename the file using fs.promises.rename
        await fs.rename(currentFilePath, newFilePath);

        showWorkingDirectory(setWorkingDirectory(currentDirectory));
    } catch (error) {
        console.error("Error:", error.message);
        errorOperationFailed();
    }
};