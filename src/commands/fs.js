import { createReadStream, createWriteStream } from "fs";
import fs from "fs/promises";
import { pipeline } from "stream/promises";
import path from "path";
import { errorInvalidOperation, errorOperationFailed } from "../errors.js";
import { getWorkingDirectory, setWorkingDirectory} from '../path.js';
import { showWorkingDirectory, getAbsolutePath } from "../helper.js";

export const readAndPrintFile = async (argPath) => {
    try {
        const pathDir = getAbsolutePath(argPath)
        const content = await fs.readFile(pathDir, { encoding: 'utf8' });
        console.log(content)

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

        setWorkingDirectory(currentDirectory);
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

        setWorkingDirectory(currentDirectory);
    } catch (error) {
        console.error("Error:", error.message);
        errorOperationFailed();
    }
};

export const copyFile = async (pathToFile, pathToNewDirectory) => {
    if (pathToFile === undefined || pathToNewDirectory === undefined) {
        errorInvalidOperation();
        return;
    }

    const srcFilePath = getAbsolutePath(pathToFile)
    const srcFilename = path.basename(srcFilePath);
    const srcDestPath = getAbsolutePath(pathToNewDirectory)
    const destFilePath = path.resolve(srcDestPath, srcFilename);

    try {
        const readStream = createReadStream(srcFilePath);
        const writeStream = createWriteStream(destFilePath);
        await pipeline(readStream, writeStream);
    } catch (error) {
        console.error("Error:", error.message);
        errorOperationFailed()
    }
};

export const moveFile = async (pathToFile, pathToNewDirectory) => {
    if (pathToFile === undefined || pathToNewDirectory === undefined) {
        errorInvalidOperation();
        return;
    }

    try {
        await copyFile(pathToFile, pathToNewDirectory);
        await fs.rm(pathToFile);
    } catch (error) {
        console.error("Error:", error.message);
        errorOperationFailed()
    }
};

export const removeFile = async (pathToFile) => {
    if (pathToFile === undefined) {
        errorInvalidOperation();
        return;
    }

    try {
        await fs.rm(pathToFile);
    } catch (error) {
        console.error("Error:", error.message);
        errorOperationFailed()
    }
};