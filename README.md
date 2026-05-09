# Codex 与代码托管学习页

这是一个面向初次使用者的本地静态学习项目。项目把 Codex 入门、Git 工作流、GitHub 和 Gitee 学习流程整理成可直接打开的前端页面和配套 Markdown 文档。

## 页面入口

主学习页：

- `codex-learning-path.html`：Codex 新人学习路径主页。

代码托管平台学习页：

- `code-hosting-guides/github-beginner-guide.html`：GitHub 新手学习流程。
- `code-hosting-guides/gitee-beginner-guide.html`：Gitee 新手学习流程。

这些页面都是零依赖静态文件，可以直接双击打开。

## 目录说明

- `codex-guides/`：Codex 相关 Markdown 学习资料。
- `git-github-notes/`：Git、GitHub 和 GitHub CLI 的说明笔记。
- `gitee-notes/`：Gitee 入门说明笔记。
- `code-hosting-guides/`：GitHub/Gitee 前端学习子页面。
- `code-hosting-guides/assets/`：代码托管学习页共用样式和交互脚本。

## 文档清单

Codex 学习资料：

- `codex-guides/codex-overview.md`：Codex 是什么、怎么用、功能和限制。
- `codex-guides/codex-permissions-and-safety.md`：权限、访问范围和安全边界。
- `codex-guides/codex-skills-plugins-connectors.md`：技能、插件和连接器说明。
- `codex-guides/codex-git-workflow.md`：用 Git 管理 Codex 每一次修改。
- `codex-guides/codex-context-persona-rules.md`：上下文输入、人设和项目规则配置。

代码托管资料：

- `git-github-notes/git-github-gh-login-guide.md`：Git、GitHub、gh 的区别、联系和登录说明。
- `gitee-notes/gitee-beginner-guide.md`：Gitee 入门指南。

## 本地预览

方式一：直接打开 `codex-learning-path.html`。

方式二：启动一个本地静态服务：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:8765/codex-learning-path.html
```

## 项目特点

- 零依赖：不需要安装 Node、React 或构建工具。
- 静态页面：HTML、CSS 和 JavaScript 都在本仓库内。
- 新手优先：按第一次使用 Codex、GitHub、Gitee 的认知顺序组织内容。
- 安全优先：突出工作区、沙盒、敏感文件、危险命令、远程仓库和访问令牌风险。

## 推荐使用方式

首次使用时，先打开 `codex-learning-path.html`，按页面中的 6 个阶段阅读。需要学习远程仓库时，再进入 GitHub 或 Gitee 子页面。

继续扩展这个项目时，建议每次修改前运行：

```bash
git status
```

修改后运行：

```bash
git diff
```

确认无误后再提交。
