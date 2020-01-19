---
path: /blog/2018-10-24-js-function-getter-setter
title: javascript中的function命名空間與模擬getter、setter
date: 2018-10-24
excerpt: 在javascript中，function也可以擁有自己的命名空間
categories:
- notes
tags: 
- javascript
- programming
---

### function的命名空間

在javascript中，function也可以擁有自己的命名空間
例如以下這段程式碼：
<!-- more -->

```javascript
function A() {
  return 'I am A';
}

A.hello = 'hello!';

console.log(A());
console.log(A.hello);

```

我們可以在console得到以下內容：

```console
I am A
hello!
```

可以發現即使A被宣告成一個function，它依然可以像object一樣被assign其中的其他attribute，而直接呼叫A本身也還是它原來function的功能

### getter、setter

在javascript中，this會是呼叫它的對象，可以參考[這裡](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
因此我們可以結合命名規則的特性寫成這個樣子

```javascript
function A() {
  let Name = 'john';
  let Gender = 'male';
  
  function f () {
  }

  f.Name = function(_) {
    if (!arguments.length) {
      return Name;
    }
    Name = _;
    return this;
  }
  
  f.Gender = function(_) {
    if (!arguments.length) {
      return Gender;
    }
    Gender = _;
    return this;
  }

  return f;
}

const a = A();

console.log(a.Name());
console.log(a.Gender());

```

這裡我們在function A中定義了兩個變數Name, Gender
然後分別使用A中的兩個function來作為存取他們的getter與setter
若我們不傳任何參數給a.Name與a.Gender的話，將可透過他們得到A中的兩個local變數，因此這裡的console將會印出：

```
john
male
```

而若我們有傳參數的話，例如這樣：

```javascript
console.log(a.Name('alice').Name());
console.log(a.Gender('female').Gender());
```

這兩個函數將會作為setter使用，並會回傳f以便繼續呼叫其他變數
這是因為我們在這兩個function中回傳了this，因此我們又重新得到了呼叫他的物件f，故可以在console中得到：

```
alice
female
```

這裏我們看到可以將function作為一般命名空間使用，另外透過this也能實作getter、setter來存取這個命名空間中的變數
