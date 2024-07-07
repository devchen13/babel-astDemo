// import traverse from "@babel/traverse";
const traverse = require("@babel/traverse").default;
const babelParser = require("@babel/parser");
const generate = require("@babel/generator").default;

const babel = require("babel-core");
// const path = require('path');
// const fs = require('fs')

// let testFilePath = path.resolve(__dirname, './test.js');
// let testFileStr = fs.readFileSync(testFilePath)
const baseStr = "var a = 'test-a';";

const arrowFun = `const vv=()=>{
    const aa=1;
    return aa
}`;

const classSimple = `class Example {}`;

const codeStr = classSimple;

const ast = babelParser.parse(codeStr);
console.log("parser------ast", ast);

traverse(ast, {
  enter(path) {
    // 变量名
    if (path.isIdentifier({ name: "aa" })) {
      path.node.name = "bb";
    }
    // 关键字
    if (path.node.kind === "const") {
      path.node.kind = "varrr";
    }
  },
});

console.log("parser------customAst", ast);

const output = generate(
  ast,
  {
    /* options */
  }
  // code
);

console.log("产出---", output);

return;
let result = babel.transform(codeStr);

console.log("转换前：" + result.code);

const transAst = (ast) => {
  let newAst = JSON.parse(JSON.stringify(ast));
  let body = newAst.program.body;
  let nodeLen = newAst.program.body.length;

  // 对应节点进行转换
  function transNode(node) {
    let nodeType = node.type;
    let transMethods = {
      VariableDeclaration: () => {
        node.kind = "const";
      },
      VariableDeclarator: () => {
        node.id.name = "b";
        node.init.value = "test-b";
      },
    };

    if (node.declarations) {
      transNode(node.declarations[0]);
    }

    if (transMethods[nodeType]) {
      transMethods[nodeType]();
    }
  }

  if (nodeLen > 0) {
    for (let nodeIdx = 0; nodeIdx < nodeLen; nodeIdx++) {
      transNode(body[nodeIdx]);
    }
  }

  return newAst;
};
console.log("ast:", result);
// console.log("ast---------:", babel.transformFromAst(result.ast));

// 将新的ast转换成代码
let code = babel.transformFromAst(transAst(result.ast)).code;

console.log("转换后：" + code);
