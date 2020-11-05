---
path: /blog/2020-11-05-brew-install-specific-version
title: Homebrew安裝指定版本的套件
date: 2020-11-05
excerpt: 用mac進行開發時，homebrew已經成為許多人的標準配備。但其預設總是安裝該套件的最新版本，有時候就是會有需要是需要安裝過往的某個特定版本，這時候該如何是好呢？
featuredImage: 
category:
  - notes
tags:
  - mac
  - homebrew
---

## 前言

用mac進行開發時，homebrew已經成為許多人的標準配備。
但其預設總是安裝該套件的最新版本，有時候就是會有需要是需要安裝過往的某個特定版本，這時候該如何是好呢？

## 加上版本號

某些套件本身就有提供特定的版本可以安裝，這時只要普通的在後面加上版本號即可。

```bash
brew install mysql@5.7
mysql --version
```

## 從過去的commit中安裝

有些套件已經版本更新或是根本已經被刪除，但我們還是可以從過去commit的原始碼中拿到安裝script。
例如`mysql-connector-c++`這個套件在2020/10/27已被刪除。而他曾經存在於`homebrew-core`這個repository中。

```bash
git clone git@github.com:Homebrew/homebrew-core.git
cd homebrew-core

# checkout到套件還存在的commit
git checkout 55681acd93

# 直接使用當時的安裝script進行安裝
brew install ./Formula/mysql-connector-c++.rb
```

## References

- [Install Thrift 0.9.3 with brew on macOS](https://gist.github.com/timvlaer/721ba30f8fc6a7aac1b0190e132a4261)
