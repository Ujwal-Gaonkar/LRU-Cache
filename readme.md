## LRU Cache

An LRU (Least Recently Used) Cache is a data structure that stores a limited number of items, with the least recently accessed items being removed first when the cache reaches its capacity. This is useful for optimizing the performance of systems by keeping frequently accessed data readily available.

### Key Concepts
- **Capacity**: The maximum number of items the cache can hold.
- **Eviction Policy**: The rule that determines which item to remove when the cache is full. For LRU, it removes the least recently accessed item.
- **Access Operations**: Includes adding new items, retrieving existing items, and updating the access order of items.

### Implementation
An LRU Cache can be implemented using a combination of a doubly linked list and a hash map:
- **Doubly Linked List**: Keeps track of the order of access, with the most recently accessed item at the head and the least recently accessed item at the tail.
- **Hash Map**: Provides O(1) time complexity for access operations by mapping keys to nodes in the doubly linked list.

### Example
Here is a simple example of how an LRU Cache works:
1. **Initialize**: Create an LRU Cache with a capacity of 3.
2. **Add Items**: Add items A, B, and C. The cache now contains [A, B, C].
3. **Access Item**: Access item A. The cache updates to [B, C, A].
4. **Add Item**: Add item D. Since the cache is full, it evicts the least recently accessed item (B). The cache now contains [C, A, D].

### Use Cases
- **Web Browsers**: Storing recently visited pages.
- **Databases**: Caching query results.
- **Operating Systems**: Managing memory pages.

By using an LRU Cache, systems can improve performance by reducing the time needed to access frequently used data.
