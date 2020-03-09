---
path: /blog/2020-01-10-freeze-and-seal
title: JS中使用Object.freeze與Object.seal凍結物件
date: 2020-01-10
excerpt: 我們知道在ES6中，我們可以把變數宣告為常數`const`來使其不能被修改。但使用在物件上仍無法阻止其內部被改動。
featuredImage: ../images/javascript.png
category:
  - notes
tags:
  - javascript
  - programming
---

## 前言

我們知道在 ES6 中，我們可以把變數宣告為常數`const`來使其不能被修改。
但使用在物件上仍無法阻止其內部被改動。

那如果我就是不想要一個物件包含內部成員被修改，有沒有辦法呢？
答案是有的，我們可以視需求使用`Object.freeze`或是`Object.seal`來解決這個問題。

## 使用`Object.freeze`來保護物件

首先我們宣告一個常數物件`obj1`，且如前言所提到的，它的內部成員是能夠被修改的

```javascript
const obj1 = { a: 1, b: 2, c: { d: 3 } }
console.log(obj1) // { a: 1, b: 2, c: { d: 3 } }
obj1.a = 4
console.log(obj1) // { a: 4, b: 2, c: { d: 3 } }
```

這裡我們嘗試使用`Object.freeze`來「凍結」這個物件

```javascript
console.log(obj1) // { a: 4, b: 2, c: { d: 3 } }

Object.freeze(obj1)
obj1.a = 5
obj1.t = 777
delete obj1.b
console.log(obj1) // { a: 4, b: 2, c: { d: 3 } }
```

現在我們發現不管對是其既有的成員修改或是新增/刪除 key 都沒有用了。
但是還是有一點需要注意的，如果進行深層修改的時候呢？

```javascript
obj1.c.d = 777
console.log(obj1) // { a: 4, b: 2, c: { d: 777 } }
```

我們會發現我們仍舊無法阻止深層修改，`Object.freeze`只會保護該物件自己本身所擁有的 key 而已。
若我們想要將整個物件包含深層全部凍結住，則必須自行實作，以下是
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
所提供的片段程式碼：

```javascript
function deepFreeze(object) {
  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object)

  // Freeze properties before freezing self

  for (let name of propNames) {
    let value = object[name]

    object[name] =
      value && typeof value === "object" ? deepFreeze(value) : value
  }

  return Object.freeze(object)
}
```

## 使用`Object.seal`來保護物件

除了`Object.freeze`，javascript 還提供了另一個功能稍微不同的 API `Object.seal`。

兩者的功能大致上相同，差別只在**能不能對既有的 key 修改其內容**：

```javascript
const obj2 = { a: 1, b: 2, c: { d: 3 } }
console.log(obj2) // { a: 1, b: 2, c: { d: 3 } }
obj2.a = 4
console.log(obj2) // { a: 4, b: 2, c: { d: 3 } }

Object.seal(obj2)
obj2.a = 5
obj2.t = 777
delete obj2.b
console.log(obj2) // { a: 5, b: 2, c: { d: 3 } }
```

我們做了與前面完全相同的操作，可以發現我們仍然無法變動 key 的數量，但卻可以對修改既有成員的數值了。

當我們允許這個物件的內容被修改，卻不允許其結構本身發生變動的時候（例如資料庫的物件等），我們就可以使用這個 function。

## 檢驗物件是否遭到凍結

我們可以分別透過`Object.isFrozen`及`Object.isSealed`進行判別兩者，
且可以從中得知`Object.seal`的結果被包含於`Object.freeze`：

```javascript
console.log(Object.isFrozen(obj1), Object.isFrozen(obj2)) // true false
console.log(Object.isSealed(obj1), Object.isSealed(obj2)) // true true
```

## Conclusions

`const`可以保護變數本身的 refence 不被修改。
而`Object.freeze`與`Object.seal`可以在不同程度上保護物件本身不被修改。

## References

- [MDN: Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [MDN: Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
