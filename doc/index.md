# babel原理

## 1.es6转es5基本流程

```
es代码

ast（抽象语法树）   // 对应babel的@babel/parser
	词法分析  
	语法分析	
	转换成es6树

es6树转换成es5 // 对应babel的babel-traverse去调用各种目标类型的插件进行转化比如@babel/preset-env/plugin-transform

根据ast反转成标准es5  // @babel/generator

```

## 2. ast

```
es6转ast
https://astexplorer.net/
es6节点转es5节点
https://www.babeljs.cn/docs/babel-plugin-transform-arrow-functions
在线demo：
https://www.babeljs.cn/repl

原理：
https://cloud.tencent.com/developer/article/2365526
```

### 3.generate

```
https://www.babeljs.cn/docs/babel-generator


```

### 4.总结

```
babel能够做
语法转换，API 转换，通过自定义插件理论上可以支持自定义的语法编译成标准语法。
```

