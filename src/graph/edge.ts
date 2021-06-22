import Vertex from './vertex';

export default class Edge<T> {

    public start: Vertex<T>;
    public end: Vertex<T>;
    
    private weight: number;

    constructor(start: Vertex<T>, end: Vertex<T>, weight: number) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }

    equals(e: Edge<T>): boolean {
        if (!(e instanceof Edge) || e == null) {
            return false;
        } else if (this.start.equals(e.start) && this.end.equals(e.end)) {
            return true;
        }
        return false;
    }

    getWeight(): number {
        return this.weight;
    }

    toString(): string {
        return `start: ${this.start}, end:${this.end}`;
    }

    hash(): string {
        return this.toString();
    }
}