# 用 Git 管理 Codex 每一次修改

> 更新日期：2026-05-08  
> 当前工作区：`E:\code\codex_projects\first_use`

## 1. `git status` 是什么意思

`git status` 是 Git 里最常用、也最安全的检查命令。它不会修改任何文件，只会告诉你当前项目的状态。

你可以把它理解成：

```text
现在这个项目里，有哪些文件被改过？哪些文件是新建的？哪些文件准备提交？当前在哪个分支？
```

运行方式：

```bash
git status
```

如果你在 PowerShell 里，可以直接输入：

```powershell
git status
```

## 2. 为什么使用 Codex 前要先看 `git status`

因为 Codex 会帮你改文件。改之前你最好先知道：

- 当前有没有你自己还没保存进 Git 的改动
- 当前有没有别人或其他工具生成的改动
- 项目是不是一个 Git 仓库
- 当前分支是不是你希望工作的分支

这样做的目的不是复杂化流程，而是给自己一个安全网。

如果 Codex 改完后你不满意，Git 可以帮你看到它改了什么，甚至回退这些改动。

## 3. `git status` 常见结果怎么看

### 3.1 干净状态

如果看到类似：

```text
On branch main
nothing to commit, working tree clean
```

意思是：

- 当前在 `main` 分支
- 没有未提交改动
- 这是最适合让 Codex 开始工作的状态

### 3.2 有修改过的文件

如果看到类似：

```text
Changes not staged for commit:
  modified:   src/app.js
```

意思是：

- `src/app.js` 已经被修改
- 但还没有加入下一次提交
- 这可能是你自己改的，也可能是工具改的

这时你应该先确认这些改动是不是你想保留的。

### 3.3 有新文件

如果看到类似：

```text
Untracked files:
  notes.md
```

意思是：

- `notes.md` 是新文件
- Git 还没有开始跟踪它

如果这是你想保留的文件，可以之后用 `git add notes.md` 加入 Git。

### 3.4 有已暂存文件

如果看到类似：

```text
Changes to be committed:
  modified:   README.md
```

意思是：

- 这个文件已经被 `git add` 加入暂存区
- 下一次 `git commit` 会提交它

## 4. Git 管理 Codex 修改的推荐流程

下面是我建议你使用 Codex 时采用的标准流程。

## 5. 第一步：确认项目是 Git 仓库

在项目根目录运行：

```bash
git status
```

如果看到：

```text
fatal: not a git repository
```

说明当前目录还不是 Git 仓库。

如果这是一个你想长期管理的项目，可以初始化：

```bash
git init
```

然后先提交一次初始版本：

```bash
git add .
git commit -m "Initial commit"
```

注意：如果项目里有密钥、`.env`、大文件、隐私数据，初始化前应先配置 `.gitignore`，不要把敏感文件提交进去。

## 6. 第二步：让 Codex 工作前检查状态

每次让 Codex 修改代码前，先运行：

```bash
git status
```

如果工作区是干净的，可以放心开始：

```text
当前工作区是干净的。请实现这个功能，并在完成后说明改了哪些文件。
```

如果工作区不干净，你可以这样告诉 Codex：

```text
当前有我未提交的改动。请不要覆盖或回退它们，只围绕本次任务做最小修改。
```

更稳的做法是：先把你自己的改动提交掉，再让 Codex 开始。

## 7. 第三步：给每个任务开一个分支

推荐不要直接在 `main` 分支上工作。

新建分支：

```bash
git switch -c codex/add-user-export
```

分支命名可以简单一点：

```text
codex/任务名
```

例如：

```bash
git switch -c codex/fix-login-error
git switch -c codex/update-readme
git switch -c codex/add-csv-export
```

这样做的好处：

- Codex 的改动和主分支隔离
- 不满意可以直接丢掉这个分支
- 满意后再合并
- 之后创建 PR 更方便

## 8. 第四步：让 Codex 修改文件

你可以这样下任务：

```text
请在当前分支上实现登录错误提示。只改相关文件，完成后运行相关测试，并总结改动。
```

如果你希望更保守：

```text
请先分析需要改哪些文件，不要直接修改。等我确认后再执行。
```

## 9. 第五步：查看 Codex 改了什么

Codex 完成后，先运行：

```bash
git status
```

你会看到哪些文件被修改或新增。

然后查看具体差异：

```bash
git diff
```

`git diff` 会显示还没有暂存的改动。

如果你已经执行过 `git add`，可以看暂存区差异：

```bash
git diff --staged
```

建议你重点看：

- 是否只改了相关文件
- 有没有误改配置或锁文件
- 有没有删除不该删除的代码
- 是否有密钥、token、隐私数据被写进文件
- 是否有明显不符合你业务规则的逻辑

## 10. 第六步：运行测试或检查

根据项目类型运行对应命令，例如：

```bash
npm test
npm run lint
npm run build
pytest
cargo test
go test ./...
```

你也可以直接让 Codex 做：

```text
请运行项目中最相关的测试或检查命令。如果失败，请解释原因并尝试修复。
```

如果测试通过，再考虑提交。

## 11. 第七步：选择要提交的文件

如果所有改动都要提交：

```bash
git add .
```

如果只想提交部分文件：

```bash
git add path/to/file1 path/to/file2
```

更精细地选择某些代码块：

```bash
git add -p
```

`git add -p` 会让你逐块选择是否加入提交。新手可以先不用，熟悉后它非常好用。

## 12. 第八步：提交 Codex 的修改

提交：

```bash
git commit -m "Fix login error message"
```

提交信息建议简短说明“做了什么”，例如：

```bash
git commit -m "Add Codex permission guide"
git commit -m "Fix checkout total calculation"
git commit -m "Update onboarding documentation"
```

你也可以让 Codex 帮你写提交信息：

```text
请根据当前 diff 给我一个简洁的 commit message。
```

## 13. 如果不满意 Codex 的修改怎么办

先看状态：

```bash
git status
```

如果你还没有提交，只想丢掉某个文件的改动：

```bash
git restore path/to/file
```

如果想丢掉所有未提交改动：

```bash
git restore .
```

如果还有新建但未被 Git 跟踪的文件，`git restore .` 不会删除它们。查看新文件：

```bash
git status
```

删除未跟踪文件可以用：

```bash
git clean -n
```

这个命令只预览会删除什么，不会真的删除。

确认后才执行：

```bash
git clean -f
```

注意：`git clean -f` 会删除未跟踪文件，新手要谨慎使用。可以先让我解释输出。

## 14. 如果已经提交了但想撤回

如果只是想撤销最后一次提交，但保留文件改动：

```bash
git reset --soft HEAD~1
```

如果想撤销提交并把改动放回未暂存状态：

```bash
git reset HEAD~1
```

如果想彻底丢掉最后一次提交和对应改动：

```bash
git reset --hard HEAD~1
```

`git reset --hard` 是高风险命令，会丢失文件改动。除非你非常确定，否则不要轻易执行。更安全的方式是先问 Codex：

```text
我想撤销最后一次提交，但不确定用哪个命令。请先解释不同选项，不要执行。
```

## 15. 一个完整示例

假设你要让我修改登录错误提示。

### 15.1 检查状态

```bash
git status
```

看到：

```text
nothing to commit, working tree clean
```

说明可以开始。

### 15.2 新建分支

```bash
git switch -c codex/fix-login-error
```

### 15.3 让 Codex 修改

```text
请修复登录失败时错误提示不显示的问题。只改相关文件，完成后运行相关测试。
```

### 15.4 查看改动

```bash
git status
git diff
```

### 15.5 测试

```bash
npm test
```

### 15.6 提交

```bash
git add .
git commit -m "Fix login error display"
```

### 15.7 回到主分支并合并

如果你想把改动合回主分支：

```bash
git switch main
git merge codex/fix-login-error
```

如果你使用 GitHub，也可以把这个分支推上去开 PR。

## 16. 你可以给 Codex 的安全提示词

### 16.1 开始任务前

```text
请先运行 git status，告诉我当前工作区是否干净。不要修改文件。
```

### 16.2 有未提交改动时

```text
当前工作区有我自己的未提交改动。请不要覆盖、回退或格式化无关文件，只做本次任务所需的最小修改。
```

### 16.3 修改完成后

```text
请总结你修改了哪些文件、为什么改、运行了哪些测试。不要提交代码。
```

### 16.4 准备提交时

```text
请根据当前 git diff 给我一个 commit message，并指出是否有不应该提交的文件。
```

### 16.5 想撤销时

```text
请帮我看当前 git status 和 git diff，然后告诉我如何安全撤销 Codex 刚才的改动。先不要执行撤销命令。
```

## 17. 推荐你的日常规则

最简单的规则：

```text
每次让 Codex 修改前：
1. git status
2. 新建分支
3. 让 Codex 小步修改
4. git diff 检查
5. 运行测试
6. git add
7. git commit
```

如果是非常小的文档改动，可以不单独建分支，但仍建议看 `git status` 和 `git diff`。

## 18. 当前这个目录的情况

当前目录里我已经生成了几份 Markdown 文档：

```text
codex_intro.md
codex_permissions.md
codex_plugins_connectors.md
codex_git_workflow.md
```

如果这个目录还不是 Git 仓库，你可以运行：

```bash
git init
git add .
git commit -m "Add Codex onboarding docs"
```

这样这些文档就会成为一次明确的初始提交。

## 19. 一句话总结

`git status` 是你使用 Codex 前后的安全检查。它告诉你当前有哪些文件被修改、新增或准备提交。最推荐的 Codex 工作流是：先确认工作区干净，给任务开分支，让 Codex 小步修改，改完看 `git diff`，测试通过后再 `git add` 和 `git commit`。这样每一次 Codex 的修改都有记录、可 review、可回退。
