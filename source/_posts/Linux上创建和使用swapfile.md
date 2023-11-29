---
title: Linux上创建和使用SWAP
date: 2023-02-17 15:01:14
tags: [学习,Linux]
categories: 学习
---

### 什么是SWAP
一般来说swap指的是一个交换分区或文件，其功能是主要是在内存不够用的时候，将部分内存上的数据交换到swap空间上，以便让系统不会因内存不够用而导致oom或者更致命的情况出现。
<!--more-->
### 创建SWAP
#### 1.创建一个交换文件
在Linux上创建交换文件非常简单，可以使用dd命令来创建一个指定大小的文件，然后使用mkswap命令将其标记为交换空间。例如，我们可以使用以下命令创建一个大小为1GB的交换文件：
``sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576``
这个命令的意思是用 dd 工具从 **/dev/zero** 读取数据，然后写入到 **/swapfile** 文件中。**/dev/zero** 是一个特殊的设备文件，它会提供无限的零字节。**bs=1024** 指定了每次读写的块大小为 1024 字节，也就是 1 KB。**count=1048576** 指定了总共要读写的块数为 1048576，也就是 1 MB。所以这个命令会创建一个大小为 1 GB 的文件，里面全是零字节。这个文件通常用来作为交换分区，用来扩展系统的内存。

上面的指令也可以写成``sudo dd if=/dev/zero of=/swapfile bs=1G count=1``，这两个命令的效果是一样的，只是读写的块大小和块数不同
bs的值会影响dd命令的性能，因为它决定了每次读写的数据量。如果bs的值太小，那么dd命令就需要进行更多的系统调用，这会增加开销和延迟。如果bs的值太大，那么dd命令就可能遇到缓冲区溢出或者内存不足的问题，这也会降低性能。一般来说，bs的值应该根据不同的硬件和操作系统的特点来选择，比如磁盘扇区大小、内存大小、缓存大小等。你可以尝试不同的bs的值，并且用**SIGUS1信号**来查看dd命令的状态报告，从而找到一个合适的bs的值。


#### 2.准备交换空间
创建好交换文件后，我们需要将其标记为交换空间。可以使用mkswap命令：
``sudo mkswap /swapfile``

（可选）
- 默认权限过于宽松，我们可以限制它们，以便只有 root 用户可以使用 swapfile。
- ``sudo chmod 600 /swapfile``

#### 3.使用交换空间
标记好交换文件后，我们需要将其挂载为交换空间。可以使用swapon命令：
``sudo swapon /swapfile``

#### 4.持久化交换空间
如果我们希望在系统重启后仍然可以使用交换空间，需要将其持久化。可以将swapfile添加到/etc/fstab文件中，这样系统在启动时会自动挂载交换文件。例如，我们可以使用以下命令将swapfile添加到/etc/fstab文件中：

``echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab``
这个命令会将/swapfile添加到/etc/fstab文件中，并设置其为交换空间，你也可以手动把``/swapfile none swap sw 0 0``给追加到``/etc/fstab``的最后一行。

参数解释：
```
/swapfile：这是要挂载的文件系统的路径，也就是我们之前创建的交换分区文件。
none：这是要挂载到的目标路径，对于交换分区来说，不需要指定具体的路径，所以用 none 表示。
swap：这是要挂载的文件系统的类型。
sw：这是挂载选项，sw 表示交换空间。
0 0：这是 dump 和 fsck 的参数，dump是要挂载的文件系统的备份频率，对于交换分区来说，不需要备份，所以用 0 表示；fsck是文件系统检查的优先级，对于交换分区来说，不需要检查，所以用 0 表示。
```

#### 5.检查交换空间使用情况
使用指令``swapon --show``可以查看当前系统中的交换空间使用情况，如下图所示：

![swapon --show](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/swapon--show.png)


参考链接：[How to Create a Swap File on Linux](https://www.howtogeek.com/455981/how-to-create-a-swap-file-on-linux/)