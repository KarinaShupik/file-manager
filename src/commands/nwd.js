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

export const showListOfContent = async () => {
    try {
        const currentDirectory = getWorkingDirectory();
        const directoryContents = await fs.readdir(currentDirectory);

        // Separate files and folders
        const files = [];
        const folders = [];

        for (const item of directoryContents) {
            const fullPath = path.join(currentDirectory, item);
            const stats = await fs.stat(fullPath);

            if (stats.isDirectory()) {
                folders.push({ type: "directory", name: item });
            } else {
                files.push({ type: "file", name: item });
            }
        }

        // Sort files and folders alphabetically
        folders.sort((a, b) => a.name.localeCompare(b.name));
        files.sort((a, b) => a.name.localeCompare(b.name));

        // Combine and print the results using console.table
        const combinedList = [...folders, ...files];
        console.table(combinedList, ["name", "type"]);

        showWorkingDirectory(setWorkingDirectory(currentDirectory));
    } catch (error) {
        errorOperationFailed()
    }
}