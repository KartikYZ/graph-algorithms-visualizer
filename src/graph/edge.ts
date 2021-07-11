import Vertex from './vertex';

export default class Edge<T> {

    public start: Vertex<T>;
    public end: Vertex<T>;
    private weight: number;
    private color: string;

    constructor(start: Vertex<T>, end: Vertex<T>, color: string, weight?: number) {
        this.start = start;
        this.end = end;
        this.color = color;
        
        if (weight) {
            this.weight = weight;
        } else {
            let p1 = this.start.getPosition();
            let p2 = this.end.getPosition();
            // todo: replace with Euclidean Distance method in Grid Component. Extract as utility method.
            this.weight = parseFloat((Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)).toFixed(1));  
        }
    }

    equals(e: Object): boolean {
        if (!(e instanceof Edge) || e == null) {
            return false;
        } else if (this.start.equals(e.start) && this.end.equals(e.end)) {
            return true;
        }
        return false;
    }

    getStart(): Vertex<T> {
        return this.start;
    }

    setStart(start: Vertex<T>): void {
        this.start = start;
    }

    getEnd(): Vertex<T> {
        return this.end;
    }

    setEnd(end: Vertex<T>): void {
        this.end = end;
    }

    getWeight(): number {
        return this.weight;
    }

    getColor(): string {
        return this.color;
    }

    setColor(color: string): void {
        this.color = color;
    }

    toString(): string {
        return `start: ${this.start}, end:${this.end}`;
    }

    hashCode(): number {
        let hash = 19;
        hash = 29 * hash + this.start.hashCode();
        return 31 * hash + this.end.hashCode();
    }
}