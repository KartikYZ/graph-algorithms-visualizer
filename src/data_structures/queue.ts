export default class Queue<T> {
    private arr: T[];
    
    constructor() {
        this.arr = [];
    }

    enqueue(element: T): void {	
        this.arr.push(element);
    }

    dequeue(): T {    
        let first = this.arr.shift();
        if (first) {
            return first;
        } else {
            throw new Error("Underflow.");
        }
    }

    peekFirst(): T | null {
        if(this.isEmpty()) {
            return null;
        }
        return this.arr[0];
    }

    isEmpty(): boolean {
        return this.arr.length === 0;
    }

}