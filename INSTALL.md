# 📦 VS Tweet Theme 安装指南

这份详细的安装指南将帮助你在Chrome浏览器中成功安装和配置VS Tweet Theme扩展。

## 🔧 系统要求

### 浏览器要求
- **Chrome**: 版本88或更高
- **Microsoft Edge**: 版本88或更高（基于Chromium）
- **其他Chromium内核浏览器**: 如Brave、Opera等

### 操作系统
- Windows 10/11
- macOS 10.14+
- Linux (Ubuntu 18.04+)

## 📥 安装方法

### 方法一：从源码安装（推荐）

#### 步骤1：下载源码

**选项A：使用Git克隆**
```bash
# 克隆仓库
git clone https://github.com/your-username/vs-tweet-theme.git

# 进入项目目录
cd vs-tweet-theme
```

**选项B：下载ZIP文件**
1. 访问 [GitHub仓库](https://github.com/your-username/vs-tweet-theme)
2. 点击绿色的"Code"按钮
3. 选择"Download ZIP"
4. 解压下载的文件到任意目录

#### 步骤2：打开Chrome扩展管理页面

**方法A：通过地址栏**
1. 在Chrome地址栏中输入：`chrome://extensions/`
2. 按回车键

**方法B：通过菜单**
1. 点击Chrome右上角的三点菜单
2. 选择"更多工具" → "扩展程序"

#### 步骤3：启用开发者模式
1. 在扩展管理页面右上角找到"开发者模式"开关
2. 点击开关启用开发者模式
3. 页面会显示额外的开发者选项

#### 步骤4：加载扩展
1. 点击"加载已解压的扩展程序"按钮
2. 在文件选择器中导航到VS Tweet Theme项目文件夹
3. 选择包含`manifest.json`的根目录
4. 点击"选择文件夹"

#### 步骤5：验证安装
1. 扩展应该出现在扩展列表中
2. 确保扩展开关处于"开启"状态
3. 在浏览器工具栏中应该能看到VS Tweet Theme图标

### 方法二：Chrome Web Store安装（即将推出）

> 🚧 我们正在准备将扩展提交到Chrome Web Store，届时安装将更加简便！

## ⚙️ 首次配置

### 1. 访问Twitter
- 打开新标签页
- 访问 [twitter.com](https://twitter.com) 或 [x.com](https://x.com)
- 登录你的Twitter账户

### 2. 测试扩展
1. 点击浏览器工具栏中的VS Tweet Theme图标
2. 在弹出的控制面板中点击"启用VSCode模式"
3. 观察Twitter界面是否成功转换为VSCode风格

### 3. 配置设置（可选）
在控制面板中可以调整以下设置：
- **主题选择**: Dark+, Light+, Monokai等
- **编程语言**: JavaScript, Python, TypeScript等
- **项目名称**: 自定义项目名称
- **媒体处理**: 选择媒体内容的显示方式

## 🔧 故障排除

### 常见问题及解决方案

#### 问题1：扩展无法加载
**症状**: 点击"加载已解压的扩展程序"后出现错误

**解决方案**:
1. 确保选择的是包含`manifest.json`的正确目录
2. 检查`manifest.json`文件格式是否正确
3. 确保所有必需的文件都存在

#### 问题2：扩展图标不显示
**症状**: 扩展已安装但工具栏中看不到图标

**解决方案**:
1. 检查扩展是否已启用
2. 点击工具栏右侧的扩展图标（拼图图标）
3. 找到VS Tweet Theme并点击固定图标

#### 问题3：在Twitter页面无效果
**症状**: 点击启用按钮后Twitter界面没有变化

**解决方案**:
1. 刷新Twitter页面
2. 检查浏览器控制台是否有错误信息
3. 确保当前页面是twitter.com或x.com
4. 尝试禁用其他可能冲突的扩展

#### 问题4：样式显示异常
**症状**: VSCode模式启用但界面显示混乱

**解决方案**:
1. 检查浏览器缩放级别（建议100%）
2. 清除浏览器缓存
3. 重新加载扩展
4. 尝试不同的主题设置

### 高级故障排除

#### 检查控制台错误
1. 在Twitter页面按F12打开开发者工具
2. 切换到"Console"标签
3. 查看是否有红色错误信息
4. 将错误信息复制并提交Issue

#### 重新安装扩展
1. 在扩展管理页面点击"移除"
2. 重新按照安装步骤操作
3. 清除浏览器缓存后重试

## 🔄 更新扩展

### 从Git仓库更新
```bash
# 进入项目目录
cd vs-tweet-theme

# 拉取最新代码
git pull origin main
```

### 手动更新
1. 下载最新版本的源码
2. 解压到原来的目录（覆盖旧文件）
3. 在扩展管理页面点击"重新加载"按钮

## 🗑️ 卸载扩展

### 完全卸载
1. 打开扩展管理页面：`chrome://extensions/`
2. 找到VS Tweet Theme扩展
3. 点击"移除"按钮
4. 确认卸载

### 保留设置的卸载
1. 只需在扩展管理页面关闭扩展开关
2. 扩展会被禁用但设置会保留
3. 重新启用时设置会恢复

## 📞 获取帮助

如果遇到安装问题，可以通过以下方式获取帮助：

### GitHub Issues
- 访问 [Issues页面](https://github.com/your-username/vs-tweet-theme/issues)
- 搜索是否有类似问题
- 创建新Issue描述你的问题

### 提交Issue时请包含
- 操作系统和版本
- Chrome浏览器版本
- 详细的错误描述
- 控制台错误信息（如有）
- 重现问题的步骤

### 社区讨论
- 访问 [Discussions页面](https://github.com/your-username/vs-tweet-theme/discussions)
- 参与社区讨论
- 分享使用经验

## 🎯 下一步

安装成功后，建议：

1. **阅读使用指南**: 查看README.md了解详细功能
2. **设置快捷键**: 熟悉Ctrl+Shift+V等快捷键
3. **自定义设置**: 根据个人喜好调整主题和选项
4. **分享反馈**: 在GitHub上分享使用体验

---

**技术支持**: 如果本指南没有解决你的问题，请不要犹豫联系我们！ 