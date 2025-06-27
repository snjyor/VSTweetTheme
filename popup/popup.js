/**
 * VS Tweet Theme - Popup脚本
 * 处理弹出窗口的用户交互和设置管理
 */

class PopupManager {
  constructor() {
    this.currentTab = null;
    this.settings = {};
    this.isTwitterPage = false;
    this.themeActive = false;
    
    this.init();
  }

  async init() {
    try {
      // 显示加载状态
      this.showLoading(true);
      
      // 获取当前标签页信息
      await this.getCurrentTab();
      
      // 加载设置
      await this.loadSettings();
      
      // 检查主题状态
      await this.checkThemeStatus();
      
      // 初始化UI
      this.initializeUI();
      
      // 绑定事件
      this.bindEvents();
      
      // 更新状态显示
      this.updateStatus();
      
    } catch (error) {
      console.error('初始化失败:', error);
      this.showNotification('初始化失败', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  async getCurrentTab() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'get-tab-info' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('获取标签页信息失败:', chrome.runtime.lastError);
          resolve();
          return;
        }
        
        if (response && response.success) {
          this.currentTab = response.tab;
          this.isTwitterPage = response.tab.isTwitter;
        }
        resolve();
      });
    });
  }

  async loadSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'get-settings' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('加载设置失败:', chrome.runtime.lastError);
          resolve();
          return;
        }
        
        if (response && response.success) {
          this.settings = response.settings;
        }
        resolve();
      });
    });
  }

  async checkThemeStatus() {
    if (!this.isTwitterPage || !this.currentTab) return;
    
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(this.currentTab.id, { action: 'get-status' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('无法连接到content script:', chrome.runtime.lastError.message);
          resolve();
          return;
        }
        
        if (response) {
          this.themeActive = response.isActive;
        }
        resolve();
      });
    });
  }

  initializeUI() {
    // 设置表单值
    this.populateForm();
    
    // 设置折叠状态
    this.initializeCollapsibleSections();
    
    // 更新按钮状态
    this.updateButtons();
  }

  populateForm() {
    // 主题选择
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.value = this.settings.theme || 'dark-plus';
    }

    // 编程语言
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.settings.language || 'javascript';
    }

    // 项目名称
    const projectNameInput = document.getElementById('projectNameInput');
    if (projectNameInput) {
      projectNameInput.value = this.settings.projectName || 'twitter-feed';
    }

    // 媒体处理
    const mediaHandling = this.settings.mediaHandling || 'placeholder';
    const mediaRadio = document.querySelector(`input[name="mediaHandling"][value="${mediaHandling}"]`);
    if (mediaRadio) {
      mediaRadio.checked = true;
    }

    // 功能开关
    document.getElementById('lineNumbersSwitch').checked = this.settings.showLineNumbers !== false;
    document.getElementById('hoverPreviewSwitch').checked = this.settings.hoverPreview !== false;
    document.getElementById('syntaxHighlightSwitch').checked = this.settings.syntaxHighlight !== false;
  }

  initializeCollapsibleSections() {
    // 默认展开设置区域，折叠快捷键区域
    const settingsContent = document.getElementById('settingsContent');
    const shortcutsContent = document.getElementById('shortcutsContent');
    const shortcutsToggle = document.getElementById('shortcutsToggle');

    if (shortcutsContent && shortcutsToggle) {
      shortcutsContent.classList.add('collapsed');
      shortcutsToggle.classList.add('collapsed');
    }
  }

  updateButtons() {
    const toggleBtn = document.getElementById('toggleBtn');
    const emergencyBtn = document.getElementById('emergencyBtn');
    
    if (!this.isTwitterPage) {
      // 不是Twitter页面
      toggleBtn.disabled = true;
      toggleBtn.querySelector('.btn-text').textContent = '仅在Twitter可用';
      emergencyBtn.disabled = true;
    } else {
      // Twitter页面
      toggleBtn.disabled = false;
      emergencyBtn.disabled = false;
      
      if (this.themeActive) {
        toggleBtn.classList.add('active');
        toggleBtn.querySelector('.btn-text').textContent = '关闭VSCode模式';
        toggleBtn.querySelector('.btn-icon').textContent = '🔄';
      } else {
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('.btn-text').textContent = '启用VSCode模式';
        toggleBtn.querySelector('.btn-icon').textContent = '🎨';
      }
    }
  }

  updateStatus() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    if (!this.isTwitterPage) {
      statusDot.className = 'status-dot inactive';
      statusText.textContent = '当前页面不是Twitter';
    } else if (this.themeActive) {
      statusDot.className = 'status-dot active';
      statusText.textContent = 'VSCode模式已启用';
    } else {
      statusDot.className = 'status-dot inactive';
      statusText.textContent = 'VSCode模式已关闭';
    }
  }

  bindEvents() {
    // 切换按钮
    document.getElementById('toggleBtn').addEventListener('click', () => {
      this.toggleTheme();
    });

    // 紧急切换按钮
    document.getElementById('emergencyBtn').addEventListener('click', () => {
      this.emergencySwitch();
    });

    // 预览按钮
    document.getElementById('previewBtn').addEventListener('click', () => {
      this.togglePreview();
    });

    // 设置变更监听
    this.bindSettingsEvents();

    // 折叠区域
    this.bindCollapsibleEvents();

    // 底部链接
    this.bindFooterEvents();
  }

  bindSettingsEvents() {
    // 主题选择
    document.getElementById('themeSelect').addEventListener('change', (e) => {
      this.updateSetting('theme', e.target.value);
    });

    // 编程语言
    document.getElementById('languageSelect').addEventListener('change', (e) => {
      this.updateSetting('language', e.target.value);
    });

    // 项目名称
    document.getElementById('projectNameInput').addEventListener('input', (e) => {
      this.updateSetting('projectName', e.target.value);
    });

    // 媒体处理
    document.querySelectorAll('input[name="mediaHandling"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.updateSetting('mediaHandling', e.target.value);
        }
      });
    });

    // 功能开关
    document.getElementById('lineNumbersSwitch').addEventListener('change', (e) => {
      this.updateSetting('showLineNumbers', e.target.checked);
    });

    document.getElementById('hoverPreviewSwitch').addEventListener('change', (e) => {
      this.updateSetting('hoverPreview', e.target.checked);
    });

    document.getElementById('syntaxHighlightSwitch').addEventListener('change', (e) => {
      this.updateSetting('syntaxHighlight', e.target.checked);
    });
  }

  bindCollapsibleEvents() {
    // 设置区域折叠
    document.getElementById('settingsToggle').addEventListener('click', () => {
      this.toggleCollapsible('settings');
    });

    // 快捷键区域折叠
    document.getElementById('shortcutsToggle').addEventListener('click', () => {
      this.toggleCollapsible('shortcuts');
    });

    // 点击标题也可以折叠
    document.querySelector('.settings-section .section-header').addEventListener('click', () => {
      this.toggleCollapsible('settings');
    });

    document.querySelector('.shortcuts-section .section-header').addEventListener('click', () => {
      this.toggleCollapsible('shortcuts');
    });
  }

  bindFooterEvents() {
    document.getElementById('helpLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.openHelp();
    });

    document.getElementById('feedbackLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.openFeedback();
    });

    document.getElementById('githubLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.openGitHub();
    });
  }

  async toggleTheme() {
    if (!this.isTwitterPage) {
      this.showNotification('请在Twitter页面使用此功能', 'warning');
      return;
    }

    try {
      this.showLoading(true);
      
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'toggle-theme' }, resolve);
      });

      if (response && response.success) {
        this.themeActive = !this.themeActive;
        this.updateButtons();
        this.updateStatus();
        
        const message = this.themeActive ? 'VSCode模式已启用' : 'VSCode模式已关闭';
        this.showNotification(message, 'success');
      } else {
        throw new Error(response?.error || '切换失败');
      }
    } catch (error) {
      console.error('切换主题失败:', error);
      this.showNotification('切换失败: ' + error.message, 'error');
    } finally {
      this.showLoading(false);
    }
  }

  async emergencySwitch() {
    try {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'emergency-switch' }, resolve);
      });

      if (response && response.success) {
        this.showNotification('已切换到安全页面', 'success');
        // 关闭弹窗
        setTimeout(() => window.close(), 1000);
      }
    } catch (error) {
      console.error('紧急切换失败:', error);
      this.showNotification('紧急切换失败', 'error');
    }
  }

  togglePreview() {
    if (!this.isTwitterPage) {
      this.showNotification('请在Twitter页面使用此功能', 'warning');
      return;
    }

    // 发送消息到content script
    chrome.tabs.sendMessage(this.currentTab.id, { action: 'toggle-hover-preview' }, (response) => {
      if (response && response.success) {
        const enabled = response.enabled;
        this.showNotification(`悬停预览${enabled ? '已启用' : '已禁用'}`, 'success');
      }
    });
  }

  async updateSetting(key, value) {
    this.settings[key] = value;
    
    try {
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ 
          action: 'save-settings', 
          settings: this.settings 
        }, resolve);
      });

      if (response && response.success) {
        // 设置保存成功，可以显示一个轻微的反馈
        this.showQuickFeedback();
      }
    } catch (error) {
      console.error('保存设置失败:', error);
      this.showNotification('保存设置失败', 'error');
    }
  }

  toggleCollapsible(section) {
    const content = document.getElementById(`${section}Content`);
    const toggle = document.getElementById(`${section}Toggle`);

    if (content && toggle) {
      const isCollapsed = content.classList.contains('collapsed');
      
      if (isCollapsed) {
        content.classList.remove('collapsed');
        toggle.classList.remove('collapsed');
        toggle.textContent = '▼';
      } else {
        content.classList.add('collapsed');
        toggle.classList.add('collapsed');
        toggle.textContent = '▶';
      }
    }
  }

  openHelp() {
    chrome.tabs.create({ 
      url: 'https://github.com/your-username/vs-tweet-theme/wiki' 
    });
  }

  openFeedback() {
    chrome.tabs.create({ 
      url: 'https://github.com/your-username/vs-tweet-theme/issues' 
    });
  }

  openGitHub() {
    chrome.tabs.create({ 
      url: 'https://github.com/your-username/vs-tweet-theme' 
    });
  }

  showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      if (show) {
        overlay.classList.add('show');
      } else {
        overlay.classList.remove('show');
      }
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const icon = notification.querySelector('.notification-icon');
    const messageEl = notification.querySelector('.notification-message');

    // 设置图标
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    icon.textContent = icons[type] || icons.info;
    messageEl.textContent = message;

    // 设置样式
    notification.className = `notification ${type}`;
    
    // 显示通知
    notification.classList.add('show');

    // 自动隐藏
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  showQuickFeedback() {
    // 显示一个快速的视觉反馈，表示设置已保存
    const feedback = document.createElement('div');
    feedback.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: var(--popup-success);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      z-index: 10001;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    feedback.textContent = '已保存';
    
    document.body.appendChild(feedback);
    
    // 淡入
    setTimeout(() => {
      feedback.style.opacity = '1';
    }, 10);
    
    // 淡出并移除
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        feedback.remove();
      }, 200);
    }, 1000);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});

// 处理键盘快捷键
document.addEventListener('keydown', (event) => {
  // ESC 关闭弹窗
  if (event.key === 'Escape') {
    window.close();
  }
  
  // Ctrl+Enter 快速切换主题
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('toggleBtn').click();
  }
});

// 添加一些实用的工具函数
const PopupUtils = {
  // 复制文本到剪贴板
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('复制失败:', error);
      return false;
    }
  },

  // 格式化时间
  formatTime: (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  // 防抖函数
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // 节流函数
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// 暴露工具函数到全局
window.PopupUtils = PopupUtils; 