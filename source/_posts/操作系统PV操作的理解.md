---
title: 操作系统PV操作的理解
date: 2022-10-21 22:08:46
tags: 操作系统
categories: 学习
---

**PV操作概念**：操作系统中的一种同步机制，实现对于并发进程中临界区的管理。

并发进程分为两种：

①**无交互的并发进程**：每个进程是相互独立的，谁也不影响谁，基本不会用到PV操作。

②**有交互的并发进程**：多个进程共享资源，一个进程的运行，有可能会被外界的原因而中断，且断点不固定。进程执行的相对速度不能由进程自己来控制，于是就会导致并发进程在共享资源的时出现**与时间有关的错误**。

**临界区**：并发进程中与共享变量有关的程序段都称为临界区。

**P操作**：申请资源操作。

**V操作**：释放资源操作。

**信号量S**：用来记录资源数量，看是否能满足申请资源的操作。例如：S=3 表示三个可用空闲资源，S<0表示可用空闲资源无，进程申请要进入等待队列中。

**P(S)：S <—— S - 1** 

​          **如果S >= 0，进程继续执行**

​          **如果S < 0，进程停止执行，放入信号量等待队列中。**

**V(S)：S <—— S +1** 

​           **如果S > 0，进程继续执行；**

​           **如果S <= 0，唤醒等待队列中的一个进程。**



**例题**

![image-20221122200128815](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/image-20221122200128815.png)



应试做题方法：

从左到右、从上到下的将所有信号量标注在前驱图的箭头上，出发点是V操作，结束点是P操作，按照图选择答案即可。

![1666361800241](https://hiroshi-typota.oss-cn-chengdu.aliyuncs.com/img/1666361800241.png)



所以易得答案CAA