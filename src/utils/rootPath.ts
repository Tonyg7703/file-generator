import path from 'path';

const srcPath = path.dirname(require.main!.filename);
export const rootPath = path.resolve(srcPath, '..');
