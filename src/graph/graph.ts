import Vertex from "./vertex";
import Edge from "./edge";

export default class Graph<T> {
    private isDirected: boolean;

    constructor(isDirected: boolean) {
        this.isDirected = isDirected;
    }
}