# Gitee 入门指南

## 1. Gitee 是什么

Gitee 是一个代码托管平台，类似于 GitHub。它基于 Git 版本控制系统，主要用于保存代码、管理项目历史、多人协作开发、提交问题反馈、发起代码合并请求，以及自动化构建和部署。

简单理解：

- Git 是本地版本控制工具。
- Gitee 是在线代码仓库平台。
- 你可以把本地代码上传到 Gitee，也可以从 Gitee 下载别人的代码。

Gitee 在国内访问速度通常比较稳定，中文界面友好，因此很多国内团队、学校和个人开发者会使用它来托管项目。

## 2. Gitee 能做什么

Gitee 常见用途包括：

- 保存项目代码，防止本地文件丢失。
- 记录每一次代码修改，方便回退历史版本。
- 多人协作开发同一个项目。
- 创建 issue，用来记录 bug、需求和任务。
- 通过 pull request 或 merge request 进行代码评审和合并。
- 编写项目 README、文档和 Wiki。
- 配合 Gitee Pages 发布静态网站。
- 使用流水线完成自动测试、构建和部署。

## 3. 使用 Gitee 前需要了解的概念

### 3.1 仓库

仓库就是一个项目的代码存放位置。一个仓库通常包含源代码、说明文档、配置文件、测试文件等内容。

### 3.2 Git

Git 是版本控制工具。你在本地修改代码后，可以使用 Git 保存修改记录，再把这些记录推送到 Gitee。

### 3.3 commit

commit 是一次代码提交记录。每次 commit 都应该描述这次修改做了什么，例如：

```bash
git commit -m "添加登录页面"
```

### 3.4 branch

branch 是分支。常见做法是主分支保存稳定代码，新功能在单独分支开发，确认没问题后再合并回主分支。

### 3.5 clone

clone 是把远程仓库下载到本地。

```bash
git clone 仓库地址
```

### 3.6 push

push 是把本地提交上传到 Gitee。

```bash
git push
```

### 3.7 pull

pull 是把 Gitee 上的最新代码拉取到本地。

```bash
git pull
```

## 4. 注册和创建仓库

### 4.1 注册账号

1. 打开 Gitee 官网。
2. 注册账号并完成登录。
3. 建议绑定邮箱和手机号，方便找回账号和接收通知。

### 4.2 创建新仓库

登录后可以这样创建仓库：

1. 点击右上角的加号或“新建仓库”。
2. 输入仓库名称，例如 `my-first-project`。
3. 选择仓库是否公开。
4. 可以勾选初始化 README 文件。
5. 点击创建。

公开仓库适合开源项目；私有仓库适合个人练习、公司项目或不想公开的代码。

## 5. 安装 Git

如果你的电脑还没有 Git，需要先安装。

安装完成后，在终端或 PowerShell 中执行：

```bash
git --version
```

如果能看到版本号，说明安装成功。

第一次使用 Git，建议配置用户名和邮箱：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

这个用户名和邮箱会记录在提交历史中。

## 6. 把 Gitee 仓库克隆到本地

在 Gitee 仓库页面找到克隆地址，通常有 HTTPS 和 SSH 两种。

新手可以先用 HTTPS：

```bash
git clone https://gitee.com/用户名/仓库名.git
```

克隆完成后，进入项目目录：

```bash
cd 仓库名
```

## 7. 把本地项目上传到 Gitee

如果你已经有一个本地项目，可以这样上传。

进入项目目录：

```bash
cd 你的项目目录
```

初始化 Git：

```bash
git init
```

添加文件到暂存区：

```bash
git add .
```

提交修改：

```bash
git commit -m "初始化项目"
```

关联 Gitee 远程仓库：

```bash
git remote add origin https://gitee.com/用户名/仓库名.git
```

“关联远程仓库”的意思是：告诉本地 Git，这个本地项目对应的线上仓库地址在哪里。

本地 Git 仓库只负责记录你电脑里的修改历史。Gitee 上的仓库是另一个位置。你要把本地提交上传到 Gitee，Git 必须先知道上传目标是谁，所以需要配置远程仓库地址。

这里的 `origin` 是远程仓库的默认别名，意思可以理解为“这个项目默认对应的远程仓库”。它不是固定必须叫 `origin`，但绝大多数项目都会这样命名。

可以用下面的命令查看当前项目已经关联了哪些远程仓库：

```bash
git remote -v
```

如果项目没有关联远程仓库，直接执行 `git push` 通常会失败，因为 Git 不知道要把代码推送到哪里。

不关联远程仓库也能不能 push，要分情况：

- 如果完全没有远程仓库地址，不能正常 push。
- 如果你在 push 命令里临时写完整远程地址，理论上可以 push，但不方便，也不常用。
- 如果项目是通过 `git clone` 从 Gitee 下载的，通常已经自动关联好了远程仓库，不需要再手动执行 `git remote add origin ...`。

也就是说，push 的本质是“把本地 commit 上传到某个远程仓库”。不管是提前关联，还是命令里临时指定，Git 都必须知道远程仓库地址。

推送到 Gitee：

```bash
git push -u origin master
```

如果你的默认分支叫 `main`，则使用：

```bash
git push -u origin main
```

## 8. 日常使用流程

日常开发最常用的流程是：

```bash
git pull
git status
git add .
git commit -m "说明本次修改"
git push
```

含义如下：

1. `git pull`：先拉取远程最新代码。
2. `git status`：查看哪些文件被修改。
3. `git add .`：把修改加入暂存区。
4. `git commit -m "说明"`：保存一次提交记录。
5. `git push`：上传到 Gitee。

## 9. 使用分支开发

创建并切换到新分支：

```bash
git checkout -b feature-login
```

开发完成后提交：

```bash
git add .
git commit -m "完成登录功能"
git push -u origin feature-login
```

然后可以在 Gitee 页面发起 pull request 或 merge request，请其他人查看代码，确认后合并到主分支。

## 10. README 文件怎么写

README.md 是项目首页说明文件。一个基础 README 可以包含：

- 项目名称
- 项目简介
- 安装方式
- 使用方式
- 目录结构
- 技术栈
- 贡献方式
- 许可证

示例：

````markdown
# 项目名称

这是一个示例项目。

## 安装

```bash
npm install
```

## 运行

```bash
npm run dev
```
````

## 11. HTTPS 和 SSH 的区别

HTTPS 和 SSH 都是连接 Gitee 远程仓库的方式。它们的作用是让你的电脑和 Gitee 通信，用来 clone、pull、push 代码。

你在 Gitee 仓库页面看到的仓库地址通常会有两种：

```text
HTTPS: https://gitee.com/用户名/仓库名.git
SSH: git@gitee.com:用户名/仓库名.git
```

这两个地址指向的是同一个 Gitee 仓库，只是连接和身份验证方式不同。

HTTPS 使用账号密码或访问令牌认证，适合新手上手。使用 HTTPS 地址时，Git 会通过类似网页登录的方式访问 Gitee。现在很多平台不再推荐直接用账号密码推送，而是使用访问令牌。

HTTPS 的特点：

- 地址看起来像普通网页链接，以 `https://` 开头。
- 配置简单，复制地址就能 clone。
- push 时可能需要输入账号和访问令牌。
- 适合新手、临时使用、公司网络限制较多的环境。

SSH 使用密钥认证，配置一次后日常推送更方便。它不是用账号密码验证，而是用你电脑上的私钥和 Gitee 账号里的公钥进行匹配。

SSH 的特点：

- 地址通常以 `git@` 开头。
- 第一次需要配置 SSH key。
- 配置成功后，push 和 pull 通常不需要反复输入账号密码。
- 适合长期开发、频繁提交代码、团队协作。

可以把 HTTPS 和 SSH 理解成两种“开门方式”：

- HTTPS：每次通过账号和令牌证明你是谁。
- SSH：提前把你的公钥放到 Gitee，以后用本机私钥自动证明你是谁。

它们不是两套不同的代码，也不是两个不同仓库。它们只是访问同一个远程仓库的两种协议。

SSH 的大致流程是：

1. 本地生成 SSH 密钥。
2. 把公钥添加到 Gitee 账号。
3. 使用 SSH 地址克隆或推送仓库。

生成 SSH 密钥示例：

```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

生成密钥后，一般会得到两个文件：

- 私钥：保存在你自己的电脑上，不能发给别人。
- 公钥：可以添加到 Gitee 账号里，用来证明这台电脑有权限访问你的仓库。

如果你只是刚开始学习 Gitee，建议先用 HTTPS，因为步骤少。等你熟悉 clone、commit、push、pull 后，再学习 SSH 会更顺。

## 12. 常见问题

### 12.1 push 失败怎么办

先执行：

```bash
git pull
```

如果远程仓库有别人提交的新内容，需要先拉取并解决冲突，再推送。

### 12.2 提示没有权限怎么办

检查这些点：

- 是否登录了正确的 Gitee 账号。
- 是否拥有该仓库的写入权限。
- HTTPS 令牌是否正确。
- SSH 公钥是否已经添加到 Gitee。

### 12.3 文件太多不想上传怎么办

创建 `.gitignore` 文件，忽略不需要提交的文件，例如：

```gitignore
node_modules/
dist/
.env
*.log
```

### 12.4 不小心提交错了怎么办

如果还没有 push，可以修改后重新提交：

```bash
git add .
git commit --amend
```

如果已经 push 到远程仓库，建议先确认团队协作情况，不要随便改历史记录。

## 13. 建议的新手练习路线

1. 注册 Gitee 账号。
2. 创建一个公开测试仓库。
3. 在本地安装 Git。
4. clone 仓库到本地。
5. 新建一个 README.md 文件。
6. 使用 `git add`、`git commit`、`git push` 上传。
7. 在 Gitee 页面确认文件是否出现。
8. 创建一个新分支并推送。
9. 发起一次合并请求。
10. 学习 `.gitignore`、issue 和 README 写法。

## 14. 最小可用命令清单

```bash
git clone 仓库地址
git status
git add .
git commit -m "提交说明"
git pull
git push
git checkout -b 新分支名
git branch
git remote -v
```

掌握这些命令后，就可以完成大部分 Gitee 日常使用场景。

## 15. 总结

Gitee 是一个基于 Git 的代码托管和协作平台。新手使用 Gitee 的核心是理解“本地修改、提交记录、推送到远程仓库”这一条主线。

最重要的习惯是：

- 每次修改前先 `git pull`。
- 每次完成一个明确任务后再 `git commit`。
- commit 信息写清楚。
- 不要把密码、密钥、`.env` 等敏感文件提交到仓库。
- 多人协作时尽量使用分支和合并请求。
