# Book Notes Reminder (读书笔记每日推送)

这是一个利用 GitHub Actions 每天定时从你的笔记库中随机抽取 8 条笔记并发送到 QQ 邮箱的小工具。

## 功能介绍

- **本地存储**：将你的读书笔记（Markdown 格式）保存在 `notes/` 目录下。
- **自动抽取**：每天定时（默认北京时间 08:30）随机选取 8 条笔记。
- **邮件推送**：通过 QQ 邮箱 SMTP 服务发送精选出的笔记到你的邮箱。

## 如何使用

### 1. 准备笔记
直接在 `notes/` 目录下添加你的 Markdown 笔记文件。文件名将作为选取的标题。

### 2. 配置 GitHub Secrets (重要)
在你的 GitHub 仓库设置中，点击 `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`，添加以下两个密钥：

- `QQMAIL_USERNAME`: 你的 QQ 邮箱地址 (例如: `123456@qq.com`)。
- `QQMAIL_PASSWORD`: 你的 QQ 邮箱 **SMTP 授权码** (在 QQ 邮箱设置 -> 账号 -> POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务 中开启并获取)。

### 3. 修改推送时间 (可选)
编辑 `.github/workflows/daily-push.yml` 中的 `cron` 表达式：
```yaml
on:
  schedule:
    - cron: '30 0 * * *' # UTC 时间，00:30 为北京时间 08:30
```

## 本地测试

如果你想在本地测试脚本，可以运行：
```bash
npm install
npx tsx scripts/pick-notes.ts
```
运行后会生成 `daily-selection.md` 和 `daily-subject.txt` 文件。

---
*温故而知新，可以为师矣。*
