---
path: /blog/2019-08-06-swift-optional
title: Optional in Swift
date: 2019-08-06
excerpt: 我們有時候會需要讓變數有可能會是「空值」，這在每個程式語言都有可能有這個需求。
category:
- notes
tags:
- swift
- programming
---

## 前言

我們有時候會需要讓變數有可能會是「空值」，這在每個程式語言都有可能有這個需求。
但Swift為此設計了許多配套措施，讓一切使用上變得很順暢又十分有趣，因此在這裡記下筆記。
<!-- more -->

---

## `Optional` and `nil`

前言提到我們需要讓變數可能是空值，我們這裡舉個例子來想像這個問題。

我想要紀錄朋友們的資訊，因此寫了一個名為 *Person* 的 class ：

```swift
class Person {
    var name: String

    init(_ name: String) {
        self.name = name
    }
}
let alice = Person("alice")
print(alice.name) // alice
```

我紀錄了一個名為 *alice* 的好友的資訊。不過可以的話除了名字之外我還想知道~~她有沒有男朋友~~

```swift
class Person {
    var name: String
    var lover: Bool

    init(_ name: String, lover: Bool) {
        self.name = name
        self.lover = lover
    }
}
let alice = Person("alice", lover: false)
print(alice.name) // alice
print(alice.lover) // false
```

新增了一個名為lover的boolean值欄位，我只要用`true`或`false`來填上就行了。
但是其實這裡似乎有設計上的問題：在我新增這筆資料時，我可能還不知道她有沒有情人呀！

我可能今天才交了一個朋友，第一天就問這種問題也有點奇怪，所以還只能記上名字。
即便我知道答案是`true`並一開始就紀錄了，但也是可能在某天聽聞這樣的風聲「alice好像跟學長分手了耶」，那我應該立刻將這個欄位改為`false`嗎？果然還沒確認之前，似乎應該要是「不明」才對呢。

`Optional` 這樣的設計就這樣誕生了。我們可以讓一個變數有 `nil`(空值) 存在的可能性。以剛才的例子來看即是：

```swift
var lover: Bool? // default value is nil
```

使用問號 `?` 來表達這個變數是Optional，這看起來挺直觀的，畢竟就是可能有值，也可能沒有值的狀態。
在宣告完成後，由於我們沒有同時設定上initial value，這個 *lover* 就直接是 `nil` 了：

```swift
class Person {
    var name: String
    var lover: Bool?

    init(_ name: String) {
        self.name = name
    }
}
let alice = Person("alice")

if alice.lover == nil {
    print("is nil")
} // is nil
```

然後我們想依據`lover`的值設定要顯示的訊息：

```swift
alice.lover = false
let msg = alice.lover ? "give up" : "chance" // Compile Error
print(msg)
```

當我們嘗試想要讀取`lover`時，出現了*Compile Error*，可是我們不是在前一行已經好好的賦予他一個值了嗎？

這算是一種安全機制，Optional的變數內容是個黑盒子，我們並不知道他的內容是什麼，Swift不允許我們在打開盒子前就讀取其內容。

---

### Forced Wrapping `!`

我們嘗試使用第一種方式打開包裝：

```swift
alice.lover = false
let msg = alice.lover! ? "give up" : "chance"
print(msg) // chance
```

這次沒有出現Compile Error了。我們在 `alice.lover` 後面加上了一個驚嘆號 `!`，這個 `!` 代表著 **forced unwrapping**，意旨我們在要使用的同時強制打開包裝把裡面的東西倒出來。

但這樣的使用方式有個嚴重的問題，如果裡面沒有東西，也就是`nil`的話，程式就會產生*Runtime Error*。
這是個嚴重的問題，就好比我們擅自翻閱Alice同學的聊天紀錄結果被她黑單了一樣，我們在嘗試做後續的行為之前，還是應該謹慎一點。

### `if let` and `guard let`

我們可以用`if alice.lover != nil`謹慎的使用`if`來判斷這個Optional是不是`nil`，如果不是我們再使用`!`來打開包裝，但每次都這樣實在是有點麻煩又冗長。
而Swift提供了一些語法糖來幫助我們解決這個問題：

```swift
if let lover = alice.lover {
    print(lover ? "give up" : "chance")
} else { /* do something */ }
```

使用`if let`的話，可以在判斷後直接賦值，相當於檢查內容後直接拿到包裝內的東西。
且這邊已賦值的`lover`因為已經知道沒有`nil`的可能了，並不是Optional，使用時可以不用在後面加上`!`。

而在某些狀況下使用`guard let`會更加合適：

```swift
func doSomething(_ person: Person) {
    guard let lover = person.lover else { return }
    // ...
}
```

比方說這個在function中，如果我們不知道這個人到底有沒有情人，我們就不做任何事。
使用`guard let`在檢查時直接賦值，若為`nil`則return。
用法與`if let`類似，但`guard let`更適合用在提早return的場合。

### Nil-Coalescing Operator

有時候我們遇到`nil`時也並不是要做甚麼複雜的處理，只是準備了個預設值來使用就好，那就可以使用 `??` 這個語法糖。

```swift
let lover = alice.lover ?? false
// let lover = alice.lover != nil ? alice.lover! : false
```

在這個例子中，我們設定為「不知道alice有沒有男朋友，就當作沒有」來行動。這個語法就變得相當簡潔，萬一遇上`nil`時，也早已準備好預設值而不會出現**Runtime Error**。

## 總結

Swift使用了Optional型態來處理`nil`的問題，而對應的語法糖大致有以下：

1. forced unwrapping `!`
2. `if let` and `guard let`
3. Nil-Coalescing Operator `??`

另外還有這裡沒提到的**Optional Chaining**就再另外新增一篇筆記。

---

## References

- [Swift Language Guide](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html)
- [初學Swift：愛恨交織的 Optional - Grady Zhuo](https://www.appcoda.com.tw/swift-optional/)
- [Swift的問號與驚嘆號：可有可無的 Optional - 彼得潘](https://www.appcoda.com.tw/swift-optional-intro/)
