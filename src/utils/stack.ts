
class Stack<T> {
    private arr: T[];

    constructor() {
        this.arr = [];
    }

    public push(data: T): void {
        this.arr.push(data);
    }

    public pop(): T {
        let removed  = this.arr.pop();
        if (removed) {
            return removed;
        } else {
            throw new Error('Underflow.');
        }
    }

    public isEmpty(): boolean {
        return this.arr.length === 0;
    }
}

export default Stack;