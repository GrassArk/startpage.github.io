# GitHub Pages 导航页使用说明

## 目录结构

```
/root/startpage.github.io/
├── links.json          ← 【重要】修改这个文件来管理所有页面的链接
├── index.html          ← 主页（使用 links.json 中的 "home" 配置）
├── work.html           ← 工作页（使用 links.json 中的 "work" 配置）
├── deploy.sh           ← 一键部署脚本
└── README-USAGE.md     ← 本说明文档
```

---

## 快速使用

### 方法 1：直接修改 JSON 配置（推荐）

1. **编辑配置文件**
   ```bash
   nano /root/startpage.github.io/links.json
   ```

2. **按照格式添加链接**
   ```json
   {
     "name": "显示名称",
     "url": "https://example.com"
   }
   ```

3. **保存并部署**
   ```bash
   cd /root/startpage.github.io
   ./deploy.sh "添加了新网站"
   ```

---

### 方法 2：让 Claude Code 帮你修改

直接告诉我：
- "帮我在主页第1个区块添加 ChatGPT，链接是 https://chat.openai.com"
- "在工作页第2个区块添加 Z-Lib"
- "把主页第3个区块的'pixiv'删除"

我会自动修改 links.json 并执行部署！

---

## links.json 配置格式

```json
{
  "title": "StartPage",
  "pages": {
    "home": {
      "blocks": [
        {
          "name": "区块名称",
          "links": [
            {
              "name": "网站名称",
              "url": "https://example.com",
              "target": "_blank"
            }
          ]
        }
      ]
    },
    "work": {
      "blocks": [...]
    }
  }
}
```

### 页面说明

| 页面 | 文件 | 配置键 | 说明 |
|------|------|--------|------|
| 主页 | `index.html` | `pages.home` | 默认首页 |
| 工作页 | `work.html` | `pages.work` | 工作相关链接 |

### 特殊参数

- `target: "_self"` → 在当前窗口打开（用于 Obsidian 等本地协议）
- `target: "_blank"` → 在新窗口打开（默认）
- `url: ""` → 空链接，显示为 "blank" 占位

---

## 添加新页面

如需添加更多页面（如 `study.html`）：

1. **创建新的 HTML 文件**
   ```bash
   cp index.html study.html
   ```

2. **在 links.json 中添加配置**
   ```json
   "pages": {
     "home": {...},
     "work": {...},
     "study": {
       "blocks": [...]
     }
   }
   ```

3. **添加入口链接**
   ```json
   {"name": "Study", "url": "study.html"}
   ```

---

## 部署命令

```bash
# 基本部署（使用默认提交信息）
./deploy.sh

# 自定义提交信息
./deploy.sh "添加了 GitHub 链接"

# 快捷方式（从任何目录）
/root/startpage.github.io/deploy.sh "更新导航"
```

---

## 访问地址

- **主页**: https://grassark.github.io/startpage.github.io/
- **工作页**: https://grassark.github.io/startpage.github.io/work.html

---

## 常见问题

### Q: 修改后网站没有更新？
A: GitHub Pages 通常需要 10-30 秒更新，稍等片刻刷新即可。

### Q: 如何回滚到之前的版本？
A: 使用 Git 命令：
```bash
cd /root/startpage.github.io
git log --oneline  # 查看历史
git reset --hard HEAD~1  # 回滚到上一个版本
./deploy.sh "回滚到之前版本"
```

### Q: 如何添加新的区块？
A: 在对应页面的 `blocks` 数组中添加新的对象即可。

### Q: 每个区块最多几个链接？
A: 建议每个区块保持 9 个链接（用 "blank" 填充空位），以保持布局整齐。

---

## 获取帮助

任何时候都可以让 Claude Code 帮你：
- 修改配置文件
- 调整样式
- 添加新功能/新页面
- 解决问题

只需描述你的需求即可！
