const t = require('assert')
const RefNode = require('./index')

t.throws(() => new RefNode(), 'Fail mpty arguments')
t.throws(() => new RefNode({}), 'Fail missing path argument')
t.ok(new RefNode({}, []) instanceof RefNode, 'Constructor ok')
t.throws(() => (new RefNode(null, [])).value = 1, 'Fail Missing parent')

{
    const root = {}
    const node = new RefNode(root, [])
    t.equal(node.root, root, 'Get Object root')
}

{
    const root = []
    const node = new RefNode(root, [])
    t.equal(node.root, root, 'Get Array root')
}

{
    const root = {}
    const node = new RefNode({}, [])
    node.root = root
    t.equal(node.root, root, 'Set Object root')
}


{
    const root = []
    const node = new RefNode([], [])
    node.root = root
    t.equal(node.root, root, 'Set Array root')
}

{
    const parent = {}
    const root = {parent}
    const node = new RefNode(root, ['parent', 'key'])
    t.equal(node.parent, parent, 'Get Object parent')
}

{
    const parent = []
    const root = {parent}
    const node = new RefNode(root, ['parent', 0])
    t.equal(node.parent, parent, 'Get Array parent')
}

{
    const path = [0, 1, 2]
    const node = new RefNode({}, path)
    t.notEqual(node.path, path, 'Path differs')
    t.deepEqual(node.path, path, 'Path is a clone')
}

{
    const node = new RefNode([], [0])
    t.equal(node.key, 0, 'Initial array index')
    node.key = 1
    t.equal(node.key, 1, 'Updated array index')
    t.equal(node.path[0], 1, 'Update array index path entry')
}

{
    const node = new RefNode({}, ['key'])
    t.equal(node.key, 'key', 'Initial object key')
    node.key = 'changed'
    t.equal(node.key, 'changed', 'Updated object key')
    t.equal(node.path[0], 'changed', 'Updated object key path entry')
}

{
    const root = {p: ['ok']}
    const node = new RefNode(root, ['p', 0])
    t.equal(node.value, 'ok', 'Initial node value')
    node.value = 'changed'
    t.equal(node.value, 'changed', 'Updated node value')
    t.equal(root.p[0], 'changed', 'Updated parent array')
}

{
    const root = {p: {n: 'ok'}}
    const node = new RefNode(root, ['p', 'n'])
    t.equal(node.value, 'ok', 'Initial node value')
    node.value = 'changed'
    t.equal(node.value, 'changed', 'Updated node value')
    t.equal(root.p.n, 'changed', 'Updated parent object')
}
