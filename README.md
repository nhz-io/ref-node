<h1 align="center">@nhz.io/ref-node</h1>

<p align="center">
  <a href="https://npmjs.org/package/@nhz.io/ref-node">
    <img src="https://img.shields.io/npm/v/@nhz.io/ref-node.svg?style=flat"
         alt="NPM Version">
  </a>

  <a href="https://www.bithound.io/github/nhz-io/ref-node">
    <img src="https://www.bithound.io/github/nhz-io/ref-node/badges/score.svg"
         alt="Bithound Status">
  </a>

  <a href="https://github.com/nhz-io/ref-node/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/nhz-io/ref-node.svg?style=flat"
         alt="License">
  </a>

  <a href="https://npmjs.org/package/@nhz.io/ref-node">
  <img src="http://img.shields.io/npm/dm/@nhz.io/ref-node.svg?style=flat"
  alt="Downloads">
  </a>  
</p>

<h3 align="center">"Value reference node" Class<h2>

## Install
```
npm i -S @nhz.io/ref-node
```

## Class: RefNode
### new RefNode(root, path)
* `root` - `{Array | Object}`
* `path` - `{Array<String | Number>}`

#### Creates a reference node for the root object at the given path.
* With root: `{a: {b: 'foo'}}` and path: `['a', 'b']`, the node will
reference `'foo'` value of the `a.b` Object   

* With root; `{a: b: [null, 'bar']}` and path: `['a', 'b', 1]`, the node
will reference `'bar'` value of the `a.b` Array at index `1`

### Properties

* `root` - Root getter/setter
* `parent` - Parent getter
* `path` -  Path getter/setter
* `key` - Key getter/setter
* `resolves` - Resolves getter

## Example

### Object key reference
```javascript

const RefNode = require('@nhz.io/ref-node')
const root = {a: {b: 'foobar'}}
const node = new RefNode(root, ['a', 'b'])
console.log(node.value) // Prints 'foobar'
node.value = 'barfoo'
console.log(root.a.b) // Prints 'barfoo'
```

### Array element reference
```javascript
const RefNode = require('@nhz.io/ref-node')
const root = {a: {b: [null, 'foobar']}}
const node = new RefNode(root, ['a', 'b', 1])
console.log(node.value) // Prints 'foobar'
node.value = 'barfoo'
console.log(root.a.b[1]) // Prints 'barfoo'
```
