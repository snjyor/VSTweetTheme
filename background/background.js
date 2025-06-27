/**
 * VS Tweet Theme - 后台服务脚本
 * 处理快捷键、扩展通信和全局功能
 */

// 扩展安装时的初始化
chrome.runtime.onInstalled.addListener((details) => {
  console.log('🎨 VS Tweet Theme 已安装');
  
  if (details.reason === 'install') {
    // 首次安装时设置默认配置
    const defaultSettings = {
      theme: 'dark-plus',
      language: 'javascript',
      hideMedia: true,
      showLineNumbers: true,
      projectName: 'twitter-feed',
      emergencyUrls: [
        'https://github.com',
        'https://stackoverflow.com',
        'https://developer.mozilla.org',
        'https://code.visualstudio.com'
      ]
    };
    
    chrome.storage.sync.set(defaultSettings);
    
    console.log('🎉 VS Tweet Theme 首次安装完成，默认设置已配置');
  }
});

// 处理快捷键命令
chrome.commands.onCommand.addListener(async (command) => {
  console.log('快捷键触发:', command);
  
  try {
    // 获取当前活动标签页
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || (!tab.url.includes('twitter.com') && !tab.url.includes('x.com'))) {
      console.log('当前页面不是Twitter，忽略快捷键');
      return;
    }
    
    switch (command) {
      case 'toggle-theme':
        // 切换主题
        await chrome.tabs.sendMessage(tab.id, { action: 'toggle-theme' });
        break;
        
      case 'emergency-switch':
        // 紧急切换
        await handleEmergencySwitch(tab);
        break;
    }
  } catch (error) {
    console.error('处理快捷键失败:', error);
  }
});

// 处理紧急切换
async function handleEmergencySwitch(tab) {
  try {
    const { emergencyUrls } = await chrome.storage.sync.get({ 
      emergencyUrls: [
        'https://github.com',
        'https://stackoverflow.com',
        'https://developer.mozilla.org',
        'https://code.visualstudio.com'
      ]
    });
    
    const randomUrl = emergencyUrls[Math.floor(Math.random() * emergencyUrls.length)];
    await chrome.tabs.update(tab.id, { url: randomUrl });
    
    console.log('紧急切换到:', randomUrl);
  } catch (error) {
    console.error('紧急切换失败:', error);
  }
}

// 处理来自popup或content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息:', request);
  
  switch (request.action) {
    case 'get-settings':
      handleGetSettings(sendResponse);
      return true; // 异步响应
      
    case 'save-settings':
      handleSaveSettings(request.settings, sendResponse);
      return true;
      
    case 'toggle-theme':
      handleToggleTheme(sender.tab, sendResponse);
      return true;
      
    case 'emergency-switch':
      if (sender.tab) {
        handleEmergencySwitch(sender.tab);
      }
      sendResponse({ success: true });
      break;
      
    case 'get-tab-info':
      handleGetTabInfo(sendResponse);
      return true;
  }
  
  // 确保异步消息有返回值
  return true;
});

// 获取设置
async function handleGetSettings(sendResponse) {
  try {
    const settings = await chrome.storage.sync.get({
      theme: 'dark-plus',
      language: 'javascript',
      hideMedia: true,
      showLineNumbers: true,
      projectName: 'twitter-feed',
      emergencyUrls: [
        'https://github.com',
        'https://stackoverflow.com',
        'https://developer.mozilla.org',
        'https://code.visualstudio.com'
      ]
    });
    
    sendResponse({ success: true, settings });
  } catch (error) {
    console.error('获取设置失败:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// 保存设置
async function handleSaveSettings(newSettings, sendResponse) {
  try {
    await chrome.storage.sync.set(newSettings);
    
    // 通知所有Twitter标签页更新设置
    const tabs = await chrome.tabs.query({ 
      url: ['*://twitter.com/*', '*://x.com/*'] 
    });
    
    for (const tab of tabs) {
      try {
        await chrome.tabs.sendMessage(tab.id, { 
          action: 'update-settings', 
          settings: newSettings 
        });
      } catch (error) {
        // 某些标签页可能没有加载content script，忽略错误
        console.log('无法向标签页发送消息:', tab.id);
      }
    }
    
    sendResponse({ success: true });
  } catch (error) {
    console.error('保存设置失败:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// 切换主题
async function handleToggleTheme(tab, sendResponse) {
  try {
    if (!tab || (!tab.url.includes('twitter.com') && !tab.url.includes('x.com'))) {
      sendResponse({ success: false, error: '当前页面不是Twitter' });
      return;
    }
    
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'toggle-theme' });
    sendResponse(response);
  } catch (error) {
    console.error('切换主题失败:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// 获取标签页信息
async function handleGetTabInfo(sendResponse) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const isTwitter = tab && (tab.url.includes('twitter.com') || tab.url.includes('x.com'));
    
    sendResponse({ 
      success: true, 
      tab: {
        id: tab?.id,
        url: tab?.url,
        title: tab?.title,
        isTwitter
      }
    });
  } catch (error) {
    console.error('获取标签页信息失败:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 当标签页加载完成且是Twitter页面时，注入必要的脚本
  if (changeInfo.status === 'complete' && 
      tab.url && 
      (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
    
    console.log('Twitter页面加载完成:', tab.url);
    
    // 可以在这里执行一些初始化操作
    // 例如检查是否需要自动启用主题等
  }
});

// 监听存储变化
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('存储变化:', changes);
  
  // 可以在这里处理设置变化的逻辑
  // 例如通知所有相关标签页更新配置
});

// 处理扩展图标点击
chrome.action.onClicked.addListener(async (tab) => {
  // 如果没有设置popup，可以在这里处理点击事件
  console.log('扩展图标被点击');
});

// 监听浏览器启动
chrome.runtime.onStartup.addListener(() => {
  console.log('浏览器启动，VS Tweet Theme 准备就绪');
});

// 错误处理
chrome.runtime.onSuspend.addListener(() => {
  console.log('VS Tweet Theme 后台脚本挂起');
});

// 导出一些实用函数供其他模块使用
const VSThemeUtils = {
  // 检查是否为Twitter页面
  isTwitterPage: (url) => {
    return url && (url.includes('twitter.com') || url.includes('x.com'));
  },
  
  // 获取随机紧急URL
  getRandomEmergencyUrl: async () => {
    const { emergencyUrls } = await chrome.storage.sync.get({ 
      emergencyUrls: [
        'https://github.com',
        'https://stackoverflow.com',
        'https://developer.mozilla.org',
        'https://code.visualstudio.com'
      ]
    });
    
    return emergencyUrls[Math.floor(Math.random() * emergencyUrls.length)];
  },
  
  // 发送通知
  showNotification: (title, message, type = 'basic') => {
    chrome.notifications.create({
      type,
      iconUrl: 'assets/icons/icon48.png',
      title,
      message
    });
  }
};

// 将工具函数暴露给全局作用域
globalThis.VSThemeUtils = VSThemeUtils; 