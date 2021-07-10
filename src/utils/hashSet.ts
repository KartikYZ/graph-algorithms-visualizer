import { Hashable } from './hashable'
import HashMap from './hashMap';

/**
 * HashSet based on the Java Implementation of the same
 */
export default class HashSet<E extends Hashable> {
    private static readonly PRESENT: Object = {};
    private map: HashMap<E, Object>;
    
    constructor() {
        this.map = new HashMap();
    }

    public add(data: E): void {
        this.map.put(data, HashSet.PRESENT);
    }

    public remove(data: E) {
      return this.map.remove(data);
    }

    public get(data: E): E | null {    // get reference contained within set.
        return this.map.getKey(data);
    }

    public contains(data: E): boolean {
        return this.map.containsKey(data);
    }

    public getSet(): E[] {
        return this.map.keySet();
    }

    getSize(): number {
        return this.map.getSize();
    }

    clear(): void {
        this.map = new HashMap();
    }

    toString(): string {
        return this.getSet().toString();
    }
}