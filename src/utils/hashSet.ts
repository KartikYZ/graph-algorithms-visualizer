import Hashable from "./hashable";

export default class HashSet<T extends Hashable> {  // implemented as a list for now.

    private set: T[];
    private size: number;

    constructor() {
        this.set = new Array<T>();
        this.size = 0;
    }

    add(obj: T): void {
        this.set.push(obj);
        this.size++;
    }

    remove(obj: T): void {
        let index = -1;
        for (let i = 0; i < this.set.length; i++) {
            if (obj.equals(this.set[i])) {
                index = i;
                break;
            }
        }
        this.set.splice(index, 1);
        this.size--;
    }

    contains(obj: T): boolean {
        for (let i = 0; i < this.set.length; i++) {
            if (obj.equals(this.set[i])) {
                return true;
            }
        }
        return false;
    }

    getSet(): T[] {     // replace with an iterator.
        return this.set;
    }

    getSize(): number {
        return this.size
    }

    clear(): void {
        this.set = [];
        this.size = 0;
    }

    toString(): string {
        return '';
    }
}

// property equals does not exist on type T. Change any to T.