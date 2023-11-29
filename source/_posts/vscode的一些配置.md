---
title: vscode的一些配置
date: 2022-11-18 10:21:14
tags: 教程
categories: 教程
---



记录一下自己的配置文件

<!--more-->

```json
// setting.json
{
    "files.defaultLanguage": "cpp", // ctrl+N新建文件后默认的语言
    "editor.formatOnType": false, // 输入分号(C/C++的语句结束标识)后自动格式化当前这一行的代码
    "editor.suggest.snippetsPreventQuickSuggestions": false, // clangd的snippets有很多的跳转点，不用这个就必须手动触发Intellisense了
    "editor.acceptSuggestionOnEnter": "off", // 我个人的习惯，按回车时一定是真正的换行，只有tab才会接受Intellisense
    // "editor.snippetSuggestions": "maxx", // （可选）snippets显示在补全列表顶端，默认是inline
    "code-runner.runInTerminal": true, // 设置成false会在“输出”中输出，无法输入
    "code-runner.executorMap": {
        "c": "cd $dir && gcc '$fileName' -o '$fileNameWithoutExt.exe' -Wall -g -O2 -static-libgcc -std=c11 -fexec-charset=GBK && &'$dir$fileNameWithoutExt'",
        "cpp": "cd $dir && g++ '$fileName' -o '$fileNameWithoutExt.exe' -Wall -g -O2 -static-libgcc -std=c++17 -fexec-charset=GBK && &'$dir$fileNameWithoutExt'"
        // "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt.exe -Wall -g -O2 -static-libgcc -std=c11 -fexec-charset=GBK && $dir$fileNameWithoutExt",
        // "cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt.exe -Wall -g -O2 -static-libgcc -std=c++17 -fexec-charset=GBK && $dir$fileNameWithoutExt"
    }, // 右键run code时运行的命令；未注释的仅适用于PowerShell（Win10默认），文件名中有空格也可以编译运行；注释掉的适用于cmd（win7默认），PS和bash也能用，但文件名中有空格时无法运行
    "code-runner.saveFileBeforeRun": true, // run code前保存
    "code-runner.preserveFocus": false, // 若为false，run code后光标会聚焦到终端上。如果需要频繁输入数据可设为false
    "code-runner.clearPreviousOutput": false, // 每次run code前清空属于code runner的终端消息，默认false
    "code-runner.ignoreSelection": true, // 默认为false，效果是鼠标选中一块代码后可以单独执行，但C是编译型语言，不适合这样用
    //屏蔽一些文件试目录更加简洁
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        // "**/.vscode": true,
        "**/*.exe": true,
    },
    "python.analysis.extraPaths": [
        "D:\\Program\\anaconda\\pkgs\\requests-2.27.1-pyhd3eb1b0_0",
        "C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python310\\Lib\\site-packages",
        "D:\\Program\\anaconda\\Lib\\site-packages"
    ],
    "C_Cpp.clang_format_sortIncludes": true,
    "files.associations": {
        "array": "cpp",
        "atomic": "cpp",
        "*.tcc": "cpp",
        "cctype": "cpp",
        "clocale": "cpp",
        "cmath": "cpp",
        "cstdarg": "cpp",
        "cstddef": "cpp",
        "cstdint": "cpp",
        "cstdio": "cpp",
        "cstdlib": "cpp",
        "cwchar": "cpp",
        "cwctype": "cpp",
        "deque": "cpp",
        "unordered_map": "cpp",
        "vector": "cpp",
        "exception": "cpp",
        "algorithm": "cpp",
        "memory": "cpp",
        "memory_resource": "cpp",
        "optional": "cpp",
        "string": "cpp",
        "string_view": "cpp",
        "system_error": "cpp",
        "tuple": "cpp",
        "type_traits": "cpp",
        "utility": "cpp",
        "fstream": "cpp",
        "initializer_list": "cpp",
        "iosfwd": "cpp",
        "iostream": "cpp",
        "istream": "cpp",
        "limits": "cpp",
        "new": "cpp",
        "ostream": "cpp",
        "sstream": "cpp",
        "stdexcept": "cpp",
        "streambuf": "cpp",
        "typeinfo": "cpp",
        "forward_list": "cpp",
        "list": "cpp",
        "unordered_set": "cpp",
        "functional": "cpp",
        "future": "cpp",
        "mutex": "cpp",
        "thread": "cpp",
        "regex": "cpp",
        "valarray": "cpp",
        "cstring": "cpp",
        "bitset": "cpp",
        "cfenv": "cpp",
        "chrono": "cpp",
        "cinttypes": "cpp",
        "complex": "cpp",
        "condition_variable": "cpp",
        "csetjmp": "cpp",
        "csignal": "cpp",
        "ctime": "cpp",
        "ratio": "cpp",
        "iomanip": "cpp",
        "numeric": "cpp",
        "scoped_allocator": "cpp",
        "typeindex": "cpp",
        "random": "cpp",
        "stdio.h": "c",
        "process.h": "c",
        "stdlib.h": "c",
        "string.h": "c",
        "map": "cpp",
        "charconv": "cpp",
        "codecvt": "cpp",
        "cuchar": "cpp",
        "iterator": "cpp",
        "set": "cpp",
        "shared_mutex": "cpp",
        "queue": "cpp",
        "linklist.c": "cpp",
        "linkstack.c": "cpp",
        "stack": "cpp"
    },
    "C_Cpp.errorSquiggles": "Enabled",
    "python.testing.pytestArgs": [
        "."
    ],
    "python.testing.unittestEnabled": false,
    "python.testing.pytestEnabled": true, // 格式化时调整include的顺序（按字母排序）
}
```

