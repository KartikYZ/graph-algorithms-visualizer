import { Hashable, Equatable } from "./hashable";

export default class HashMap<K extends Hashable, V extends Equatable> {

    private table: MapEntry<K, V>[];
    private size: number;
    private length: number;

    public static readonly INITIAL_CAPACITY = 13;
    public static readonly MAX_LOAD_FACTOR = 0.75;

    constructor() {
        this.table = new Array<MapEntry<K, V>>(HashMap.INITIAL_CAPACITY);
        this.length = HashMap.INITIAL_CAPACITY;
        this.size = 0;
    }

    public put(key: K, value: V): V | null {
        // exceptions
        if (key == null) {
            throw new Error("Key is null.");
        } else if (value == null) {
            throw new Error("Value is null.");
        }

        // load factor check
        if ((this.size + 1) / (this.length) > HashMap.MAX_LOAD_FACTOR) {
            this.resizeBackingTable(2 * this.length + 1);
        }

        // index corresponding to key in the table
        let index: number = this.hashAndCompression(key);
        let current: MapEntry<K, V> | null = this.table[index];

        // duplicate check
        while (current != null && !current.getKey().equals(key)) {
            current = current.getNext();
        }

        // current == null <-> unique entry
        if (current == null) {
            this.table[index] = new MapEntry<K, V>(key, value, this.table[index]);
            this.size++;
            return null;
        }
        // current != null <-> duplicate entry
        let oldValue: V = current.getValue();
        current.setValue(value);
        return oldValue;
    }

    public clear(): void {
        this.table = new Array<MapEntry<K, V>>(HashMap.INITIAL_CAPACITY);
        this.length = HashMap.INITIAL_CAPACITY;
        this.size = 0;
    }

    private resizeBackingTable(length: number): void {
        if (length < this.size) {
            throw new Error(`Length: ${length} is less than current size of hash map.`);
        }

        // if length == table.length, new table will remain unchanged after 'resize'.
        if (length === this.length) {
            return;
        }

        // initialize new array.
        let oldTable: MapEntry<K, V>[] = this.table;
        this.table = new Array<MapEntry<K, V>>(length);
        this.length = length;
        let counter = 0;

        // hash and compress elements iteratively and add to new array.
        for (let head of oldTable) {
            if (head) {
                let current: MapEntry<K, V> | null = head;
                
                while (current) {
                    let key: K = current.getKey();
                    let value: V = current.getValue();
                    let index = this.hashAndCompression(key);
                    this.table[index] = new MapEntry<K, V>(key, value, this.table[index]);
                    counter++;
                    current = current.getNext();
                }
            }

            if (counter === this.size) {
                return;
            }
        }
    }


    private hashAndCompression(key: K): number {
        return Math.abs(key.hashCode() % this.length);
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
 class MapEntry<K extends Hashable, V extends Equatable> {

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

    public equals(obj: object): boolean {
        // DO NOT USE THIS METHOD IN YOUR CODE! This is for testing ONLY!
        if (!(obj instanceof MapEntry)) {
            return false;
        } else {
            let that: MapEntry<K, V> = obj as MapEntry<K, V>;
            return that.getKey().equals(this.key) && that.getValue().equals(this.value);
        }
    }
}