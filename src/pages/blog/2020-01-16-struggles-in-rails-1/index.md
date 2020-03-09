---
path: /blog/2020-01-16-struggles-in-rails-1
title: 學習rails時所遇到的挫折們 - 其一
date: 2020-01-16
excerpt: 我曾學習過很多語言與框架，以我自己的經驗來說，這些觀念都是相同的。不論從哪個語言開始學習，得到經驗帶到學習新語言時總是能觸類旁通。恩...直到我遇上了ruby跟rails。
featuredImage: ../images/rails.png
category:
  - notes
tags:
  - ruby
  - rails
  - programming
---

## 前言

作為一個 web 框架，rails 曾經紅極一時，直到現在也依然有非常多服務正在使用 rails。
讓我也決定學習使用這個框架，當然在那之前 ruby 也是必須學會的。

我曾學習過很多語言與框架，以我自己的經驗來說，這些觀念都是相同的。
不論從哪個語言開始學習，得到經驗帶到學習新語言時總是能觸類旁通。
恩...直到我遇上了 ruby 跟 rails。

這裏整理了一些我初學 ruby 與 rails 所遇到的挫折們的筆記，
希望也能幫助到同樣入坑的人可能會發生的問題。
至於為什麼標題叫做其一？
因為我覺得我肯定會繼續挫折的。但若沒有出第二集就表示一切順利：）

## ruby 相關

ruby 是我學習程式之路上遇過最神奇的語言。
許多設計都與主流程式語言截然不同，甚至逆向開車。
但了解其設計原理之後，就覺得也不全無道理。
若能接受它的哲學，其方便之處也是非常多得。

### 在 function 名稱中使用符號

ruby 有個變數命名習慣，就是會某些情形於 function 名中使用`?`與`!`。
這並不是一件奇怪的事，有固定的命名習慣也能幫助他人迅速掌握 function 的內容。

#### 有 side-effect 的 function 在後面加上`!`

```ruby
arr = [1, 2, 3]
arr.map { |x| x + 1 }  # 回傳[2, 3, 4]，且原本的陣列內容不變
arr.map! { |x| x + 1 } # 回傳[2, 3, 4]，且將陣列內容更新為map後的
```

#### 回傳值為 boolean 的加上`?`

ruby function 名後的`?`，其實就與許多語言中`isXXX`這種命名的意義相同

```ruby
[].empty?        # true
[1, 2, 3].empty? # false
```

### map 的多種寫法

`map`(或其他類似的操作 `filter`, `each`等)
會有多種寫法主要其實是因為 ruby 有特殊的 `block statement` 的設計。
詳情可以參考[這裡](https://railsbook.tw/chapters/07-ruby-basic-3.html)

使用 block statement 就有兩種寫法：

```ruby
[1, 2, 3].map { |x| x + 1 } # [2, 3, 4]

[1, 2, 3].map do |x|        # [2, 3, 4]
  x + 1
end
```

在某些狀況可以使用 `&` 可以讓程式碼更簡潔些：

```ruby
["a", "b", "c"].map(&:upcase) # ["A", "B", "C"]
```

這是使用了`Symbol`的`to_proc`方法的語法糖，詳細可參考
[這裡](https://qiita.com/k-penguin-sato/items/420d7487b28b5d58cac4)。

因此這種寫法其實也可以寫成這樣：

```ruby
["a", "b", "c"].map { |x| :upcase.to_proc.call(x) } # ["A", "B", "C"]
```

根據不同狀況有語法糖是不錯，只是達成同一個目的有太多種作法容易造成混淆也是困擾的地方呢。

### function 呼叫的各種省略

這是我閱讀一個專案中的 ruby 程式碼時少數會讓我有點「生氣」的設計。
就是 ruby 中的 function 呼叫可以省略小括號，在某些條件下也能省略參數用的大括號。

我們先來看一個在 rails 中常見的寫法：
([參考來源](https://railsbook.tw/chapters/07-ruby-basic-3.html))

```ruby
<%= link_to '刪除', user, method: :delete, data: { confirm: 'sure?' }, class: 'btn' %>
```

![這是殺小？.jpg](confused.jpg)

要說這是一個 function 呼叫實在令人難以接受。
從表面來看甚至無法得知從哪邊開始是參數，有幾個參數，到哪邊為止都還算 call function 的一部份？

這裏要先看第一個省略：省略 call function 時的小括號

```ruby
def hello
  puts 'hello!'
end

hello # 只要這樣寫就算call function
```

對我來說最不能接受的就是這個設計，這會直接影響到對程式碼行為的判讀。
我光看片段程式碼根本不知道這到底是變數還是 function 執行後的結果，嚴重降低維護與 review 效率。

不過既然語言這樣設計也只能接受，因此上面的`link_to`即是呼叫 rails 中這個名稱的 function。

接下來是參數的數量，在 link_to 的範例裡可以看到被逗號隔開的項目有五個，但這裡其實並不是五個參數。
`method: :delete`並不是代表`link_to`裡面有一個叫做`method`的參數名，
`method: :delete, data: { confirm: 'sure?' }, class: 'btn'`是**一個參數**

這是 ruby 的一個神秘設計，當 function 最後一個參數是 hash 時，它的大括號可以省略。
因此這個例子我們不要省略東西看起來是這個樣子的：

```ruby
<%= link_to('刪除', user, {method: :delete, data: { confirm: 'sure?' }, class:'btn'}) %>`
```

好，我們現在知道 function 呼叫用的小括號可以省略了，
但是這裡有個嚴重的問題來了，如果我就是沒有要呼叫，而是要做其他操作例如當變數傳遞時怎麼辦？

我們可以使用`method`這個 function，將它轉換為另一個物件來傳遞，
然後在需要呼叫時使用該物件的`call`方法來呼叫，比方說我們有一個 function：

```ruby
def hello
  puts 'hello!'
end

h = method(:hello)
h.call # hello!
```

或是，恩，用剛學到的省略括號的方式：

```ruby
h = method :hello
h.call # hello!
```

#### Ruby 2.0 新增的 Keyword Arguments 一同使用

### 覆寫 built-in class

這是源自於 ruby 的一個特色：Open Class, 重複宣告的 class 會互相融合。
且成員衝突時，後宣告的會覆寫前面宣告的。
這個設計甚至對 built-in class 也有用！

```ruby
"hello".size # 5

class String
  def size
    return 1
  end
end

"hello".size # 1
```

可以看到我們成功覆寫了 string 中 size 的定義，讓其不管長度多少都只會回傳 1。

這是個在很多情況會讓人很困擾的設計，但或許 ruby 是想讓使用者在使用上更有彈性些吧。
豬隊友就不是語言能防的了。

## rails 相關

這部分多半是源於閱讀一個 rails 專案程式碼時時常產生的疑惑：rails 到底幫我做了多少事？
rails 的方便之處就在於只要遵照慣例，就能以少量的程式碼快速產生一個網站所需的功能。
但如果對 rails 熟悉度不夠，在維護現存程式碼時就倍加困難，
因為不清楚哪些沒寫出來的部分是由 rails 擅自完成的。

### model 中依據 enum 所產生的 functions

有時候我們在 Relational Database 的設計中，會有類似 _status_ 這樣的 attribute。
如果使用 string 來儲存雖然可以讓人也能看懂在 db 中的 record，但無疑會影響效能。
因此在很多設計中會改以整數來儲存，並在 orm 中搭配使用 enum 來幫助維護。

比方說現在有個 table 叫做`Article`，我們用`status`來代表這個文章現在的狀態。

```ruby
class Article < ActiveRecord::Base
  enum status: [:draft, :scheduled, :published]
end
```

我們用 enum 分別代表草稿，預約公開與已公開三種狀態。
而這時 rails 會自動幫我們分別為這三種狀態產生 boolean functions：

```ruby
article = Article.new(status: :draft)
article.status # draft

article.draft?     # true
article.scheduled? # false
article.published? # false
```

喔喔！這聽起來挺方便的，
變成可以使用 enum 的值並在後面加上問號來確認現在是不是這個狀態。

除了問號之外 rails 也使用驚嘆號分別產生的對應的 function：

```ruby
article.draft!     # 將status改成draft
article.scheduled! # 將status改成scheduled
article.published! # 將status改成published
```

還記得前面提到的命名慣例嗎？
驚嘆號代表有 side-effect 的 function。
這幾個 function 會直接修改 model 的內容。

## References

ruby/rails 的日本使用者較多，有些參考連結是日文的請見諒 :)

- [【Ruby】array.map(&:method)を理解する](https://qiita.com/k-penguin-sato/items/420d7487b28b5d58cac4)
- [方法與程式碼區塊（block）](https://railsbook.tw/chapters/07-ruby-basic-3.html)
- [Ruby – Open Classes and Monkey Patching](https://codingbee.net/ruby/ruby-open-classes-and-monkey-patching)
- [Ruby 2 Keyword Arguments](https://thoughtbot.com/blog/ruby-2-keyword-arguments)
- [Fun With Keyword Arguments, Hashes, and Splats](https://www.justinweiss.com/articles/fun-with-keyword-arguments/)
- [Rails enum についてまとめておく](https://qiita.com/shizuma/items/d133b18f8093df1e9b70)
