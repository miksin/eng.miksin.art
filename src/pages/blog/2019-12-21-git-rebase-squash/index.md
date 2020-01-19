---
path: /blog/2019-12-21-git-rebase-squash
title: 使用git rebase合併commit
date: 2019-12-21
excerpt: 當我們想要修改以前的commit，可以使用rebase指令來達成。這裡準備了簡單一個情境來說明
featuredImage: git-Logo.png
category:
- notes
tags:
- git
- programming
---

## 前言

當我們想要修改以前的commit，可以使用rebase指令來達成。這裡準備了簡單一個情境來說明

## 事前準備

現在資料夾中有兩個檔案，*a.txt*和*b.txt*。且我們分別在修改了這兩個檔案後都commit了一次，包含初次的commit，我們一共有三個commit。

```bash
$ git log --oneline
27db2a2 (HEAD -> master) edit b.txt
e91d1f8 edit a.txt
55703db a.txt & b.txt
```

但我們不想要這麼多個commit，想要把後面的兩次的修改改成同一次commit

## git rebase -i

這時我們可以使用`git rebase -i`這個指令來進入互動模式：

```base
$ git rebase -i HEAD~2
```

我們想要修改最後的兩個commit，所以在後面加上HEAD~2。
這時會跳出編輯器讓你編輯你想要修改的內容：

```markdown
pick e91d1f8 edit a.txt
pick 27db2a2 edit b.txt

# Rebase 55703db..27db2a2 onto 55703db (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

在編輯器的註解中，親切的附上了註解，這裡我們只想保留一個commit，並把另一個合併進去。
因此我們選擇對後面的那一個commit使用`squash`(或是簡寫成`s`)。

```markdown
pick e91d1f8 edit a.txt
squash 27db2a2 edit b.txt

# Rebase 55703db..27db2a2 onto 55703db (2 commands)
# ...
```

將`pick`改成`squash`後存檔離開，我們會發現馬上又跳出了一次編輯器：

```markdown
# This is a combination of 2 commits.
# This is the 1st commit message:

edit a.txt

# This is the commit message #2:

edit b.txt

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sat Dec 21 21:33:32 2019 +0900
#
# interactive rebase in progress; onto 55703db
# Last commands done (2 commands done):
#    pick e91d1f8 edit a.txt
#    squash 27db2a2 edit b.txt
# No commands remaining.
# You are currently rebasing branch 'master' on '55703db'.
#
# Changes to be committed:
#>--modified:   a.txt
#>--modified:   b.txt
```

這時是讓我們可以重新編輯一次commit訊息，於是我們將commit訊息修改為編輯了兩個檔案

```markdown
# This is a combination of 2 commits.
# This is the 1st commit message:

edit a.txt & b.txt

# This is the commit message #2:

# edit b.txt

# Please enter the commit message for your changes. Lines starting
# ...
```

這樣就修改完成了，我們再看看變成甚麼樣子了：

```bash
$ git log --oneline
7e00372 (HEAD -> master) edit a.txt & b.txt
55703db a.txt & b.txt
```

commit數從三個減少成兩個了！我們成功將這兩個commit合併成為了一個。
且從commit的HASH值可以看出，這是一個全新產生的commit。

## 修改遠端commit

這時候可能還有另一個問題，如果我很不幸的其實已經將原本的commit push到remote了該怎麼辦呢？
這時候別無他法，我們只能使用force push的方式來覆蓋遠端的存檔了。

```bash
$ git push origin +master
```

**但要注意！使用force push將可能影響到別人！**

## 同廠加映：git push時`+`號與`--force`的差異

可以發現我在這裡的示範中使用了`+master`的方式，如果只有push這一條branch時，與下面這樣是完全一樣的：

```bash
$ git push --force origin master
```

但當你不只push一條branch時，使用`+`號讓你可以指定需要force的項目，例如：

```bash
$ git push origin master +develop
```

這個指令讓我們可以只針對develop使用force push，而使用`--force`將會使全部push的branch都使用force push。

## References

- [How to squash commits](https://github.com/wprig/wprig/wiki/How-to-squash-commits)
- [把多個 Commit 合併成一個 Commit](https://gitbook.tw/chapters/rewrite-history/merge-multiple-commits-to-one-commit.html)
- [使用 rebase -i 合併提交](https://backlog.com/git-tutorial/tw/stepup/stepup7_5.html)
- [Git Force push syntax, “-f” versus “+branch”
](https://stackoverflow.com/questions/25937730/git-force-push-syntax-f-versus-branch)
