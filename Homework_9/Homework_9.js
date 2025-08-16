

//Part 1


//  Stack = like a pile of plates.
// push: put a plate on top
//  pop: remove the top plate
//  peek: just look at the top plate without removing it

class Stack {
  constructor() {
    this._data = []; // we keep elements in an array
  }
  push(x) {
    this._data.push(x);
  }
  pop() {
    return this._data.length ? this._data.pop() : null;
  }
  peek() {
    return this._data.length ? this._data[this._data.length - 1] : null;
  }
  size() {
    return this._data.length;
  }
  isEmpty() {
    return this._data.length === 0;
  }
}

// QUEUE
// Queue = like a line of people waiting.
// enqueue: a new person joins at the end
// dequeue: the first person leaves the line
//  peek: look at the first person in line

class Queue {
  constructor() {
    this._in = [];
    this._out = [];
  }
  _shiftStacks() {
    if (this._out.length === 0) {
      while (this._in.length) this._out.push(this._in.pop());
    }
  }
  enqueue(x) {
    this._in.push(x);
  }
  dequeue() {
    this._shiftStacks();
    return this._out.length ? this._out.pop() : null;
  }
  peek() {
    this._shiftStacks();
    return this._out.length ? this._out[this._out.length - 1] : null;
  }
  size() {
    return this._in.length + this._out.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

//  BINARY TREE
// Binary tree = each node can have a left child and a right child.
// Binary Search Tree rule:
// smaller values go left bigger values go right
// This makes searching faster.


class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) {
      this.root = node;
      return;
    }
    let cur = this.root;
    while (true) {
      if (val <= cur.val) {
        if (!cur.left) {
          cur.left = node;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = node;
          return;
        }
        cur = cur.right;
      }
    }
  }

  contains(val) {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return true;
      cur = val < cur.val ? cur.left : cur.right;
    }
    return false;
  }

  // Visit nodes in order: left -> node -> right
  traverseInOrder(fn, node = this.root) {
    if (!node) return;
    this.traverseInOrder(fn, node.left);
    fn(node.val);
    this.traverseInOrder(fn, node.right);
  }

  // Visit: node -> left -> right
  traversePreOrder(fn, node = this.root) {
    if (!node) return;
    fn(node.val);
    this.traversePreOrder(fn, node.left);
    this.traversePreOrder(fn, node.right);
  }

  // Visit: left -> right -> node
  traversePostOrder(fn, node = this.root) {
    if (!node) return;
    this.traversePostOrder(fn, node.left);
    this.traversePostOrder(fn, node.right);
    fn(node.val);
  }
}

// GRAPH
// Graph = points (vertices) connected by lines (edges).
// addVertex: add a point
//  addEdge: connect two points
// DFS: explore deeply first
// BFS: explore step by step

class Graph {
  constructor({ directed = false } = {}) {
    this.adj = new Map(); // adjacency list: vertex -> list of neighbors
    this.directed = directed;
  }

  addVertex(v) {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  addEdge(u, v, weight = 1) {
    this.addVertex(u);
    this.addVertex(v);
    this.adj.get(u).push({ to: v, weight });
    if (!this.directed) this.adj.get(v).push({ to: u, weight });
  }

  neighbors(v) {
    return this.adj.get(v) || [];
  }

  DFS(start) {
    const visited = new Set();
    const order = [];
    const self = this;

    (function dfs(v) {
      if (visited.has(v)) return;
      visited.add(v);
      order.push(v);
      for (const { to } of self.neighbors(v)) dfs(to);
    })(start);

    return order;
  }

  BFS(start) {
    const visited = new Set([start]);
    const q = [start];
    const order = [];
    let qi = 0;
    while (qi < q.length) {
      const v = q[qi++];
      order.push(v);
      for (const { to } of this.neighbors(v)) {
        if (!visited.has(to)) {
          visited.add(to);
          q.push(to);
        }
      }
    }
    return order;
  }
}

// LINKED LIST
// Linked list = chain of nodes.
// Each node has a value and a "next" pointer.
// insertAtHead: put new node in the front
// insertAtTail: put new node at the end
// delete: remove a node with certain value
// find: search for a value


class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtHead(val) {
    const node = new ListNode(val);
    node.next = this.head;
    this.head = node;
  }

  insertAtTail(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  delete(val) {
    if (!this.head) return false;
    if (this.head.val === val) {
      this.head = this.head.next;
      return true;
    }
    let cur = this.head;
    while (cur.next && cur.next.val !== val) cur = cur.next;
    if (cur.next) {
      cur.next = cur.next.next;
      return true;
    }
    return false;
  }

  find(val) {
    let cur = this.head;
    while (cur) {
      if (cur.val === val) return cur;
      cur = cur.next;
    }
    return null;
  }

  toArray(limit = 50) {
    const arr = [];
    let cur = this.head;
    let n = 0;
    while (cur && n < limit) {
      arr.push(cur.val);
      cur = cur.next;
      n++;
    }
    if (cur) arr.push("..."); // list is too long or has a cycle
    return arr;
  }
}

// Part 2

class MinMaxStack {
  constructor() {
    this._data = [];
    this._min = [];
    this._max = [];
  }
  push(x) {
    this._data.push(x);
    if (!this._min.length || x <= this._min[this._min.length - 1]) this._min.push(x);
    if (!this._max.length || x >= this._max[this._max.length - 1]) this._max.push(x);
  }
  pop() {
    if (!this._data.length) return null;
    const x = this._data.pop();
    if (x === this._min[this._min.length - 1]) this._min.pop();
    if (x === this._max[this._max.length - 1]) this._max.pop();
    return x;
  }
  getMin() {
    return this._min.length ? this._min[this._min.length - 1] : null;
  }
  getMax() {
    return this._max.length ? this._max[this._max.length - 1] : null;
  }
}

// Check if a tree is a BST.
// Rule: left < node, right > node

function isBST(root) {
  function check(node, min, max) {
    if (!node) return true;
    if (!(min <= node.val && node.val < max)) return false;
    return check(node.left, min, node.val) && check(node.right, node.val, max);
  }
  return check(root, -Infinity, Infinity);
}

// Detect a cycle in linked list (Floyd's "tortoise and hare").
// Two runners: slow (1 step) and fast (2 steps).
// If they meet, there is a cycle.

function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Part 3

function demo() {
  console.log(" STACK ");
  const s = new Stack();
  s.push(1); s.push(2); s.push(3);
  console.log("pop:", s.pop(), "peek:", s.peek());

  console.log("\n QUEUE ");
  const q = new Queue();
  q.enqueue("A"); q.enqueue("B"); q.enqueue("C");
  console.log("dequeue:", q.dequeue(), "peek:", q.peek());

  console.log("\n BINARY TREE ");
  const bt = new BinaryTree();
  [8, 3, 10, 1, 6].forEach(v => bt.insert(v));
  console.log("contains 6?", bt.contains(6));
  const inorder = [];
  bt.traverseInOrder(v => inorder.push(v));
  console.log("in-order:", inorder.join(", "));

  console.log("\n GRAPH ");
  const g = new Graph();
  g.addEdge("A", "B");
  g.addEdge("A", "C");
  g.addEdge("B", "D");
  console.log("DFS from A:", g.DFS("A"));
  console.log("BFS from A:", g.BFS("A"));

  console.log("\n LINKED LIST ");
  const list = new LinkedList();
  [1, 2, 3, 4].forEach(v => list.insertAtTail(v));
  console.log("list:", list.toArray());
  list.delete(3);
  console.log("after delete 3:", list.toArray());
  console.log("find 2:", list.find(2) !== null);

  console.log("\n MIN/MAX STACK");
  const ms = new MinMaxStack();
  ms.push(5); ms.push(2); ms.push(10);
  console.log("min:", ms.getMin(), "max:", ms.getMax());

  console.log("\n CYCLE DETECTION");
  const list2 = new LinkedList();
  [1, 2, 3].forEach(v => list2.insertAtTail(v));
  console.log("cycle?", hasCycle(list2.head));
}

if (require?.main === module) {
  demo();
}
