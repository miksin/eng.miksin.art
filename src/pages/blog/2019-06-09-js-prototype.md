---
path: /blog/2019-06-09-js-prototype
title: Javascript prototype 筆記 - 1
date: 2019-06-09
excerpt: javascript 並沒有class的設定，取而代之的是使用特殊的prototype chain實作相似的效果。
category:
- notes
tags:
- javascript
- programming
---
## 前言

javascript 並沒有class的設定，取而代之的是使用特殊的prototype chain實作相似的效果。
<!-- more -->

---

## new 與 constructor

以下是個例子：*Person* 與 *Animal* 各是一個function，並且有相同的參數與相同的內容。

```javascript
var Person = function(name, age) {
  this.name = name;
  this.age = age;
}

var Animal = function(name, age) {
  this.name = name;
  this.age = age;
}

console.log(Person); // ƒ (name, age){ this.name = name; this.age = age; }
console.log(Animal); // ƒ (name, age){ this.name = name; this.age = age; }
```

這時，我們可以使用這些function搭配 `new` 作為constructor產生其對應的instance。這裡使用了Person作為constructor產生了一個名為 *john* 的instance。

```javascript
var john = new Person('john', 20);

console.log(john); // Person {name: "john", age: 20}
```

透過 `instanceof` 確認了john確實是Person的instance，且john也是 `Object` 的instance，卻不是Animal的instance。另外，Person雖然是宣告為function，但它也是 `Object` 的instance

```javascript
console.log(john instanceof Person); // true
console.log(john instanceof Object); // true
console.log(john instanceof Animal); // false
console.log(Person instanceof Object); // true
```

至此我們可以發現john是Person的instance，而Person又是Object的instance。而這與john被判定為Object的instance又有甚麼關聯呢？  
這裡我們參考[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)的解釋：

> *object* instanceof *constructor*  
> The `instanceof` operator tests the presence of `constructor.prototype` in object's **prototype chain**.

出現了！看來對於instance的判定似乎與前言所提到的prototype chain是相關聯的。
另外這裡提到了`constructor.prototype`，我們來再進一步研究看看。

## prototype 與 __proto__

```javascript
console.log(Person.prototype); // {constructor: ƒ (name, age)}
console.log(john.__proto__);   // {constructor: ƒ (name, age)}
console.log(john.__proto__ === Person.prototype) // true
```

我們可以透過物件的 `__proto__` 來看生成這個物件的prototype是甚麼。
這裡我們發現 `john.__proto__` 指向了 `Person.prototype`。
我們再繼續往源頭探索：

```javascript
console.log(Person.prototype.__proto__);
console.log(Object.prototype);
/* both of them:
{
  constructor: ƒ,
  __defineGetter__: ƒ,
  __defineSetter__: ƒ,
  hasOwnProperty: ƒ,
  __lookupGetter__: ƒ,
  …
}
*/
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(john.__proto__.__proto__ === Object.prototype);   // true
```

這兩個例子就能解釋，如果某物件的原型 `__proto__` 不斷遞迴尋找最後能夠指向另一個物件的 `prototype` ，就會被 `instanceof` 判定為 `true`。
這個彼此連接的行為就被稱為 *prototype chain* 。

同場加映：那麼剛才看到的 `constructor` 又指向的什麼呢？

```javascript
console.log(Person.prototype); // {constructor: ƒ (name, age)}

console.log(Person.prototype.constructor);
/*
ƒ (name, age) {
  this.name = name;
  this.age = age;
}
*/

console.log(Person.prototype.constructor === Person);
```

可以看到，某個function的constructor最終指向了他自己。

這是我在理解javascript的prototype機制的一些筆記。

---

## References

- [MDN Web docs](https://developer.mozilla.org/)
