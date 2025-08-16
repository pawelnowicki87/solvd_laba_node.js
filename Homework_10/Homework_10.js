
// Homework 10 – Hash Functions and Hash Tables (JavaScript)

// PART 1: Understanding Hash Functions (Research)

// A hash function is a deterministic algorithm that maps an input
// (e.g., a string) to a fixed-size integer (a “hash code”).

// Desirable properties:
//   - Deterministic: same input → same output.
//   - Uniform distribution: spreads outputs evenly to reduce collisions.
//   - Efficiency: fast to compute (typically O(n) in input length).
//   - Low collision rate: different inputs rarely share the same hash.

// Applications:
//   - Hash tables / dictionaries / sets (O(1) average lookups).
//   - Database indexes and caches.
//   - Integrity checks (checksums) and content addressing.
//   - Cryptography (secure hashes like SHA-256).

// In a hash table, the hash code is mapped to a bucket index:
//     index = hash(key) mod capacity
// If two keys map to the same bucket (collision), we need a strategy
// to handle it (separate chaining or open addressing).
//
// In this implementation we use separate chaining.
//

// PART 2: Custom Hash Function
// We base our function on FNV-1a (simple and fast) and add extra mixing
// using bit rotation and XOR to improve distribution. This is a
// non-cryptographic function intended for hash tables.

// Rotate a 32-bit unsigned integer x left by r bits
function rotateLeft32(x, r) {
  return ((x << r) | (x >>> (32 - r))) >>> 0;
}

// Convert a string to a 32-bit unsigned integer hash code
function customStringHash(str) {
  if (typeof str !== "string") {
    throw new TypeError("customStringHash(key): key must be a string");
  }

  let hash = 0x811c9dc5; // FNV offset basis
  const FNV_PRIME = 0x01000193; // 16777619

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, FNV_PRIME) >>> 0;
    hash = rotateLeft32(hash, 13) ^ (hash >>> 7);
  }

  // Final avalanche step for better mixing
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b) >>> 0;
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35) >>> 0;
  hash ^= hash >>> 16;

  return hash >>> 0;
}

// PART 3: Hash Table Class
// Collision strategy: separate chaining with arrays of [key, value] pairs
// Resizes automatically when load factor > 0.75

class CustomHashTable {
  constructor(initialCapacity = 8, maxLoadFactor = 0.75, hashFn = customStringHash) {
    this._capacity = CustomHashTable._toPowerOfTwo(initialCapacity);
    this._buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
    this._maxLoadFactor = maxLoadFactor;
    this._hashFn = hashFn;
  }

  // Round up to the next power of two
  static _toPowerOfTwo(n) {
    let p = 1;
    while (p < n) p <<= 1;
    return p;
  }

  // Return current number of entries
  get size() {
    return this._size;
  }

  // Return current capacity
  get capacity() {
    return this._capacity;
  }

  // Return current load factor
  get loadFactor() {
    return this._size / this._capacity;
  }

  // Compute bucket index for a key
  _indexFor(key) {
    return this._hashFn(key) & (this._capacity - 1);
  }

  // Insert or update a key-value pair
  insert(key, value) {
    if (typeof key !== "string") throw new TypeError("key must be a string");

    const idx = this._indexFor(key);
    const bucket = this._buckets[idx];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // update
        return;
      }
    }

    bucket.push([key, value]); // add new pair
    this._size++;

    if (this.loadFactor > this._maxLoadFactor) {
      this._resize(this._capacity * 2);
    }
  }

  // Alias for convenience
  set(key, value) {
    this.insert(key, value);
  }

  // Retrieve value by key
  get(key) {
    const idx = this._indexFor(key);
    const bucket = this._buckets[idx];
    for (let [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }

  // Check if key exists
  has(key) {
    return this.get(key) !== undefined;
  }

  // Delete a key-value pair
  delete(key) {
    const idx = this._indexFor(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  // Resize and rehash all keys
  _resize(newCapacity) {
    const newCap = CustomHashTable._toPowerOfTwo(newCapacity);
    const newBuckets = Array.from({ length: newCap }, () => []);
    for (const bucket of this._buckets) {
      for (const [k, v] of bucket) {
        const idx = this._hashFn(k) & (newCap - 1);
        newBuckets[idx].push([k, v]);
      }
    }
    this._buckets = newBuckets;
    this._capacity = newCap;
  }
}

// PART 4: Tests

function assert(cond, msg) {
  if (!cond) throw new Error("Assertion failed: " + msg);
}

(function runTests() {
  console.log("Running tests");

  const table = new CustomHashTable(4);

  // Insert
  table.insert("apple", 1);
  table.insert("banana", 2);
  table.insert("cherry", 3);
  assert(table.get("apple") === 1, "apple should be 1");
  assert(table.get("banana") === 2, "banana should be 2");

  // Update
  table.insert("banana", 20);
  assert(table.get("banana") === 20, "banana updated to 20");

  // Delete
  assert(table.delete("apple") === true, "apple deleted");
  assert(table.get("apple") === undefined, "apple gone");

  // Collision test
  table.insert("dog", "woof");
  table.insert("god", "deity");
  console.log("dog:", table.get("dog"));
  console.log("god:", table.get("god"));

  console.log("All tests passed");
})();

// PART 5: Documentation and Analysis
// How the hash function works:
// - Based on FNV-1a, mixes each character code
// - Uses XOR, multiplication, and bit rotation
// - Finishes with avalanche step for uniformity
//
// How the hash table works:
// - Uses array of buckets, each holds [key, value] pairs
// - Bucket index = hash(key) & (capacity - 1)
// - insert: add or update, resize when load factor > 0.75
// - get: scan bucket for matching key
// - delete: remove from bucket if present
//
// Complexity:
// - Insert, get, delete: O(1) average, O(n) worst in case of many collisions
// - Resize: O(n), but happens infrequently (amortized O(1))
//
// Trade-offs:
// - Separate chaining: simple, good average performance
// - Buckets are small arrays, so even collisions are cheap
// - Open addressing could save memory, but deletions are harder
//