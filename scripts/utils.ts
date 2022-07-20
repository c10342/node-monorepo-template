import path from "path";

import fs from "fs";

export const rootPath = path.resolve(__dirname, "../");

export const packagesPath = path.resolve(rootPath, "./packages");

export const packages = fs.readdirSync(packagesPath);

export const resolvePackages = (...args: any) => {
  return path.resolve(packagesPath, ...args);
};

export const resolveRoot = (...args: any) => {
  return path.resolve(rootPath, ...args);
};
