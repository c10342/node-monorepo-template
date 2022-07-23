# nodejs 开发模板

## 技术栈

此模板为多包架构（monorepo）

- `typescript`

- `jest`

- `vuepress`

- `lerna`

- `eslint`+`prettier`

- `gulp`

- `husky`

- `commitlint`

- `lint-staged`

## 相关命令

- `dev`

```bash
npm run dev
```

监听`packages`目录下的`ts`文件变化，一旦发生变化，就会进行编译

- `build`

```bash
npm run build
```

打包构建`ts`文件

- `test-watch`

```bash
npm run test-watch
```

监听测试用例文件变化，一旦发生变化，就会重新运行测试用例

- `test`

```bash
npm run test
```

运行所有测试用例

- `docs:dev`

```bash
npm run docs:dev
```

运行文档

- `docs:build`

```bash
np run docs:build
```

打包文档

- `commit`

```bash
npm run commit
```

提交代码，相当于`git commit -m "xxx"`命令

- `create`

```bash
npm run create
```

创建子项目模板
