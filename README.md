# ClashConfig
自用Clash配置
***
## 使用方法
将parser.yaml内容复制并替换掉原parser文件中即可。
文件中含有两个parser：
- 清空原订阅的所有规则，并写入自用规则
- 缓存上一个parser写入的rule-provider

由于rule-provider的加载是发生在clash core加载profile时，所以此处链接是直连的，大概率导致加载失败。
第二个parser预先把rule-provider加载到本地(parser是cfw更新profile时执行的，所以此处流量可以被代理)，然后让clash core直接用本地的ruleset，这样极大提提升了加载成功率和速度。
***
如果不想使用远程js，可以使用parser-single.yaml，已经把js代码整合到一个文件中。
