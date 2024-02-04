import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { getAbsolutePath } from '../helper.js';

export const compressFile = async (filePath, destinationPath) => {
    const sourceFilePath = getAbsolutePath(filePath);
    const targetFilePath = getAbsolutePath(destinationPath);

    const sourceStream = createReadStream(sourceFilePath);
    const targetStream = createWriteStream(targetFilePath);

    const brotliCompress = zlib.createBrotliCompress();

    await pipeline(sourceStream, brotliCompress, targetStream);
};

export const decompressFile = async (filePath, destinationPath) => {
    const sourceFilePath = getAbsolutePath(filePath);
    const targetFilePath = getAbsolutePath(destinationPath);

    const sourceStream = createReadStream(sourceFilePath);
    const targetStream = createWriteStream(targetFilePath);

    const brotliDecompress = zlib.createBrotliDecompress();

    await pipeline(sourceStream, brotliDecompress, targetStream);
};
