---
path: /blog/2019-12-27-shell-array-and-loop
title: Array and Loop in Shell Script
date: 2019-12-27
excerpt: 在shell script中，我們可以像其他程式語言一樣使用array，也可以使用for loop來走訪array的每個元素。
featuredImage: bash-logo.png
category:
- notes
tags:
- shell
- programming
---

在shell script中，我們可以像其他程式語言一樣使用array，也可以使用for loop來走訪array的每個元素。

## Array的基本用法

### 宣告與存取

shell中array的宣告與存取元素並沒有什麼特別之處，
值得注意的是在shell中存取變數時要加上`${}`，
例如：

```sh
animals=(cat dog bird tiger lion)
echo ${animals[2]} # bird
```

而當我們直接存取宣告的變數時，會是存取到array的第一個元素：

```sh
echo $animals # cat
echo ${animals[0]} # cat
```

若想要存取array中的所有內容的話，可以使用`@`或是`*`，
但一般來說建議寫`@`，理由後面會說明：
```sh
echo ${animals[@]} # cat dog bird tiger lion
echo ${animals[*]} # cat dog bird tiger lion
```

### 範圍存取

如果有寫過python應該可以明白，
在python中對list選擇範圍是很容易的事，
其實在shell中也是能用類似的語法簡單做到的：

```sh
echo ${animals[@]:1} # dog bird tiger lion
echo ${animals[@]:1:3} # cat dog bird tiger
echo ${animals[1]:1:3} # og
```

這種存取方法對普通的字串也是有用的

### 計算長度

計算array的數量非常簡單，在變數名前面加上`#`即可，這個方法在字串上也是可以用的：

```sh
echo ${#array[@]} # 5
echo ${#array[0]} # 3
```

## 在for loop使用array

結合剛剛提過的存取元素的語法就可以簡單在for loop中使用：

```sh
for animal in ${animals[@]}; do
    echo $animal
done
```
```sh
# result
cat
dog
bird
tiger
lion
```

但是這麼寫會有一個重大缺陷，當array元素出現空白等元素時，
會造成結果不如預期，例如我們稍微換一下array中的元素：

```sh
animals=("cat" "dog" "bird tiger")
for animal in ${animals[@]}; do
    echo "animal: $animal"
done
```

```sh
#result
animal: cat
animal: dog
animal: bird
animal: tiger
```

本來預期執行三次的迴圈，因為空白的出現導致變成了四次，
我們可以透過些微的修改迴圈的寫法來避免這樣的情形：

```sh
animals=("cat" "dog" "bird tiger")
for animal in "${animals[@]}"; do
    echo "animal: $animal"
done
```

```sh
#result
animal: cat
animal: dog
animal: bird tiger
```

在變數的兩側加上引號`"`可以避免這樣的問題，結果就正確了

## Appendix: `[@]`與`[*]`的差異

還記得前面說過的列出所有元素時可以使用`[@]`或是`[*]`嗎？
事實上這兩種用法在某些情形下會有不同的行為，
比方說剛剛的例子我們換成使用星號`*`

```sh
animals=("cat" "dog" "bird tiger")
for animal in "${animals[*]}"; do
    echo "animal: $animal"
done
```

```sh
#result
animal: cat dog bird tiger
```

這是什麼東西？怎麼只執行了一次？
但是若是去掉引號`"`，這兩個的行為又完全一樣了。
看來`@`與`*`有展開方式的差異，在大部分的時候使用`@`才會是符合預期的結果。
詳情可以參考[這裡](https://stackoverflow.com/questions/3348443/a-confusion-about-array-versus-array-in-the-context-of-a-bash-comple)。

## References

- [Loop through an array of strings in Bash?](https://stackoverflow.com/questions/8880603/loop-through-an-array-of-strings-in-bash)
- [A confusion about ${array[*]} versus ${array[@]} in the context of a Bash completion](https://stackoverflow.com/questions/3348443/a-confusion-about-array-versus-array-in-the-context-of-a-bash-comple)
- [bash 配列まとめ](https://qiita.com/b4b4r07/items/e56a8e3471fb45df2f59)
