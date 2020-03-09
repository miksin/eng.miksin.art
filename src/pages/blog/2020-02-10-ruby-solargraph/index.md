---
path: /blog/2020-02-10-ruby-solargraph
title: 在VSCode安裝Ruby Solargraph開發Rails專案
date: 2020-02-10
excerpt: 對於一個語言或框架的初學者來說，有一個強大的編輯器會要效率很多。這裏推薦給像我一樣開發 Rails 專案的新手們一個 VSCode 的 extension Ruby Solargraph
featuredImage: ../images/rails.png
category:
  - notes
tags:
  - ruby
  - rails
  - vscode
  - solargraph
---

## 前言

對於一個語言或框架的初學者來說，有一個強大的編輯器會要效率很多。
這裏推薦給像我一樣開發 Rails 專案的新手們一個 VSCode 的 extension：
[Ruby Solargraph](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph)

## 安裝 Ruby Solargraph

首先是要先在自己的環境中安裝`solargraph`，直接使用 gem：

```bash
$ gem install solargraph
```

沒有安裝`gem`的話，基本的 ruby 環境設定可以參考[這裡](https://github.com/rbenv/rbenv)。

安裝完成後，可以確認一下：

```bash
$ solargraph -v
0.38.5
```

接著在 VSCode 也安裝 extension，直接用 GUI 就可以，或是你喜歡透過 command line：

```bash
$ code --install-extension castwide.solargraph
```

我原先只做到這裡，以為就能動了，但我的 VSCode 只會一直顯示`starting the solargraph language server`而無法啟動。這應該是因為 VSCode 找不到 solargraph，我們可以手動設定它的路徑。

先找到 solargraph 的位置：

```bash
$ which solargraph
/Users/{username}/.rbenv/shims/solargraph
```

在 VSCode 的設定`settings.json`中加入其路徑

```json
{
  "solargraph.commandPath": "/Users/limin.chen/.rbenv/shims/solargraph"
}
```

再重開 VSCode 後，發現 solargraph 成功執行了！

## 追加 Rails 支援

雖然 Ruby Solargraph 成功執行了，但要再多做一些設定才能支援 Rails。

先在 Rails 專案目錄中執行指令並產生檔案`.solargraph.yml`：

```bash
$ solargraph config
```

然後編輯這個檔案，並將`require: []`的部分修改並加入以下內容：

```
require:
- actioncable
- actionmailer
- actionpack
- actionview
- activejob
- activemodel
- activerecord
- activestorage
- activesupport
```

這樣就設定完成了。

如果不希望 git 將這個檔案也加入 tracking 的話可以把`.solargraph.yml`加入專案的`.gitignore`裡。或是加進全域設定`~/.config/git/ignore`。

## References

- [Ruby Solargraph](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph)
- [VSCode で Ruby Solargraph 拡張機能を使ってみた話](https://qiita.com/hideki0145/items/d6a18095f95d57eebe96)
- [solargraph issues - Rails support](https://github.com/castwide/solargraph/issues/87)
- [solargraph issues - Couldn't start client Ruby Language Server](https://github.com/castwide/vscode-solargraph/issues/108)
