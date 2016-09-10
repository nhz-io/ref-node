const t = require('assert')
const RefNode = require('./index')

t.throws(() => new RefNode(), 'Did not throw an error')
t.throws(() => new RefNode({}), 'Did not throw an error')
t.ok(new RefNode({}, []) instanceof RefNode, 'Did not create an instance')
t.throws(() => (new RefNode(null, [])).value = 1, 'Did not throw an error')

{
    const root = {}
    const node = new RefNode(root, [])
    t.equal(node.root, root, 'Wrong root')
}

{
    const root = []
    const node = new RefNode(root, [])
    t.equal(node.root, root, 'Wrong root')
}

{
    const root = {}
    const node = new RefNode({}, [])
    node.root = root
    t.equal(node.root, root, 'Wrong root')
}


{
    const root = []
    const node = new RefNode([], [])
    node.root = root
    t.equal(node.root, root, 'Wrong root')
}

{
    const parent = {}
    const root = {parent}
    const node = new RefNode(root, ['parent', 'key'])
    t.equal(node.parent, parent, 'Wrong parent')
}

{
    const parent = []
    const root = {parent}
    const node = new RefNode(root, ['parent', 0])
    t.equal(node.parent, parent, 'Wrong parent')
}

{
    const path = [0, 1, 2]
    const node = new RefNode({}, path)
    t.notEqual(node.path, path, 'Wrong path')
    t.deepEqual(node.path, path, 'Wrong path')
}

{
    const node = new RefNode([], [0])
    t.equal(node.key, 0, 'Wrong index')
    node.key = 1
    t.equal(node.key, 1, 'Returns wrong index')
    t.equal(node.path[0], 1, 'Did not update the index')
}

{
    const node = new RefNode({}, ['key'])
    t.equal(node.key, 'key', 'Wrong key')
    node.key = 'changed'
    t.equal(node.key, 'changed', 'Returns wrong key')
    t.equal(node.path[0], 'changed', 'Did not update the key')
}

{
    const root = {p: ['ok']}
    const node = new RefNode(root, ['p', 0])
    t.equal(node.value, 'ok', 'Wrong value')
    node.value = 'changed'
    t.equal(node.value, 'changed', 'Returns wrong value')
    t.equal(root.p[0], 'changed', 'Did not update the value')
}

{
    const root = {p: {n: 'ok'}}
    const node = new RefNode(root, ['p', 'n'])
    t.equal(node.value, 'ok', 'Wrong value')
    node.value = 'changed'
    t.equal(node.value, 'changed', 'Returns wrong value')
    t.equal(root.p.n, 'changed', 'Did not update the value')
}

t.ok((new RefNode({a:{b: undefined}}, ['a', 'b']).resolves), 'Does not resolve')
t.ok((new RefNode({a:[null, null]}, ['a', 0]).resolves), 'Does not resolve')
t.ok(!(new RefNode({a:{}}, ['a', 'b'])).resolves, 'Resolves')
t.ok(!(new RefNode({a:[]}, ['a', 1])).resolves, 'Resolves')
t.ok((new RefNode({a:{b:{c:null}}}, ['a', 'b', 'c'])).parent, 'Did not find the parent')
t.ok((new RefNode({a:{b:[null, null]}}, ['a', 'b', 1])).parent, 'Did not find the parent')
t.ok(!(new RefNode({a:{}}, ['a', 'b', 'c'])).parent, 'Found parent')
t.ok(!(new RefNode({a:[]}, ['a', 1, 'b'])).parent, 'Found parent')
