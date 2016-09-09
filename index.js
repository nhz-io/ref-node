'use strict'

const ROOT = Symbol.for('root')
const PATH = Symbol.for('path')

module.exports = class RefNode {
    constructor(root, path) {
		[this.root, this.path] = [root, path]
	}

	get root() {
		return this[ROOT]
	}

	set root(root) {
		this[ROOT] = root
	}

	get parent() {
		return this[PATH].slice(0, -1).reduce((a, k) => a[k], this[ROOT])
	}

	get path() {
		return this[PATH].slice()
	}

	set path(path) {
		this[PATH] = path.slice()
	}

	get key() {
		return this[PATH].slice(-1)[0]
	}

	set key(key) {
		this[PATH] = [...this[PATH].slice(0, -1), key]
	}

	get value() {
		return this.parent[this[PATH].slice(-1)[0]]
	}

	set value(value) {
		this.parent[this[PATH].slice(-1)[0]] = value
	}
}
