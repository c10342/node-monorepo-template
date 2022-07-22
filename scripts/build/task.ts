import { src, dest, parallel, series, watch as gulpWatch } from "gulp";

import ts from "gulp-typescript";

import del from "del";

import { packagesPath, resolvePackages, resolveRoot, packages } from "../utils";

const globBuildFilePaths = (name: string) => {
  return [
    `${packagesPath}/${name}/**/*.ts`,
    `!${packagesPath}/${name}/node_modules/**`,
    `!${packagesPath}/${name}/__tests__/**`
  ];
};

const globsWatchFilePaths = (name: string) => {
  return [
    `../../packages/${name}/**/*.ts`,
    `!../../packages/${name}/node_modules/**`,
    `!../../packages/${name}/__tests__/**`
  ];
};

const distPath = (name: string) => resolvePackages(`./${name}/dist`);

const clean = (distPath: string) => () => {
  return del(distPath, {
    force: true
  });
};

const buildTs = (targetPath: string | string[], distPath: string) => () => {
  const tsProject = ts.createProject(resolveRoot("./tsconfig.json"));
  return src(targetPath).pipe(tsProject()).js.pipe(dest(distPath));
};

const buildTsByName = (name: string) => {
  return buildTs(globBuildFilePaths(name), distPath(name));
};

const clearDist = (name: string) => {
  return clean(distPath(name));
};

export const build = series(
  ...packages.map(clearDist),
  parallel(...packages.map(buildTsByName))
);

export const watch = parallel(() => {
  packages.forEach((name) => {
    gulpWatch(globsWatchFilePaths(name), buildTsByName(name));
  });
});
