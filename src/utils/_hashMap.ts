import Hashable from './hashable';

/**
 * Your implementation of a HashMap.
 *
 * @author KARTIK SINHA
 * @version 1.0
 * @userid ksinha45
 * @GTID 903598988
 *
 * Collaborators: None
 *
 * Resources: None
 */
export default class HashMap<K, V> {

    /*
     * The initial capacity of the HashMap when created with the
     * default constructor.
     *
     * DO NOT MODIFY THIS VARIABLE!
     */
    public static readonly INITIAL_CAPACITY: number = 13;

    /*
     * The max load factor of the HashMap.
     *
     * DO NOT MODIFY THIS VARIABLE!
     */
    public static readonly MAX_LOAD_FACTOR: number = 0.67;

    /*
     * Do not add new instance variables or modify existing ones.
     */
    private table: MapEntry<K, V>[];
    private size: number;

    /**
     * Constructs a new HashMap.
     *
     * The backing array should have an initial capacity of initialCapacity.
     *
     * You may assume initialCapacity will always be positive.
     *
     * @param initialCapacity the initial capacity of the backing array
     */
    constructor(initialCapacity: number) {
        this.table = new Array<MapEntry<K, V>>(initialCapacity);
        this.size = 0;
    }

    /**
     * Adds the given key-value pair to the map. If an entry in the map
     * already has this key, replace the entry's value with the new one
     * passed in.
     *
     * In the case of a collision, use external chaining as your resolution
     * strategy. Add new entries to the front of an existing chain, but don't
     * forget to check the entire chain for duplicate keys first.
     *
     * If you find a duplicate key, then replace the entry's value with the new
     * one passed in. When replacing the old value, replace it at that position
     * in the chain, not by creating a new entry and adding it to the front.
     *
     * Before actually adding any data to the HashMap, you should check to
     * see if the array would violate the max load factor if the data was
     * added. Resize if the load factor (LF) is greater than max LF (it is okay
     * if the load factor is equal to max LF). For example, let's say the
     * array is of length 5 and the current size is 3 (LF = 0.6). For this
     * example, assume that no elements are removed in between steps. If
     * another entry is attempted to be added, before doing anything else,
     * you should check whether (3 + 1) / 5 = 0.8 is larger than the max LF.
     * It is, so you would trigger a resize before you even attempt to add
     * the data or figure out if it's a duplicate. Be careful to consider the
     * differences between integer and double division when calculating load
     * factor.
     *
     * When regrowing, resize the length of the backing table to
     * (2 * old length) + 1. You must use the resizeBackingTable method to do so.
     *
     * Return null if the key was not already in the map. If it was in the map,
     * return the old value associated with it.
     *
     * @param key   the key to add
     * @param value the value to add
     * @return null if the key was not already in the map. If it was in the
     * map, return the old value associated with it
     * @throws java.lang.IllegalArgumentException if key or value is null
     */
    public put(key: K, value: V): V {
        // exceptions
        if (key == null) {
            throw new Error("Given key is null. Provide a non-null key.");
        } else if (value == null) {
            throw new Error("Given value is null. Provide a non-null value.");
        }

        // load factor check
        if ((this.size + 1) / (this.table) > MAX_LOAD_FACTOR) {
            this.resizeBackingTable(2 * table.length + 1);
        }

        // index corresponding to key in the table
        let index: number = this.hashAndCompression(key);
        let current:  MapEntry<K, V>  = this.table[index];

        // duplicate check
        while (current != null && !current.getKey().equals(key)) {
            current = current.getNext();
        }

        // current == null <-> unique entry
        if (current == null) {
            table[index] = new MapEntry<K, V>(key, value, table[index]);
            size++;
            return null;
        }
        // current != null <-> duplicate entry
        V oldValue = current.getValue();
        current.setValue(value);
        return oldValue;
    }

    /**
     * Removes the entry with a matching key from the map.
     *
     * @param key the key to remove
     * @return the value associated with the key
     * @throws java.lang.IllegalArgumentException if key is null
     * @throws java.util.NoSuchElementException   if the key is not in the map
     */
    public V remove(K key) {
        if (key == null) {
            throw new IllegalArgumentException("Given key is null. Provide a non-null key.");
        }
        int index = hashAndCompression(key);
        MapEntry<K, V> current = table[index];

        V toRemove = null;
        if (current.getKey().equals(key)) {
            toRemove = current.getValue();
            table[index] = current.getNext();
            size--;
        }
        while (current.getNext() != null) {
            if (current.getNext().getKey().equals(key)) {
                toRemove = current.getNext().getValue();
                current.setNext(current.getNext().getNext());
                size--;
            }
            current = current.getNext();
        }

        if (toRemove == null) {
            throw new NoSuchElementException("Key: " + key + " not in map.");
        }
        return toRemove;
    }

    /**
     * Gets the value associated with the given key.
     *
     * @param key the key to search for in the map
     * @return the value associated with the given key
     * @throws java.lang.IllegalArgumentException if key is null
     * @throws java.util.NoSuchElementException   if the key is not in the map
     */
    public V get(K key) {
        if (key == null) {
            throw new IllegalArgumentException("Key is null. Provide a non-null key.");
        }
        int index = hashAndCompression(key);
        MapEntry<K, V> current = table[index];
        while (current != null) {
            if (current.getKey().equals(key)) {
                return current.getValue();
            }
            current = current.getNext();
        }
        throw new NoSuchElementException("Key: " + key + " not in map.");
    }

    /**
     * Returns whether or not the key is in the map.
     *
     * @param key the key to search for in the map
     * @return true if the key is contained within the map, false
     * otherwise
     * @throws java.lang.IllegalArgumentException if key is null
     */
    public boolean containsKey(K key) {
        if (key == null) {
            throw new IllegalArgumentException("Key is null. Provide a non-null key.");
        }
        int index = hashAndCompression(key);
        MapEntry<K, V> current = table[index];
        while (current != null) {
            if (current.getKey().equals(key)) {
                return true;
            }
            current = current.getNext();
        }
        return false;
    }

    /**
     * Returns a Set view of the keys contained in this map.
     *
     * Use java.util.HashSet.
     *
     * @return the set of keys in this map
     */
    public Set<K> keySet() {
        HashSet<K> keys = new HashSet<>();
        for (MapEntry<K, V> entry: table) {
            if (entry != null) {
                MapEntry<K, V> current = entry;
                while (current != null) {
                    keys.add(current.getKey());
                    current = current.getNext();
                }
            }
            // break on keys.size() == size
            if (keys.size() == size) {
                break;      // prevents traversal of additional null values in table base array.
            }
        }
        return keys;
    }

    /**
     * Returns a List view of the values contained in this map.
     *
     * Use java.util.ArrayList or java.util.LinkedList.
     *
     * You should iterate over the table in order of increasing index and add
     * entries to the List in the order in which they are traversed.
     *
     * @return list of values in this map
     */
    public List<V> values() {
        ArrayList<V> values = new ArrayList<>(size);
        for (MapEntry<K, V> entry: table) {
            if (entry != null) {
                MapEntry<K, V> current = entry;
                while (current != null) {
                    values.add(current.getValue());
                    current = current.getNext();
                }
            }
            if (values.size() == size) {
                break;      // prevents traversal of additional null values in table base array.
            }
        }
        return values;
    }

    /**
     * Resize the backing table to length.
     *
     * Disregard the load factor for this method. So, if the passed in length is
     * smaller than the current capacity, and this new length causes the table's
     * load factor to exceed MAX_LOAD_FACTOR, you should still resize the table
     * to the specified length and leave it at that capacity.
     *
     * You should iterate over the old table in order of increasing index and
     * add entries to the new table in the order in which they are traversed.
     *
     * Since resizing the backing table is working with the non-duplicate
     * data already in the table, you shouldn't explicitly check for
     * duplicates.
     *
     * Hint: You cannot just simply copy the entries over to the new array.
     *
     * @param length new length of the backing table
     * @throws java.lang.IllegalArgumentException if length is less than the
     *                                            number of items in the hash
     *                                            map
     */
    public void resizeBackingTable(int length) {
        if (length < size) {
            throw new IllegalArgumentException("Length: " + length + " is less than current size of hash map.");
        }

        // if length == table.length, new table will remain unchanged after 'resize'.
        if (length == table.length) {
            return;
        }

        // initialize new array.
        MapEntry<K, V>[] oldTable = table;
        table = new MapEntry[length];
        int counter = 0;

        // hash and compress elements iteratively and add to new array.
        for (MapEntry<K, V> head: oldTable) {
            if (head != null) {
                MapEntry<K, V> current = head;
                while (current != null) {
                    K key = current.getKey();
                    V value = current.getValue();
                    int index = hashAndCompression(key);
                    table[index] = new MapEntry<K, V>(key, value, table[index]);
                    counter++;
                    current = current.getNext();
                }
            }
            if (counter == size) {
                return;
            }
        }
    }

    /**
     * Clears the map.
     *
     * Resets the table to a new array of the initial capacity and resets the
     * size.
     */
    public void clear() {
        table = new MapEntry[INITIAL_CAPACITY];
        size = 0;
    }

    /**
     * Private helper that performs hash and compression on the given key.
     * @param key The key to be hashed and compressed.
     * @return the index corresponding to the key for the backing table array.
     */
    private int hashAndCompression(K key) {
        return Math.abs(key.hashCode() % this.table.length);
    }

    /**
     * Returns the table of the map.
     *
     * For grading purposes only. You shouldn't need to use this method since
     * you have direct access to the variable.
     *
     * @return the table of the map
     */
    public getTable(): MapEntry<K, V>[] {
        // DO NOT MODIFY THIS METHOD!
        return this.table;
    }

    /**
     * Returns the size of the map.
     *
     * For grading purposes only. You shouldn't need to use this method since
     * you have direct access to the variable.
     *
     * @return the size of the map
     */
    public getSize(): number {
        // DO NOT MODIFY THIS METHOD!
        return this.size;
    }
}

/**
 * Map entry class used for implementing the ExternalChainingHshMap.
 *
 * DO NOT MODIFY THIS FILE!!
 *
 * @author CS 1332 TAs
 * @version 1.0
 */
class MapEntry<K extends Hashable, V extends Hashable> {

    private key: K;
    private value: V;
    private next: MapEntry<K, V> | null;

    /**
     * Constructs a new MapEntry with the given key, value, and next reference.
     *
     * @param key   the key in the new entry
     * @param value the value in the new entry
     * @param next  the next entry in the external chain
     */
    constructor(key: K, value: V, next: MapEntry<K, V> | null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }

    /**
     * Gets the key.
     *
     * @return the key
     */
    public getKey(): K {
        return this.key;
    }

    /**
     * Gets the value.
     *
     * @return the value
     */
    public getValue(): V {
        return this.value;
    }

    /**
     * Gets the next entry.
     *
     * @return the next entry
     */
    public getNext(): MapEntry<K, V> | null {
        return this.next;
    }

    /**
     * Sets the key.
     *
     * @param key the new key
     */
    public setKey(key: K): void {
        this.key = key;
    }

    /**
     * Sets the value.
     *
     * @param value the new value
     */
    public setValue(value: V): void {
        this.value = value;
    }

    /**
     * Sets the next entry.
     *
     * @param next the new next entry
     */
    public setNext(next: MapEntry<K, V> | null): void {
        this.next = next;
    }

    public toString(): string {
        let key: string = this.key == null ? "null" : this.key.toString();
        let value: string = this.value == null ? "null" : this.value.toString();
        return `(${key}, ${value})`;
    }

    public equals(o: object): boolean {
        // DO NOT USE THIS METHOD IN YOUR CODE! This is for testing ONLY!
        if (!(o instanceof MapEntry)) {
            return false;
        } else {
            let that: MapEntry<K, V> = <MapEntry<K, V>> o;
            return that.getKey().equals(this.key) && that.getValue().equals(this.value);
        }
    }
}