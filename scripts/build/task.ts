import { src, dest, parallel, series, watch as gulpWatch } from "gulp";

import ts from "gulp-typescript";

import del from "del";

import { packagesPath, resolvePackages, resolveRoot, packages } from "../utils";

const clean = (name: string) => () => {
  const cleanPath = resolvePackages(`./${name}/dist`);
  del(cleanPath, {
    force: true,
  });
};

const buildTs = (name: string) => () => {
  const tsProject = ts.createProject(resolveRoot("./tsconfig.json"));
  const srcPath = [
    `${packagesPath}/${name}/**/*.ts`,
    `!${packagesPath}/${name}/node_modules/**`,
    `!${packagesPath}/${name}/__tests__/**`,
  ];
  const distPath = resolvePackages(`./${name}/dist`);
  return src(srcPath).pipe(tsProject()).js.pipe(dest(distPath));
};

export const build = series(
  ...packages.map(clean),
  parallel(...packages.map(buildTs))
);

export const watch = parallel(() => {
  packages.forEach((name) => {
    const globsPath = [
      `../../packages/${name}/**/*.ts`,
      `!../../packages/${name}/node_modules/**`,
      `!../../packages/${name}/__tests__/**`,
    ];

    gulpWatch(globsPath, buildTs(name));
  });
});
