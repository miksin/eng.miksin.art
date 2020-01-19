---
path: /blog/2019-08-05-swift-parameter-names-and-argument-labels
title: Swift Function Argument Labels and Parameter Names
date: 2019-08-05
excerpt: 最近剛開始學習Swift，在嘗試使用function時撞牆許久，才發現swift這有趣的設計。
category:
- notes
tags:
- swift
- programming
---

## 前言

最近剛開始學習Swift，在嘗試使用function時撞牆許久，才發現swift這有趣的設計。
Swift可以讓function的內與外所使用的參數名區別開來，使用上不會非常麻煩，卻增加了可讀性。
<!-- more -->

---

## Argument Labels

我想在寫大部分程式語言時，我們都會宣告與呼叫function。
而呼叫時傳進參數的值在呼叫時卻不容易看出用途，這在閱讀別人的程式碼時時常需要去找對應的definition。

以javascript做個例子如下：

```javascript
function move(start, end) {
    return `from ${start} to ${end}`;
}
console.log(move('home', 'school')); // from home to school
```

若是我們不清楚function的宣告，光從呼叫本身來看，我們並無法知道傳入的`'home'`與`'school'`是甚麼用途。
畢竟function的呼叫也只是照順序傳參數進去。

當然，儘管不是強制的，在javascript你是可以寫成這樣來解決這個問題：

```javascript
console.log(move(start = 'home', end = 'school')); // from home to school
```

不過這裡又有另一個問題了，對於使用這個function來說，寫成 `move(from, to)` 似乎比較符合它的意義吧。
但是對這個function內部來說，這兩個參數還是`start`與`end`更加合適。
能不能同時滿足這兩者呢？

在Swift是可以的！Swift規定了給呼叫方使用，名為 *Argument Labels* 的功能。
在定義function時，除了function內部使用的名稱外，還可以定義專門給呼叫方使用的另一組名稱。

```swift
func move(from start: String, to end: String) -> String {
    return "from \(start) to `(end)"
}
move(from: "home", to: "school")
```

你覺得舒服多了.jpg

不過有的時候其實光從function的名稱上就已經看得出用途，即使如此每次呼叫都還要寫argument labels的確是有點麻煩。
這時候是能省略的，[這裡](https://swift.org/documentation/api-design-guidelines/#argument-labels)是官方提供的例子：

```swift
min(number1, number2)
zip(sequence1, sequence2)
```

像是這種類型的function確實就不需要加上argument labels了，而我們如果想要定義這種用法，只要在宣告function時，指定argument labels為 `_` 就可以了。

例如[Standard Library](https://developer.apple.com/documentation/swift/1538339-min/)提供的：

```swift
func min<T>(_ x: T, _ y: T) -> T where T : Comparable
```

以上是自己初學swift的一些筆記。

---

## References

- [Swift Language Guide](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID166)
- [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/#argument-labels)
- [Swift Standard Library](https://developer.apple.com/documentation/swift)
- [Parameter Names and Argument Labels in functions of Swift - Tien-Che Tsai
](https://medium.com/@sodastsai/parameter-names-and-argument-labels-in-functions-of-swift-9c6b37a2af73)
