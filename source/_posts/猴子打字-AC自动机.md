---
title: 猴子打字-AC自动机
date: 2023-11-22 22:32:42
tags: [题解,算法]
categories: 学习
---

有一个有趣的定理：无限猴子定理（infinite monkey theorem），它的表述如下：让一只猴子在打字机上随机按键，当按键次数达到无穷时，几乎必然能够打出任何给定的文字。

给出一篇猴子打出的“文章”，并给定一个由若干个词组成的词典，问猴子一共打出了多少个在词典中出现的词。

<!--more-->

**输入格式:**

第一行一个整数 $(1≤n≤10000)$，表示词典中单词的个数。

接下来$n$行，每行一个仅由小写字母组成的单词，长度不超过 $50$。

最后一行是一篇仅由小写字母组成的文章，长度不超过 $1000000$。

**输出格式:**

一行一个整数，表示答案。

**输入样例：**

> ```
> 5
> jsk
> jisuan
> suantou
> love
> program
> jisuantouisprogramming
> ```

**输出样例：**

> 3



这道题是 AC 自动机的模板题，直接套用模板就好了。

AC 自动机算法主要依靠构造一个有限状态机（类似于在一个 Trie 树中添加失配指针）来实现。

这些额外的失配指针允许在查找字符串失败时进行回退（例如设 Trie 树的单词 `cat` 匹配失败，但是在 Trie 树中存在另一个单词 `cart`，失配指针就会指向前缀 `ca`），转向某前缀的其他分支，免于重复匹配前缀，提高算法效率。

如果对 KMP 算法了解的话，应该知道 KMP 算法中的 `next` 函数的用途。KMP 中我们用 `next` 函数记录了失配后应该调整到的位置，AC 自动机的失败 `Fail` 指针具有同样的功能，也就是说当我们的模式串在 Trie 上进行匹配时，如果与当前节点的关键字不能继续匹配，就应该去当前节点的失败指针所指向的节点继续进行匹配。

```cpp
#include <bits/stdc++.h>

const int MAXC = 26;
const int MAXN = 1000007;
const int MAX_WORD_LEN = 57;

using namespace std;

// 数据量比较大，可能需要开成全局的，或者动态的，直接放在结构体中，也许会超内存
int child[MAXN][MAXC], fail[MAXN], sta[MAXN], Q[MAXN];
int tot;

/**
 * AC 自动机
 */
struct AC_Automaton {

//    int child[MAXN][MAXC], fail[MAXN], sta[MAXN], Q[MAXN];
//    int tot;

    /**
     * 清空
     */
    void clear() {
        memset(child, 255, sizeof(child));
        memset(fail, 0, sizeof(fail));
        tot = 0;
        memset(sta, 0, sizeof(sta));
    }

    /**
     * 插入单词
     * @param ch 单词，该单词下标从 1 开始
     */
    void insert(char* ch) {
        int p = 0, l = strlen(ch + 1);
        for (int i = 1; i <= l; i++)
        {
            if (child[p][ch[i] - 'a'] == -1) child[p][ch[i] - 'a']= ++tot;
            p = child[p][ch[i] - 'a'];
        }
        sta[p]++;
    }

    /**
     * 对插入了单词的前缀树构造失败指针
     */
    void build() {
        int l = 0, r = 0;
        for (int i = 0; i < MAXC; i++)
            if (child[0][i] == -1)
                child[0][i] = 0;
            else
                Q[++ r] = child[0][i];
        while (l < r) {
            int p = Q[++l];
            for (int i = 0; i < MAXC; i++)
                if (child[p][i] == -1)
                    child[p][i] = child[fail[p]][i];
                else {
                    fail[child[p][i]] = child[fail[p]][i];
                    Q[++ r] = child[p][i];
                }
        }
    }

    /**
     * 查询给定的字符串中，一共有多少个单词是出现在词典中的
     * @param ch 给定的字符串，该字符串下标从 1 开始
     * @return 该字符串中有多少单词是出现在词典中的
     */
    int solve(char* ch) {
        int ret = 0, p = 0, l = strlen(ch + 1);
        for (int i = 1; i <= l; i++) {
            p = child[p][ch[i] - 'a'];
            int tmp = p;
            while (tmp) {
                ret += sta[tmp];
                sta[tmp] = 0;
                tmp = fail[tmp];
            }
        }
        return ret;
    }
}T;

int main() {
    // 构造 AC 自动机
    auto ac = new AC_Automaton();
    ac->clear();
    int n;
    scanf("%d", &n);
    // 读入单词，加入前缀树
    char* s = (char*)malloc(sizeof(char) * MAX_WORD_LEN);
    for (int i = 0; i < n; i++) {
        // 字符串下标从 1 开始
        scanf("%s", s + 1);
        ac->insert(s);
    }
    // 根据前缀树中的单词构造失败指针，即构造字典
    ac->build();
    // 给定的文章，下标从 1 开始
    char* t = (char*)malloc(sizeof(char) * MAXN);
    scanf("%s", t + 1);
    printf("%d\n", ac->solve(t));
    return 0;
}
```
