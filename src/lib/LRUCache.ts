export class LRUNode {
  key: number;
  value: number;
  prev: LRUNode | null;
  next: LRUNode | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LRUCache {
  private capacity: number;
  private cache: Map<number, LRUNode>;
  private head: LRUNode;
  private tail: LRUNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    
    // Initialize dummy head and tail nodes
    this.head = new LRUNode(0, 0);
    this.tail = new LRUNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private addNode(node: LRUNode) {
    node.prev = this.head;
    node.next = this.head.next;
    
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: LRUNode) {
    const prev = node.prev;
    const next = node.next;
    
    prev!.next = next;
    next!.prev = prev;
  }

  private moveToHead(node: LRUNode) {
    this.removeNode(node);
    this.addNode(node);
  }

  private popTail(): LRUNode {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }

  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) return -1;

    // Move to head (recently used)
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key);

    if (!node) {
      const newNode = new LRUNode(key, value);
      this.cache.set(key, newNode);
      this.addNode(newNode);

      if (this.cache.size > this.capacity) {
        // Remove the least recently used item
        const tail = this.popTail();
        this.cache.delete(tail.key);
      }
    } else {
      node.value = value;
      this.moveToHead(node);
    }
  }

  getState(): { key: number; value: number }[] {
    const state: { key: number; value: number }[] = [];
    let current = this.head.next;
    
    while (current !== this.tail) {
      state.push({ key: current!.key, value: current!.value });
      current = current!.next;
    }
    
    return state;
  }
}