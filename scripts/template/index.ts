import inquirer from "inquirer";
import glob from "glob";
import path from "path";
import fse from "fs-extra";
import ejs from "ejs";

import { packages, resolvePackages } from "../utils";

const tplPath = path.resolve(__dirname, "./tpl");

const getFiles = (cwd: string) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(
      // 获取所有文件
      "**",
      {
        cwd,
        // 忽略的文件
        // ignore: "",
        // 排除目录，只要文件
        nodir: true
      },
      function (er, files) {
        if (er) {
          reject(er);
          return;
        }
        resolve(files);
      }
    );
  });
};

const renderEjs = (filePath: string, data: ejs.Data = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, data, {}, function (err, str) {
      if (err) {
        reject(err);
        return;
      }
      fse.writeFileSync(filePath, str);
      resolve(str);
    });
  });
};

const init = async () => {
  const ret = await inquirer.prompt([
    {
      type: "input",
      name: "dirName",
      message: "请输入文件夹名称",
      validate(v) {
        const done = (this as any).async();
        setTimeout(function () {
          if (!v) {
            done("请输入文件夹名称");
            return;
          } else if (packages.includes(v)) {
            done(`${v} 文件夹已经存在`);
            return;
          }
          done(null, true);
        }, 0);
      }
    },
    {
      type: "input",
      name: "pckName",
      message: "请输入包名",
      validate(v) {
        const done = (this as any).async();
        setTimeout(function () {
          if (!v) {
            done("请输入包名");
            return;
          }
          done(null, true);
        }, 0);
      }
    }
  ]);
  const destPath = resolvePackages(`./${ret.dirName}`);
  fse.ensureDirSync(destPath);
  fse.copySync(tplPath, destPath);
  const fileList = await getFiles(destPath);
  const taskList = fileList.map((file) =>
    renderEjs(path.resolve(destPath, file), ret)
  );
  await Promise.all(taskList);

  console.log(`模板生成成功`);
};

init();
