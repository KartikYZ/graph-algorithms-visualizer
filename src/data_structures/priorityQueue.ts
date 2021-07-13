import { Comparable } from '../utils/interfaces'

class UnsortedListPriorityQueue<T extends Comparable> {
    private arr: T[];
    private size: number;
    private invertNaturalOrdering: boolean;

    constructor(arr?: T[], invertNaturalOrdering: boolean = false) {
        this.arr = arr ? arr : new Array<T>();
        this.size = arr ? arr.length : 0;
        this.invertNaturalOrdering = invertNaturalOrdering;
    }

    public getSize(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }

    public insert(data: T): void {
        this.arr.push(data);
    }

    public min(): T {
        if (this.isEmpty()) { 
            throw new Error("PQ is Empty.") 
        }

        let max: number = 0;
        for (let i = 1; i < this.arr.length; i++) {
            if ((!this.invertNaturalOrdering && this.arr[i].compareTo(this.arr[max]) > 0) || 
                (this.invertNaturalOrdering && this.arr[i].compareTo(this.arr[max]) < 0)) {
                    max = i;
            }
        }

        return this.arr[max];
    }

    public removeMin(): T {
        if (this.isEmpty()) { 
            throw new Error("PQ is Empty.") 
        }

        let max: number = 0;
        for (let i = 1; i < this.arr.length; i++) {
            if ((!this.invertNaturalOrdering && this.arr[i].compareTo(this.arr[max]) > 0) || 
                (this.invertNaturalOrdering && this.arr[i].compareTo(this.arr[max]) < 0)) {
                    max = i;
            }
        }

        return this.arr.splice(max, 1)[0];
    }
}

export default UnsortedListPriorityQueue;