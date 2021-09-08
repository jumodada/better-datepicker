# 开发指南

使用 rush + pnpm 进行开发构建

## 初次运行

初次下载项目需要安装 rush ，使用 `rush install` 安装相关依赖，第一次安装运行会话很长时间，耐心等待

## 启动项目

在对应项目目录下运行 `ruhsx + commond` 就跟运行 npm 相关命令一样，例如在 doc 目录下运行 `rushx dev` 效果就跟运行 `npm/yarn dev` 效果一样

## 安装依赖

在对应项目下，使用命令 `rush add -p @xx/xx` 进行安装，如果想安装到 dev 依赖中，加上参数 `--dev`，具体的使用 `rush add -h`

## 构建项目

在任意目录下运行 `rush build`,将根据依赖的项目进行一次进行编译打包。如果只想打包某一个项目，比如只想打包 `better-datepicker` 便可以加上 `--only`，如：`rush build --only better-datepicker`。

还有其它参数，`--to`,`--form` 之类的使用技巧，请参考<https://rushjs.io/pages/developer/selecting_subsets/>
