import { getAbsolutePath } from "../helper.js"
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import * as path from 'node:path';

export const calculateHash = (argPath) => {
    const filePath = getAbsolutePath(argPath)

    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
        stream.on('data', (data) => {
          hash.update(data);
        });
    
        stream.on('end', () => {
          const fileHash = hash.digest('hex');
          console.log(fileHash)
          resolve(fileHash);
        });
    
        stream.on('error', (error) => {
          reject(error);
        });
      });
}