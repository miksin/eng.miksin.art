---
path: /blog/2020-11-20-tmux-scripts
title: 用shell script啟動tmux
date: 2020-11-20
excerpt: 我們可能每次開機都想執行一些固定的幾個指令於command line。可能同時想執行測試server、log監控或ssh連上特定伺服器等。
featuredImage: 
category:
  - notes
tags:
  - shell
  - tmux
---

## 前言

我們可能每次開機都想執行一些固定的幾個指令於command line。
可能同時想執行測試server、log監控或ssh連上特定伺服器等。

這時我們可以使用tmux來管理這些分頁會很方便，但tmux在重開機之後就要把分頁開回來挺麻煩的，有沒有什麼方便點的方法呢。

## 設定shell script

### Prerequisite

當然，要先安裝tmux。mac的話可以使用homebrew：

```bash
brew install tmux
```

安裝好tmux後，設定shell script如下：

```bash
#!/bin/sh

# 自己隨便設定一個session名稱
SESSION_NAME="my_tmux_session"

# 檢查這個session本來是否存在
tmux has-session -t ${SESSION_NAME} 2>/dev/null

if [ $? != 0 ]; then
    # 先開啟新的session
    # shell 0
    tmux new-session -s ${SESSION_NAME} -n bash -d
    tmux send-keys -t ${SESSION_NAME}:0 'cd /path/to/web && npm run start' C-m

    # 已經有session了所以使用new-window
    # shell 1
    tmux new-window -n bash -t ${SESSION_NAME}
    tmux send-keys -t ${SESSION_NAME}:1 'cd /path/to/server && ./server' C-m

    # shell 2
    tmux new-window -n bash -t ${SESSION_NAME}
    tmux send-keys -t ${SESSION_NAME}:2 'htop' C-m

    # 將畫面切回一開始的window
    tmux select-window -t ${SESSION_NAME}:0
fi

tmux attach-session -t ${SESSION_NAME}
```

很簡單吧！

## References

- [Shell Script for tmux setup - dmkash](https://gist.github.com/dmkash/2355219)
- [Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com/)
