export default class Vertex<T> {

    private position: [number, number];
    private data: T | undefined;
    private color: string; 

    constructor(position: [number, number], color: string = 'rgb(255, 255, 255, 0.8)', data?: T) {
        this.position = position;
        this.data = data;
        this.color = color;
    }

    equals(v: Object | null): boolean {
        if (!(v instanceof Vertex) || v == null) {
            return false;
        } else if (this.position[0] === v.position[0] && this.position[1] === v.position[1]) {
            return true;
        }
        return false;
    }

    getPosition(): [number, number] {
        return this.position;
    }

    getData(): T | undefined {
        return this.data;
    }
    
    toString(): string {
        return `x: ${this.position[0]}, y:${this.position[1]}`;
    }

    hashCode(): number {
        let hash = 19;
        hash = 29 * hash + this.position[0];
        return 31 * hash + this.position[1];
    }
}   