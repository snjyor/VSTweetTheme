# 🎨 VS Tweet Theme - Twitter伪装VSCode扩展

> **🚀 v1.1.0 重大更新！** 右侧栏隐藏功能大幅改进，VSCode模拟更加真实！

## ✨ v1.1.0 新功能亮点

### 🎯 智能右侧栏隐藏系统
- 🔍 新增20+种CSS选择器，覆盖所有可能的右侧元素
- 🧠 智能兄弟元素检测算法，自动识别并隐藏右侧内容
- ⚡ 动态内容监听，实时处理新加载的右侧栏元素
- 📐 自动布局调整，主内容区域智能扩展到全宽

### 🎨 增强VSCode界面模拟
- 📁 更真实的文件树结构，包含完整的项目目录
- 🔧 Git状态显示，模拟真实的版本控制信息
- 🧩 扩展信息展示，显示常用的VSCode插件
- 💻 优化标题栏和状态栏，更贴近真实VSCode

### 🧪 完善测试环境
- 🌐 创建完整的Twitter DOM模拟测试页面
- 🎛️ 添加交互式功能测试按钮
- 🔍 提供本地开发调试环境

## ✨ v1.0.2 功能回顾

### 🎯 左侧导航VSCode文件样式
- 🏠 主页、📍 探索、💬 私信等导航项改为VSCode文件浏览器样式
- 🎨 采用VSCode的字体、颜色和交互效果
- ✨ 支持悬停高亮和选中状态，完全模拟真实VSCode

### 🚫 右侧内容完全隐藏
- 🔍 搜索框完全隐藏
- 📈 "当前趋势"板块移除
- 👥 "推荐关注"列表隐藏
- 🔗 页脚链接全部移除
- 📏 主内容区域自动扩展到全宽

### 👁️ 智能媒体悬停显示
- 🖼️ 图片/视频默认隐藏或显示占位符
- 🎯 鼠标悬停时自动显示原始内容
- ⚡ 移开鼠标后立即隐藏
- 🎥 视频支持自动播放/暂停
- 🎚️ 三种显示模式：隐藏、占位符、缩略图

---

## 📋 功能概述

将Twitter界面完美伪装成VSCode，让你在工作时间安全地浏览推文！

![VS Tweet Theme](https://img.shields.io/badge/Version-1.0.0-blue.svg) ![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg) ![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 项目简介

**VS Tweet Theme** 是一个专为"摸鱼"而生的Chrome浏览器扩展。它能够将Twitter界面完美伪装成VSCode编辑器，让你的推文看起来像是在写代码，完美骗过路过的同事和老板！

### ✨ 核心特性

- 🎭 **完美伪装**: 将Twitter界面转换为逼真的VSCode Dark+主题
- 📱 **媒体隐藏**: 自动隐藏或缩小图片、视频等媒体内容
- ⚡ **快速切换**: 支持快捷键一键切换模式
- 🚨 **紧急切换**: 老板来了？一键跳转到开发页面
- 🎨 **多主题支持**: Dark+, Light+, Monokai等多种VSCode主题
- 💻 **语言模拟**: 支持JavaScript、Python、TypeScript等多种编程语言风格
- 👁️ **悬停预览**: 鼠标悬停查看原始推文内容
- ⚙️ **高度自定义**: 丰富的设置选项，满足个性化需求

## 📦 安装方法

### 方式一：从源码安装（推荐）

1. **下载源码**
   ```bash
   git clone https://github.com/your-username/vs-tweet-theme.git
   cd vs-tweet-theme
   ```

2. **打开Chrome扩展管理页面**
   - 在Chrome地址栏输入：`chrome://extensions/`
   - 或者：设置 → 更多工具 → 扩展程序

3. **启用开发者模式**
   - 点击右上角的"开发者模式"开关

4. **加载扩展**
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

5. **完成安装** 🎉
   - 扩展图标会出现在浏览器工具栏
   - 访问Twitter即可使用

### 方式二：Chrome Web Store（即将上线）

> 🚧 我们正在准备将扩展提交到Chrome Web Store，敬请期待！

## 🎮 使用指南

### 基本操作

1. **启用VSCode模式**
   - 访问 [Twitter](https://twitter.com) 或 [X.com](https://x.com)
   - 点击扩展图标打开控制面板
   - 点击"启用VSCode模式"按钮
   - 或直接按 `Ctrl+Shift+V`

2. **查看效果**
   - Twitter界面会立即转换为VSCode风格
   - 推文内容显示为代码注释格式
   - 用户名转换为函数名风格
   - 媒体内容被隐藏或显示为占位符

3. **恢复原始界面**
   - 再次按 `Ctrl+Shift+V`
   - 或点击"关闭VSCode模式"按钮

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+V` | 切换VSCode模式 |
| `Ctrl+Shift+E` | 紧急切换到开发页面 |
| `Alt+H` | 切换悬停预览功能 |

### 高级设置

#### 主题选择
- **Dark+**: 经典深色主题（默认）
- **Light+**: 明亮主题
- **Monokai**: 经典Monokai配色
- **Dracula**: 流行的Dracula主题
- **GitHub Dark**: GitHub风格深色主题

#### 编程语言模拟
- **JavaScript**: .js文件风格
- **TypeScript**: .ts文件风格
- **Python**: .py文件风格
- **Java**: .java文件风格
- **C++**: .cpp文件风格
- **Rust**: .rs文件风格

#### 媒体内容处理
- **完全隐藏**: 不显示任何媒体内容
- **显示占位符**: 显示为代码注释风格的占位符
- **小缩略图**: 显示小尺寸的缩略图

## 🎯 使用场景

### 😴 办公室摸鱼
- 在工作电脑上安全浏览Twitter
- 界面看起来像在写代码
- 同事路过也不会发现

### 📚 学习环境
- 在图书馆或自习室使用
- 避免被认为在娱乐
- 保持专业形象

### 🏠 居家办公
- 视频会议时的完美掩护
- 屏幕共享时不会暴露
- 保持工作状态的假象

## 🛠️ 技术架构

### 核心技术
- **Manifest V3**: 现代Chrome扩展标准
- **Content Scripts**: 页面内容注入和修改
- **CSS注入**: 样式覆盖和主题应用
- **Chrome APIs**: 存储、标签页管理、快捷键等

### 文件结构
```
VSTweetTheme/
├── manifest.json          # 扩展配置文件
├── content/               # 内容脚本
│   ├── content.js         # 核心逻辑
│   └── vscode-theme.css   # VSCode样式
├── background/            # 后台脚本
│   └── background.js      # 后台服务
├── popup/                 # 弹出界面
│   ├── popup.html         # 界面结构
│   ├── popup.css          # 界面样式
│   └── popup.js           # 交互逻辑
└── assets/               # 资源文件
    └── icons/            # 扩展图标
```

## 🎨 界面预览

### Twitter原始界面
![Twitter原始界面](docs/images/twitter-original.png)

### VSCode模式界面
![VSCode模式界面](docs/images/vscode-mode.png)

### 设置面板
![设置面板](docs/images/settings-panel.png)

## 🔧 开发指南

### 环境要求
- Chrome 88+
- Node.js 16+ (可选，用于开发工具)

### 本地开发
1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/vs-tweet-theme.git
   cd vs-tweet-theme
   ```

2. **修改代码**
   - 编辑相应的JS/CSS文件
   - 主要逻辑在 `content/content.js`
   - 样式定义在 `content/vscode-theme.css`

3. **测试扩展**
   - 在Chrome扩展页面点击"重新加载"
   - 刷新Twitter页面测试效果

4. **调试技巧**
   - 使用Chrome开发者工具
   - 查看Console输出
   - 检查Elements面板的样式变化

### 贡献代码
1. Fork本仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交Pull Request

## 🔧 故障排除

### 常见问题

**Q: 扩展安装后没有效果？**
A: 请按以下步骤检查：
1. 确保已开启开发者模式并正确加载扩展
2. 检查当前页面是否为Twitter.com或X.com
3. 打开浏览器控制台(F12)，查看是否有错误信息
4. 刷新页面后再试
5. 运行调试脚本：在控制台粘贴 `test/debug.js` 的内容

**Q: 出现 "Cannot read properties of undefined" 错误？**
A: 这通常是权限问题，请：
1. 检查manifest.json权限配置
2. 重新加载扩展
3. 确保在Twitter页面使用

**Q: 快捷键不起作用？**
A: 请检查：
1. 快捷键是否与其他软件冲突
2. 是否在Twitter页面上使用
3. 尝试重新加载扩展
4. 检查Chrome扩展快捷键设置：chrome://extensions/shortcuts

**Q: 界面显示异常？**
A: 可能原因：
1. Twitter界面更新导致选择器失效
2. 与其他扩展冲突
3. 浏览器缓存问题，尝试清除缓存
4. CSS样式未正确加载

### 调试工具

如果遇到问题，可以使用内置的调试工具：
1. 在Twitter页面打开浏览器控制台(F12)
2. 复制 `test/debug.js` 文件内容并粘贴到控制台执行
3. 查看诊断结果，根据提示解决问题

### 重新安装步骤

如果问题持续存在：
1. 在 chrome://extensions/ 中移除扩展
2. 重启浏览器
3. 重新按照安装指南安装扩展

## 🐛 已知问题

- [ ] 某些Twitter更新可能导致样式失效
- [ ] 在某些浏览器缩放级别下可能显示异常
- [ ] 部分第三方Twitter客户端不兼容

## 🚀 未来计划

### v1.1.0
- [ ] 支持更多VSCode主题
- [ ] 添加自定义CSS功能
- [ ] 支持Firefox浏览器

### v1.2.0
- [ ] 支持其他社交媒体平台
- [ ] 添加团队协作功能
- [ ] 云端设置同步

### v2.0.0
- [ ] AI智能内容分析
- [ ] 更智能的伪装模式
- [ ] 移动端支持

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🤝 贡献者

感谢所有为这个项目做出贡献的开发者！

- [@your-username](https://github.com/your-username) - 项目创建者
- 欢迎更多贡献者加入！

## 💬 联系我们

- **GitHub Issues**: [提交问题](https://github.com/your-username/vs-tweet-theme/issues)
- **功能建议**: [提交建议](https://github.com/your-username/vs-tweet-theme/discussions)
- **邮件联系**: your-email@example.com

## ⭐ Star History

如果这个项目对你有帮助，请给我们一个Star！⭐

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/vs-tweet-theme&type=Date)](https://star-history.com/#your-username/vs-tweet-theme&Date)

## 🎉 致谢

- 感谢 [VSCode](https://code.visualstudio.com/) 提供的优秀设计灵感
- 感谢 [Twitter](https://twitter.com/) 平台
- 感谢所有测试用户的反馈和建议

---

**免责声明**: 本扩展仅供学习和娱乐目的使用，请合理安排工作和娱乐时间，遵守公司规章制度。作者不对因使用本扩展而产生的任何后果承担责任。

**Disclaimer**: This extension is for educational and entertainment purposes only. Please balance work and entertainment responsibly and comply with company policies. The author is not responsible for any consequences arising from the use of this extension.