# StartPage 导航页

这是一个托管在 GitHub Pages 上的个人导航页项目。它采用数据驱动的架构，所有的链接和页面配置都集中在 `links.json` 中管理，单页应用 (`index.html`) 通过 JavaScript 动态渲染内容。

**访问地址**: [https://grassark.github.io/startpage.github.io/](https://grassark.github.io/startpage.github.io/)

---

## 目录结构

```
/root/startpage.github.io/
├── links.json          ← 【核心】配置文件，管理所有页面的链接
├── index.html          ← 单页入口（根据 ?page= 参数加载不同配置）
├── source/             ← 静态资源（CSS, JS, 图片）
│   ├── style-new.css   ← 样式表（含响应式适配）
│   └── main.js         ← 核心逻辑（原生 JS）
├── deploy.sh           ← 自动部署脚本
└── README.md           ← 本文档
```

---

## 快速使用

### 方法 1：直接修改配置（推荐）

1. **编辑配置文件**
   ```bash
   nano links.json
   ```

2. **按照格式添加/修改链接**
   ```json
   {
     "name": "显示名称",
     "url": "https://example.com"
   }
   ```

3. **保存并部署**
   ```bash
   ./deploy.sh "添加了新网站"
   ```

### 方法 2：使用 AI 助手

直接告诉 Claude/Gemini：
- "帮我在主页第1个区块添加 ChatGPT，链接是 https://chat.openai.com"
- "在工作页第2个区块添加 Z-Lib"
- "把主页第3个区块的'pixiv'删除"

---

## 架构与配置 (Architecture)

### 单页系统 (SPA)

本项目现已重构为单页应用。所有页面共用 `index.html`，通过 URL 参数区分：

- **主页**: `index.html` 或 `index.html?page=home`
- **工作页**: `index.html?page=work`

### links.json 结构

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

- **`target`**: 默认为 `_blank` (新窗口打开)。如有需要可设为 `_self`。
- **空链接**: 使用 `{"name": "blank", "url": ""}` 作为占位符，保持布局整齐。

### 添加新页面

无需创建 HTML 文件！只需在 `links.json` 中添加配置：

1. 在 `pages` 对象下添加新键（例如 `"study"`）：
   ```json
   "pages": {
     "home": {...},
     "study": {
       "blocks": [...]
     }
   }
   ```
2. 访问地址即为 `index.html?page=study`。
3. 在其他页面添加跳转链接：`{"name": "Study", "url": "?page=study"}`。

---

## 开发与部署

### 响应式设计

项目使用 Flexbox 和 CSS Media Queries 实现了完全的响应式布局，完美支持：
- 桌面端（大屏）
- 平板/笔记本
- 手机端（单/双列布局自动切换）

### 部署命令

```bash
# 基本部署（使用默认提交信息）
./deploy.sh

# 自定义提交信息
./deploy.sh "重构了页面布局"
```

### Git 提交规范 (隐私安全)

**重要**: 提交信息 (`commit message`) 会公开在 GitHub 上，**严禁**包含隐私信息。

- ❌ **错误**: "添加了 user123 的私有链接", "修改密码为 xxx"
- ✅ **正确**: "更新链接配置", "优化样式", "添加新页面"

---

## 开发者指南 (For AI Assistants)

如果你是 Claude 或 Gemini 等 AI 助手，请遵循以下原则：

1. **核心原则**: 优先修改 `links.json` 来管理内容，不要硬编码链接到 HTML 中。
2. **代码风格**:
   - 使用原生 JavaScript (ES6+)，**不使用 jQuery**。
   - 样式统一写在 `source/style-new.css`，避免内联样式。
   - 保持语义化 HTML。
3. **架构感知**:
   - 这是一个单页应用，通过 `?page=` 参数路由。
   - 页面标题和 Favicon 会根据当前 `page` 动态更新。
4. **提交**: 使用 `./deploy.sh` 进行部署，保持提交信息简洁且不含隐私。

---

## 高级配置 (Advanced)

### 修改搜索引擎

搜索引擎配置位于 `source/main.js` 文件顶部的 `SEARCH_ENGINES` 常量中。

```javascript
const SEARCH_ENGINES = {
    'engine-google': {
        url: 'https://www.google.com/search',
        paramName: 'q'
    },
    // ... 添加更多引擎
};
```

如需修改或添加，请直接编辑该文件，并在 HTML 中对应的 `<ul>` 列表中添加选项。