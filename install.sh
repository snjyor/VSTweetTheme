#!/bin/bash

# VS Tweet Theme - 快速安装脚本
# 适用于 Linux 和 macOS

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 清屏
clear

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🎨 VS Tweet Theme - 快速安装向导${NC}"
echo -e "${BLUE}========================================${NC}"
echo

# 检测操作系统
OS=""
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
else
    OS="Unknown"
fi

echo -e "${GREEN}检测到操作系统: $OS${NC}"
echo

# 显示安装步骤
echo -e "${YELLOW}📋 安装步骤:${NC}"
echo
echo "1. 打开Chrome浏览器"
echo "2. 访问 chrome://extensions/"
echo "3. 开启\"开发者模式\"（右上角开关）"
echo "4. 点击\"加载已解压的扩展程序\""
echo "5. 选择当前文件夹: $(pwd)"
echo

# 主菜单
show_menu() {
    echo -e "${YELLOW}🔧 快捷操作:${NC}"
    echo "[1] 打开Chrome扩展页面"
    echo "[2] 打开测试页面"
    echo "[3] 查看安装说明"
    echo "[4] 检查项目文件"
    echo "[5] 退出"
    echo
}

# 打开Chrome扩展页面
open_extensions() {
    echo -e "${GREEN}正在打开Chrome扩展页面...${NC}"
    
    if [[ "$OS" == "macOS" ]]; then
        open -a "Google Chrome" "chrome://extensions/"
    elif [[ "$OS" == "Linux" ]]; then
        if command -v google-chrome &> /dev/null; then
            google-chrome "chrome://extensions/" &
        elif command -v chromium-browser &> /dev/null; then
            chromium-browser "chrome://extensions/" &
        else
            echo -e "${RED}未找到Chrome浏览器，请手动打开 chrome://extensions/${NC}"
        fi
    fi
}

# 打开测试页面
open_test() {
    echo -e "${GREEN}正在打开测试页面...${NC}"
    
    if [[ "$OS" == "macOS" ]]; then
        open "test/test-extension.html"
    elif [[ "$OS" == "Linux" ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "test/test-extension.html"
        else
            echo -e "${RED}请手动打开: test/test-extension.html${NC}"
        fi
    fi
}

# 查看安装说明
show_install_guide() {
    echo -e "${GREEN}正在打开安装说明...${NC}"
    
    if [[ "$OS" == "macOS" ]]; then
        open "INSTALL.md"
    elif [[ "$OS" == "Linux" ]]; then
        if command -v xdg-open &> /dev/null; then
            xdg-open "INSTALL.md"
        else
            echo -e "${YELLOW}请查看 INSTALL.md 文件${NC}"
        fi
    fi
}

# 检查项目文件
check_files() {
    echo -e "${GREEN}📁 检查项目文件完整性...${NC}"
    echo
    
    files=(
        "manifest.json"
        "content/content.js"
        "content/vscode-theme.css"
        "popup/popup.html"
        "popup/popup.css"
        "popup/popup.js"
        "background/background.js"
        "README.md"
        "INSTALL.md"
    )
    
    missing_files=()
    
    for file in "${files[@]}"; do
        if [[ -f "$file" ]]; then
            echo -e "✅ $file"
        else
            echo -e "❌ $file ${RED}(缺失)${NC}"
            missing_files+=("$file")
        fi
    done
    
    echo
    if [[ ${#missing_files[@]} -eq 0 ]]; then
        echo -e "${GREEN}🎉 所有核心文件都存在！${NC}"
    else
        echo -e "${RED}⚠️  发现 ${#missing_files[@]} 个缺失文件${NC}"
    fi
    
    echo
    echo -e "${YELLOW}📊 项目统计:${NC}"
    echo "总文件数: $(find . -type f | wc -l)"
    echo "代码文件: $(find . -name "*.js" -o -name "*.css" -o -name "*.html" | wc -l)"
    echo "文档文件: $(find . -name "*.md" | wc -l)"
}

# 主循环
while true; do
    show_menu
    read -p "请选择操作 (1-5): " choice
    
    case $choice in
        1)
            open_extensions
            ;;
        2)
            open_test
            ;;
        3)
            show_install_guide
            ;;
        4)
            check_files
            ;;
        5)
            echo -e "${GREEN}再见！享受你的摸鱼时光 😎${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}无效选择，请重试...${NC}"
            ;;
    esac
    
    echo
    read -p "按回车键继续..." -r
    clear
done 