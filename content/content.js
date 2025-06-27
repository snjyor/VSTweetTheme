/**
 * VS Tweet Theme - 内容脚本
 * 负责将Twitter界面转换为VSCode风格
 */

class VSTweetTheme {
  constructor() {
    this.isActive = false;
    this.settings = {
      theme: 'dark-plus',
      language: 'javascript',
      hideMedia: true,
      showLineNumbers: true,
      projectName: 'twitter-feed'
    };
    
    this.init();
  }

  async init() {
    // 加载用户设置
    await this.loadSettings();
    
    // 创建切换按钮
    this.createToggleButton();
    
    // 监听快捷键
    this.setupKeyboardShortcuts();
    
    // 监听页面变化
    this.setupMutationObserver();
    
    // 监听来自popup的消息
    this.setupMessageListener();
    
    console.log('🎨 VS Tweet Theme 已加载');
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(this.settings);
      this.settings = { ...this.settings, ...result };
    } catch (error) {
      console.log('使用默认设置');
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.sync.set(this.settings);
    } catch (error) {
      console.error('保存设置失败:', error);
    }
  }

  createToggleButton() {
    const button = document.createElement('button');
    button.className = 'vs-tweet-toggle-btn';
    button.textContent = '🎨 VSCode模式';
    button.title = '按 Ctrl+Shift+V 快速切换';
    
    button.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    document.body.appendChild(button);
    this.toggleButton = button;
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      // Ctrl+Shift+V 切换主题
      if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault();
        this.toggleTheme();
      }
      
      // Ctrl+Shift+E 紧急切换
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        this.emergencySwitch();
      }
      
      // Alt+H 悬停预览切换
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        this.toggleHoverPreview();
      }
    });
  }

  setupMutationObserver() {
    // 监听DOM变化，处理动态加载的内容
    const observer = new MutationObserver((mutations) => {
      if (this.isActive) {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                this.processTweets(node);
                this.processMedia(node);
                
                // 检查是否是新的右侧栏元素并隐藏
                this.checkAndHideRightSidebarElements(node);
              }
            });
          }
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      try {
        switch (request.action) {
          case 'toggle-theme':
            this.toggleTheme();
            sendResponse({ success: true, isActive: this.isActive });
            break;
          case 'update-settings':
            this.settings = { ...this.settings, ...request.settings };
            this.saveSettings();
            if (this.isActive) {
              this.applyTheme();
            }
            sendResponse({ success: true });
            break;
          case 'get-status':
            sendResponse({ 
              success: true,
              isActive: this.isActive,
              settings: this.settings 
            });
            break;
          default:
            sendResponse({ success: false, error: 'Unknown action' });
        }
      } catch (error) {
        console.error('处理消息失败:', error);
        sendResponse({ success: false, error: error.message });
      }
      
      return true; // 保持消息通道开放
    });
  }

  toggleTheme() {
    this.isActive = !this.isActive;
    
    if (this.isActive) {
      this.applyTheme();
      this.toggleButton.textContent = '🔄 恢复Twitter';
      this.showNotification('VSCode模式已启用', 'success');
    } else {
      this.removeTheme();
      this.toggleButton.textContent = '🎨 VSCode模式';
      this.showNotification('已恢复Twitter界面', 'info');
    }
  }

  applyTheme() {
    // 添加主题类
    document.documentElement.classList.add('vs-tweet-theme-active');
    document.body.classList.add('vscode-theme');
    
    // 隐藏右侧元素
    this.hideRightSidebar();
    
    // 创建VSCode界面元素
    this.createVSCodeLayout();
    
    // 处理现有推文
    this.processAllTweets();
    
    // 处理媒体内容
    this.processAllMedia();
    
    // 添加代码语法高亮
    this.addSyntaxHighlighting();
    
    // 调整布局
    this.adjustLayout();
  }

  removeTheme() {
    // 移除主题类
    document.documentElement.classList.remove('vs-tweet-theme-active');
    document.body.classList.remove('vscode-theme');
    
    // 移除VSCode布局元素
    this.removeVSCodeLayout();
    
    // 恢复原始内容
    this.restoreOriginalContent();
    
    // 恢复右侧栏
    this.showRightSidebar();
  }

  createVSCodeLayout() {
    // 创建文件标签栏
    if (!document.getElementById('vscode-tabs')) {
      const tabs = document.createElement('div');
      tabs.id = 'vscode-tabs';
      tabs.innerHTML = `
        <div class="tab active">
          <span class="tab-icon">📄</span>
          <span class="tab-name">${this.settings.projectName}.${this.getFileExtension()}</span>
          <span class="tab-close">×</span>
        </div>
        <div class="tab">
          <span class="tab-icon">📄</span>
          <span class="tab-name">trending.json</span>
        </div>
      `;
      document.body.appendChild(tabs);
    }

    // 创建面包屑导航
    if (!document.getElementById('vscode-breadcrumb')) {
      const breadcrumb = document.createElement('div');
      breadcrumb.id = 'vscode-breadcrumb';
      breadcrumb.innerHTML = `
        <span>📁 ${this.settings.projectName}</span>
        <span class="separator">></span>
        <span>src</span>
        <span class="separator">></span>
        <span>${this.settings.projectName}.${this.getFileExtension()}</span>
      `;
      document.body.appendChild(breadcrumb);
    }
  }

  removeVSCodeLayout() {
    const elementsToRemove = [
      'vscode-tabs',
      'vscode-breadcrumb'
    ];
    
    elementsToRemove.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });
  }

  processAllTweets() {
    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    tweets.forEach(tweet => this.processTweets(tweet));
  }

  processTweets(container) {
    const tweets = container.querySelectorAll ? 
      container.querySelectorAll('[data-testid="tweet"]') : 
      (container.matches && container.matches('[data-testid="tweet"]') ? [container] : []);

    tweets.forEach(tweet => {
      if (tweet.dataset.vsProcessed) return;
      
      // 标记已处理
      tweet.dataset.vsProcessed = 'true';
      
      // 处理用户名
      const userNames = tweet.querySelectorAll('[data-testid="User-Name"] a');
      userNames.forEach(userName => {
        if (!userName.dataset.vsProcessed) {
          userName.dataset.vsProcessed = 'true';
          userName.dataset.originalText = userName.textContent;
        }
      });

      // 处理推文内容
      const tweetTexts = tweet.querySelectorAll('[data-testid="tweetText"]');
      tweetTexts.forEach(text => {
        if (!text.dataset.vsProcessed) {
          text.dataset.vsProcessed = 'true';
          text.dataset.originalContent = text.innerHTML;
          this.convertToCodeComment(text);
        }
      });

      // 添加悬停预览功能
      this.addHoverPreview(tweet);
    });
  }

  convertToCodeComment(textElement) {
    const content = textElement.textContent;
    const lines = content.split('\n');
    
    const codeLines = lines.map(line => {
      if (line.trim()) {
        return `<span class="code-comment">// ${line}</span>`;
      }
      return '<span class="code-comment">//</span>';
    });
    
    textElement.innerHTML = codeLines.join('<br>');
  }

  processAllMedia() {
    const mediaElements = document.querySelectorAll(`
      [data-testid="tweetPhoto"],
      [data-testid="videoPlayer"],
      [data-testid="tweetVideo"],
      video,
      img[src*="pbs.twimg.com"]
    `);
    
    mediaElements.forEach(media => this.processMedia(media));
  }

  processMedia(container) {
    const mediaElements = container.querySelectorAll ? 
      container.querySelectorAll(`
        [data-testid="tweetPhoto"],
        [data-testid="videoPlayer"],
        [data-testid="tweetVideo"],
        video,
        img[src*="pbs.twimg.com"]
      `) : 
      (container.matches && container.matches(`
        [data-testid="tweetPhoto"],
        [data-testid="videoPlayer"],
        [data-testid="tweetVideo"],
        video,
        img[src*="pbs.twimg.com"]
      `) ? [container] : []);

    mediaElements.forEach(media => {
      if (media.dataset.vsProcessed) return;
      
      media.dataset.vsProcessed = 'true';
      
      if (this.settings.hideMedia) {
        // 创建媒体占位符
        const placeholder = document.createElement('div');
        placeholder.className = 'media-placeholder';
        placeholder.innerHTML = this.getMediaPlaceholder(media);
        
        // 添加点击展开功能
        placeholder.addEventListener('click', () => {
          this.toggleMediaVisibility(media, placeholder);
        });
        
        // 替换原媒体元素
        media.parentNode.insertBefore(placeholder, media);
        media.style.display = 'none';
      }
    });
  }

  getMediaPlaceholder(media) {
    const mediaType = this.getMediaType(media);
    const icons = {
      image: '🖼️',
      video: '🎥',
      gif: '🎞️'
    };
    
    return `
      <div class="code-line">
        <span class="code-comment">// 📎 附件: </span>
        <span class="code-string">${icons[mediaType] || '📎'} media-${mediaType}.${this.getMediaExtension(mediaType)}</span>
        <span class="code-comment"> (点击查看)</span>
      </div>
    `;
  }

  getMediaType(element) {
    if (element.tagName === 'VIDEO' || element.querySelector('video')) {
      return 'video';
    }
    if (element.src && element.src.includes('.gif')) {
      return 'gif';
    }
    return 'image';
  }

  getMediaExtension(type) {
    const extensions = {
      image: 'jpg',
      video: 'mp4',
      gif: 'gif'
    };
    return extensions[type] || 'file';
  }

  getFileExtension() {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      rust: 'rs'
    };
    return extensions[this.settings.language] || 'js';
  }

  toggleMediaVisibility(media, placeholder) {
    if (media.style.display === 'none') {
      media.style.display = '';
      placeholder.style.display = 'none';
    } else {
      media.style.display = 'none';
      placeholder.style.display = '';
    }
  }

  addHoverPreview(tweet) {
    let previewTimeout;
    
    tweet.addEventListener('mouseenter', () => {
      if (this.isActive) {
        previewTimeout = setTimeout(() => {
          this.showHoverPreview(tweet);
        }, 1000); // 1秒后显示预览
      }
    });
    
    tweet.addEventListener('mouseleave', () => {
      if (previewTimeout) {
        clearTimeout(previewTimeout);
      }
      this.hideHoverPreview();
    });
  }

  showHoverPreview(tweet) {
    // 移除现有预览
    this.hideHoverPreview();
    
    // 创建预览窗口
    const preview = document.createElement('div');
    preview.className = 'vs-tweet-hover-preview';
    preview.innerHTML = `
      <div class="preview-header">
        <strong>原始推文预览</strong>
        <button class="preview-close">×</button>
      </div>
      <div class="preview-content">
        ${tweet.innerHTML}
      </div>
    `;
    
    // 添加关闭功能
    preview.querySelector('.preview-close').addEventListener('click', () => {
      this.hideHoverPreview();
    });
    
    document.body.appendChild(preview);
    this.currentPreview = preview;
  }

  hideHoverPreview() {
    if (this.currentPreview) {
      this.currentPreview.remove();
      this.currentPreview = null;
    }
  }

  addSyntaxHighlighting() {
    // 为代码注释添加语法高亮效果
    const style = document.createElement('style');
    style.textContent = `
      .code-comment { color: var(--vscode-comment) !important; }
      .code-string { color: var(--vscode-string) !important; }
      .code-keyword { color: var(--vscode-keyword) !important; }
      .code-function { color: var(--vscode-function) !important; }
      .code-variable { color: var(--vscode-variable) !important; }
      .code-line { 
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
        line-height: 1.5 !important;
      }
      .media-placeholder {
        padding: 8px 0;
        cursor: pointer;
        border-left: 3px solid var(--vscode-accent);
        padding-left: 10px;
        margin: 8px 0;
        background-color: rgba(0, 122, 204, 0.1);
        border-radius: 3px;
      }
      .media-placeholder:hover {
        background-color: rgba(0, 122, 204, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  restoreOriginalContent() {
    // 恢复所有被修改的内容
    const processedElements = document.querySelectorAll('[data-vs-processed="true"]');
    processedElements.forEach(element => {
      if (element.dataset.originalContent) {
        element.innerHTML = element.dataset.originalContent;
      }
      if (element.dataset.originalText) {
        element.textContent = element.dataset.originalText;
      }
      delete element.dataset.vsProcessed;
      delete element.dataset.originalContent;
      delete element.dataset.originalText;
    });

    // 恢复媒体元素
    const hiddenMedia = document.querySelectorAll('[data-vs-processed="true"][style*="display: none"]');
    hiddenMedia.forEach(media => {
      media.style.display = '';
    });

    // 移除占位符
    const placeholders = document.querySelectorAll('.media-placeholder');
    placeholders.forEach(placeholder => placeholder.remove());
  }

  emergencySwitch() {
    // 紧急切换到开发页面
    const devUrls = [
      'https://github.com',
      'https://stackoverflow.com',
      'https://developer.mozilla.org',
      'https://code.visualstudio.com'
    ];
    
    const randomUrl = devUrls[Math.floor(Math.random() * devUrls.length)];
    window.location.href = randomUrl;
  }

  toggleHoverPreview() {
    // 切换悬停预览功能
    this.hoverPreviewEnabled = !this.hoverPreviewEnabled;
    this.showNotification(
      `悬停预览${this.hoverPreviewEnabled ? '已启用' : '已禁用'}`,
      'info'
    );
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `vs-notification vs-notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      border-radius: 4px;
      z-index: 99999;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * 处理媒体内容（图片、视频、GIF）
   */
  handleMediaContent() {
    const mediaElements = document.querySelectorAll('img, video');
    
    mediaElements.forEach(element => {
      // 跳过已处理的元素
      if (element.dataset.vstweetProcessed) return;
      element.dataset.vstweetProcessed = 'true';
      
      // 跳过头像、图标等小图片
      if (element.width < 50 || element.height < 50) return;
      
      // 跳过VSCode主题相关的元素
      if (element.closest('.vscode-theme-ui')) return;
      
      const isVideo = element.tagName === 'VIDEO';
      const isImage = element.tagName === 'IMG';
      
      // 根据设置决定如何处理
      if (this.settings.mediaHandling === 'hide') {
        this.hideMediaWithHover(element, isVideo);
      } else if (this.settings.mediaHandling === 'placeholder') {
        this.replaceWithPlaceholderAndHover(element, isVideo);
      } else if (this.settings.mediaHandling === 'thumbnail') {
        this.createThumbnailWithHover(element, isVideo);
      }
    });
  }

  /**
   * 隐藏媒体并添加悬停显示功能
   */
  hideMediaWithHover(element, isVideo) {
    const container = document.createElement('div');
    container.className = 'media-hover-container';
    
    // 创建占位符
    const placeholder = document.createElement('div');
    placeholder.className = `media-placeholder ${isVideo ? 'video' : 'image'}`;
    placeholder.style.width = element.width ? `${element.width}px` : '100%';
    placeholder.style.height = element.height ? `${element.height}px` : '200px';
    
    // 创建悬停内容容器
    const hoverContent = document.createElement('div');
    hoverContent.className = 'media-hover-content';
    
    // 克隆原始元素
    const clonedElement = element.cloneNode(true);
    clonedElement.style.width = '100%';
    clonedElement.style.height = '100%';
    clonedElement.style.objectFit = 'contain';
    
    hoverContent.appendChild(clonedElement);
    
    // 插入容器
    element.parentNode.insertBefore(container, element);
    container.appendChild(placeholder);
    container.appendChild(hoverContent);
    
    // 隐藏原始元素
    element.style.display = 'none';
    
    // 添加悬停事件
    this.addHoverEvents(container, placeholder, hoverContent, clonedElement, isVideo);
  }

  /**
   * 用占位符替换并添加悬停显示功能
   */
  replaceWithPlaceholderAndHover(element, isVideo) {
    const container = document.createElement('div');
    container.className = 'media-hover-container';
    
    const placeholder = document.createElement('div');
    placeholder.className = `media-placeholder ${isVideo ? 'video' : 'image'}`;
    placeholder.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--vscode-descriptionForeground);">
        ${isVideo ? '🎥' : '🖼️'} ${isVideo ? '视频内容' : '图片内容'}
        <br><small>悬停查看</small>
      </div>
    `;
    
    // 保持原始尺寸
    const rect = element.getBoundingClientRect();
    placeholder.style.width = rect.width ? `${rect.width}px` : '100%';
    placeholder.style.height = rect.height ? `${rect.height}px` : '200px';
    
    // 创建悬停内容
    const hoverContent = document.createElement('div');
    hoverContent.className = 'media-hover-content';
    
    const clonedElement = element.cloneNode(true);
    clonedElement.style.width = '100%';
    clonedElement.style.height = '100%';
    clonedElement.style.objectFit = 'contain';
    
    hoverContent.appendChild(clonedElement);
    
    // 替换元素
    element.parentNode.insertBefore(container, element);
    container.appendChild(placeholder);
    container.appendChild(hoverContent);
    element.remove();
    
    // 添加悬停事件
    this.addHoverEvents(container, placeholder, hoverContent, clonedElement, isVideo);
  }

  /**
   * 创建缩略图并添加悬停显示功能
   */
  createThumbnailWithHover(element, isVideo) {
    const container = document.createElement('div');
    container.className = 'media-hover-container';
    
    // 创建缩略图
    const thumbnail = element.cloneNode(true);
    thumbnail.style.width = '100px';
    thumbnail.style.height = '100px';
    thumbnail.style.objectFit = 'cover';
    thumbnail.style.cursor = 'pointer';
    thumbnail.style.border = '1px solid var(--vscode-editorWidget-border)';
    thumbnail.style.borderRadius = '4px';
    
    // 添加视频标识
    if (isVideo) {
      const videoIcon = document.createElement('div');
      videoIcon.innerHTML = '▶️';
      videoIcon.style.position = 'absolute';
      videoIcon.style.top = '50%';
      videoIcon.style.left = '50%';
      videoIcon.style.transform = 'translate(-50%, -50%)';
      videoIcon.style.background = 'rgba(0,0,0,0.7)';
      videoIcon.style.color = 'white';
      videoIcon.style.borderRadius = '50%';
      videoIcon.style.padding = '5px';
      videoIcon.style.fontSize = '12px';
      
      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.style.position = 'relative';
      thumbnailContainer.style.display = 'inline-block';
      thumbnailContainer.appendChild(thumbnail);
      thumbnailContainer.appendChild(videoIcon);
      
      container.appendChild(thumbnailContainer);
    } else {
      container.appendChild(thumbnail);
    }
    
    // 创建悬停内容
    const hoverContent = document.createElement('div');
    hoverContent.className = 'media-hover-content';
    hoverContent.style.position = 'fixed';
    hoverContent.style.zIndex = '1000';
    hoverContent.style.maxWidth = '80vw';
    hoverContent.style.maxHeight = '80vh';
    hoverContent.style.background = 'var(--vscode-editor-background)';
    hoverContent.style.border = '1px solid var(--vscode-editorWidget-border)';
    hoverContent.style.borderRadius = '4px';
    hoverContent.style.padding = '10px';
    hoverContent.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    
    const fullElement = element.cloneNode(true);
    fullElement.style.maxWidth = '100%';
    fullElement.style.maxHeight = '100%';
    fullElement.style.objectFit = 'contain';
    
    hoverContent.appendChild(fullElement);
    
    // 替换原始元素
    element.parentNode.insertBefore(container, element);
    element.remove();
    
    // 添加特殊的缩略图悬停事件
    this.addThumbnailHoverEvents(container, hoverContent, fullElement, isVideo);
  }

  /**
   * 添加悬停事件
   */
  addHoverEvents(container, placeholder, hoverContent, mediaElement, isVideo) {
    let hoverTimeout;
    
    container.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      
      // 如果是视频，开始播放
      if (isVideo && mediaElement.tagName === 'VIDEO') {
        mediaElement.currentTime = 0;
        mediaElement.play().catch(() => {
          // 静默处理播放失败
        });
      }
      
      // 显示媒体内容
      hoverContent.style.opacity = '1';
      placeholder.style.opacity = '0';
    });
    
    container.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        // 如果是视频，暂停播放
        if (isVideo && mediaElement.tagName === 'VIDEO') {
          mediaElement.pause();
        }
        
        // 隐藏媒体内容
        hoverContent.style.opacity = '0';
        placeholder.style.opacity = '1';
      }, 100); // 短暂延迟，避免快速移动时闪烁
    });
  }

  /**
   * 添加缩略图悬停事件
   */
  addThumbnailHoverEvents(container, hoverContent, mediaElement, isVideo) {
    let hoverTimeout;
    
    container.addEventListener('mouseenter', (e) => {
      clearTimeout(hoverTimeout);
      
      // 计算悬停框位置
      const rect = container.getBoundingClientRect();
      const x = rect.right + 10;
      const y = rect.top;
      
      // 确保不超出视窗
      const maxX = window.innerWidth - hoverContent.offsetWidth - 20;
      const maxY = window.innerHeight - hoverContent.offsetHeight - 20;
      
      hoverContent.style.left = Math.min(x, maxX) + 'px';
      hoverContent.style.top = Math.min(y, maxY) + 'px';
      
      // 添加到body
      document.body.appendChild(hoverContent);
      
      // 如果是视频，开始播放
      if (isVideo && mediaElement.tagName === 'VIDEO') {
        mediaElement.currentTime = 0;
        mediaElement.play().catch(() => {
          // 静默处理播放失败
        });
      }
      
      // 显示
      hoverContent.style.opacity = '1';
    });
    
    container.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        // 如果是视频，暂停播放
        if (isVideo && mediaElement.tagName === 'VIDEO') {
          mediaElement.pause();
        }
        
        // 隐藏并移除
        hoverContent.style.opacity = '0';
        setTimeout(() => {
          if (hoverContent.parentNode) {
            hoverContent.parentNode.removeChild(hoverContent);
          }
        }, 300);
      }, 100);
    });
  }
  
  hideRightSidebar() {
    // 隐藏右侧栏的所有可能选择器
    const rightSidebarSelectors = [
      '[data-testid="sidebarColumn"]',
      '[data-testid="rightSidebar"]',
      'aside[aria-label*="推荐"]',
      'aside[aria-label*="搜索"]',
      'aside[aria-label*="Trending"]',
      'aside[aria-label*="Who to follow"]',
      'aside[role="complementary"]',
      'section[aria-labelledby*="accessible-list"]',
      'div[aria-label*="时间线"]:not([data-testid="primaryColumn"])',
      'nav[aria-label="页脚"]',
      '[data-testid="trend"]',
      '[data-testid="TopNavBar"] + div + div', // 可能的右侧栏
      'main[role="main"] > div > div > div:last-child:not([data-testid="primaryColumn"])'
    ];
    
    rightSidebarSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!element.closest('[data-testid="primaryColumn"]')) {
          element.style.display = 'none';
          element.setAttribute('data-vscode-hidden', 'true');
        }
      });
    });
    
    // 智能检测：隐藏主内容区域右侧的兄弟元素
    const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
    if (primaryColumn && primaryColumn.parentElement) {
      const siblings = Array.from(primaryColumn.parentElement.children);
      const primaryIndex = siblings.indexOf(primaryColumn);
      
      // 隐藏主内容区域右侧的所有元素
      for (let i = primaryIndex + 1; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (!sibling.hasAttribute('data-vscode-element')) {
          sibling.style.display = 'none';
          sibling.setAttribute('data-vscode-hidden', 'true');
        }
      }
    }
  }
  
  showRightSidebar() {
    // 恢复被隐藏的右侧栏元素
    const hiddenElements = document.querySelectorAll('[data-vscode-hidden="true"]');
    hiddenElements.forEach(element => {
      element.style.display = '';
      element.removeAttribute('data-vscode-hidden');
    });
  }
  
  adjustLayout() {
    // 调整主内容区域布局
    const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
    if (primaryColumn) {
      primaryColumn.style.maxWidth = 'none';
      primaryColumn.style.width = '100%';
      primaryColumn.style.marginLeft = '300px';
      primaryColumn.style.marginTop = '35px';
      primaryColumn.style.marginBottom = '25px';
    }
    
    // 确保主容器全宽
    const mainContainer = document.querySelector('main[role="main"]');
    if (mainContainer) {
      mainContainer.style.maxWidth = 'none';
      mainContainer.style.marginRight = '0';
    }
  }
  
  checkAndHideRightSidebarElements(node) {
    // 检查新添加的节点是否是右侧栏元素
    const rightSidebarSelectors = [
      'aside[aria-label*="推荐"]',
      'aside[aria-label*="搜索"]',
      'aside[aria-label*="Trending"]',
      'aside[aria-label*="Who to follow"]',
      'aside[role="complementary"]',
      '[data-testid="sidebarColumn"]',
      '[data-testid="trend"]'
    ];
    
    // 检查节点本身
    rightSidebarSelectors.forEach(selector => {
      if (node.matches && node.matches(selector) && !node.closest('[data-testid="primaryColumn"]')) {
        node.style.display = 'none';
        node.setAttribute('data-vscode-hidden', 'true');
      }
    });
    
    // 检查节点的子元素
    rightSidebarSelectors.forEach(selector => {
      const elements = node.querySelectorAll ? node.querySelectorAll(selector) : [];
      elements.forEach(element => {
        if (!element.closest('[data-testid="primaryColumn"]')) {
          element.style.display = 'none';
          element.setAttribute('data-vscode-hidden', 'true');
        }
      });
    });
  }
}

// 初始化插件
function initializeVSTweetTheme() {
  // 确保在Twitter页面上
  if (!window.location.hostname.includes('twitter.com') && !window.location.hostname.includes('x.com')) {
    console.log('VS Tweet Theme: 非Twitter页面，跳过初始化');
    return;
  }
  
  // 避免重复初始化
  if (window.vsTweetTheme) {
    console.log('VS Tweet Theme: 已经初始化，跳过');
    return;
  }
  
  console.log('VS Tweet Theme: 开始初始化...');
  window.vsTweetTheme = new VSTweetTheme();
}

// 多种方式确保初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVSTweetTheme);
} else {
  initializeVSTweetTheme();
}

// 如果页面是SPA，监听URL变化
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // URL变化时重新检查是否需要初始化
    setTimeout(initializeVSTweetTheme, 1000);
  }
}).observe(document, { subtree: true, childList: true });

// 添加CSS动画
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(animationStyle); 