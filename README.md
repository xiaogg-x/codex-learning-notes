# Codex 新人学习页

这是一个面向 Codex 初次使用者的本地学习项目。项目把多份入门说明整理成一个零依赖前端页面，帮助新人按顺序理解 Codex 的能力、权限、安全边界、插件/连接器、Git 工作流和项目规则配置。

## 页面入口

直接打开根目录下的 `index.html` 即可使用。

页面包含：

- 6 步学习路径
- 学习进度勾选和本地保存
- 关键词搜索
- 折叠详情
- 术语词典
- 常用提示词复制
- 安全提醒

## 学习顺序

1. 认识 Codex 是什么
2. 第一次怎么使用 Codex
3. 理解权限和安全边界
4. 分清技能、插件和连接器
5. 用 Git 管理 Codex 修改
6. 用 `AGENTS.md` 固定项目协作习惯

## 文档目录

原始整理文档位于 `docs/`：

- `codex_intro.md`：Codex 是什么、怎么用、功能和限制
- `codex_permissions.md`：权限、访问范围和控制方式
- `codex_plugins_connectors.md`：技能、插件和连接器说明
- `codex_git_workflow.md`：用 Git 管理 Codex 每一次修改
- `codex_context_and_persona.md`：上下文输入、人设和项目规则配置

## 本地预览

方式一：直接双击打开 `index.html`。

方式二：启动一个本地静态服务：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:8765/index.html
```

## 项目特点

- 零依赖：不需要安装 Node、React 或构建工具
- 单文件页面：所有 HTML、CSS、JavaScript 都在 `index.html`
- 新手优先：按第一次使用 Codex 的认知顺序组织内容
- 安全优先：突出工作区、沙盒、敏感文件、危险命令和 Git 保护流程

## 推荐使用方式

首次使用时，按页面中的 6 个阶段依次阅读，并把常用提示词复制到 Codex 对话里试用。

如果你继续扩展这个项目，建议每次修改前运行：

```bash
git status
```

修改后运行：

```bash
git diff
```

确认无误后再提交。
