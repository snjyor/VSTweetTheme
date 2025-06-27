@echo off
chcp 65001 >nul
echo ==========================================
echo    VS Tweet Theme - Twitter伪装VSCode
echo    版本: v1.0.2 (最新优化版)
echo ==========================================
echo.

echo 🎯 v1.0.2 新功能:
echo   ✅ 左侧导航改为VSCode文件样式
echo   ✅ 右侧内容完全隐藏
echo   ✅ 媒体悬停显示功能
echo   ✅ 更专业的界面伪装效果
echo.

echo 📋 安装步骤:
echo 1. 打开Chrome浏览器
echo 2. 访问: chrome://extensions/
echo 3. 开启右上角的"开发者模式"
echo 4. 点击"加载已解压的扩展程序"
echo 5. 选择当前文件夹: %CD%
echo.

echo 🔄 如果已安装旧版本:
echo 1. 在扩展管理页面找到"VS Tweet Theme"
echo 2. 点击"重新加载"按钮 🔄
echo 3. 或者先删除旧版本，再重新安装
echo.

echo 🎮 使用方法:
echo 1. 访问 https://twitter.com 或 https://x.com
echo 2. 按 Ctrl+Shift+V 激活VSCode主题
echo 3. 悬停在图片/视频上查看内容
echo 4. 按 Ctrl+Shift+E 紧急切换回正常模式
echo 5. 点击扩展图标调整设置
echo.

echo 💡 新功能体验:
echo   🏠 左侧导航: 主页、探索、私信等变为文件样式
echo   👁️ 媒体悬停: 鼠标悬停查看图片/视频
echo   🚫 右侧隐藏: 搜索框、趋势、推荐全部隐藏
echo   🎨 专业外观: 完全模拟VSCode界面
echo.

echo ⚠️ 注意事项:
echo - 确保Chrome版本 88+ 以支持Manifest V3
echo - 首次使用建议先在测试页面体验功能
echo - 遇到问题可查看 test/debug.js 进行诊断
echo.

echo 🔧 测试功能:
echo - 打开 test/test-extension.html 进行功能测试
echo - 检查所有功能是否正常工作
echo.

echo 安装完成后，请访问Twitter开始体验！
echo.
pause

:menu
echo.
echo 按任意键返回主菜单...
pause >nul
cls
goto start

:start
goto :eof 