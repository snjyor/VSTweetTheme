/**
 * VS Tweet Theme - 调试脚本
 * 在浏览器控制台运行此脚本来诊断问题
 */

console.log('🔍 VS Tweet Theme 调试工具');

// 检查扩展是否加载
function checkExtensionLoaded() {
  console.log('\n=== 检查扩展加载状态 ===');
  
  // 检查content script
  if (window.vsTweetTheme) {
    console.log('✅ Content script已加载');
    console.log('主题状态:', window.vsTweetTheme.isActive ? '已启用' : '已禁用');
    console.log('设置:', window.vsTweetTheme.settings);
  } else {
    console.log('❌ Content script未加载');
  }
  
  // 检查CSS
  const themeClass = document.documentElement.classList.contains('vs-tweet-theme-active');
  console.log('主题CSS类:', themeClass ? '已应用' : '未应用');
  
  // 检查切换按钮
  const toggleBtn = document.querySelector('.vs-tweet-toggle-btn');
  console.log('切换按钮:', toggleBtn ? '存在' : '不存在');
}

// 检查页面环境
function checkPageEnvironment() {
  console.log('\n=== 检查页面环境 ===');
  console.log('当前URL:', window.location.href);
  console.log('域名:', window.location.hostname);
  console.log('是否Twitter页面:', window.location.hostname.includes('twitter.com') || window.location.hostname.includes('x.com'));
  console.log('页面加载状态:', document.readyState);
}

// 检查Chrome扩展API
function checkChromeAPIs() {
  console.log('\n=== 检查Chrome扩展API ===');
  console.log('chrome对象:', typeof chrome !== 'undefined' ? '可用' : '不可用');
  
  if (typeof chrome !== 'undefined') {
    console.log('chrome.runtime:', typeof chrome.runtime !== 'undefined' ? '可用' : '不可用');
    console.log('chrome.storage:', typeof chrome.storage !== 'undefined' ? '可用' : '不可用');
    console.log('chrome.tabs:', typeof chrome.tabs !== 'undefined' ? '可用' : '不可用');
  }
}

// 手动初始化扩展
function manualInit() {
  console.log('\n=== 手动初始化扩展 ===');
  
  if (window.vsTweetTheme) {
    console.log('扩展已存在，跳过初始化');
    return;
  }
  
  try {
    // 检查是否有VSTweetTheme类
    if (typeof VSTweetTheme !== 'undefined') {
      window.vsTweetTheme = new VSTweetTheme();
      console.log('✅ 手动初始化成功');
    } else {
      console.log('❌ VSTweetTheme类不存在');
    }
  } catch (error) {
    console.error('❌ 手动初始化失败:', error);
  }
}

// 测试基本功能
function testBasicFunctions() {
  console.log('\n=== 测试基本功能 ===');
  
  if (!window.vsTweetTheme) {
    console.log('❌ 扩展未初始化，无法测试');
    return;
  }
  
  try {
    // 测试切换功能
    const initialState = window.vsTweetTheme.isActive;
    console.log('初始状态:', initialState);
    
    window.vsTweetTheme.toggleTheme();
    console.log('切换后状态:', window.vsTweetTheme.isActive);
    
    // 恢复原状态
    if (initialState !== window.vsTweetTheme.isActive) {
      window.vsTweetTheme.toggleTheme();
    }
    
    console.log('✅ 基本功能测试完成');
  } catch (error) {
    console.error('❌ 功能测试失败:', error);
  }
}

// 检查Twitter页面元素
function checkTwitterElements() {
  console.log('\n=== 检查Twitter页面元素 ===');
  
  const elements = [
    '[data-testid="primaryColumn"]',
    '[data-testid="sidebarColumn"]',
    '[data-testid="tweet"]',
    'article[data-testid="tweet"]',
    '[data-testid="tweetText"]',
    'main[role="main"]'
  ];
  
  elements.forEach(selector => {
    const found = document.querySelectorAll(selector).length;
    console.log(`${selector}: ${found}个元素`);
  });
}

// 运行所有检查
function runAllChecks() {
  console.log('🚀 开始全面诊断...');
  checkPageEnvironment();
  checkChromeAPIs();
  checkExtensionLoaded();
  checkTwitterElements();
  
  if (!window.vsTweetTheme) {
    console.log('\n🔧 尝试手动初始化...');
    manualInit();
  }
  
  testBasicFunctions();
  
  console.log('\n📋 诊断完成！');
  console.log('如果发现问题，请将上述信息报告给开发者。');
}

// 自动运行检查
runAllChecks();

// 导出函数供手动调用
window.vsTweetDebug = {
  checkExtensionLoaded,
  checkPageEnvironment,
  checkChromeAPIs,
  manualInit,
  testBasicFunctions,
  checkTwitterElements,
  runAllChecks
}; 