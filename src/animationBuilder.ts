import Vertex from './graph/vertex';
import Edge from './graph/edge';

export interface GraphAnimationFrame {
    outlineVertices?: Vertex<any>[] | null,
    redVertices?: Vertex<any>[] | null,
    redEdges?: Edge<any>[] | null,
    yellowVertices?: Vertex<any>[] | null,
    yellowEdges?: Edge<any>[] | null,
    greenVertices?: Vertex<any>[] | null,
    greenEdges?: Edge<any>[] | null
}

export class AnimationBuilder {
    private frames: GraphAnimationFrame[];

    constructor() {
        this.frames = [];
    }

    public addFrame(frame: GraphAnimationFrame) {
        this.frames.push(this.cloneFrame(frame));
    }

    public getFrames(): GraphAnimationFrame[] {
        return this.frames;
    }

    private cloneArray(arr: any[] | null | undefined): any[] | null {
        return arr ? arr.slice(0, arr.length): null;
    }

    private cloneFrame(frame: GraphAnimationFrame): GraphAnimationFrame {
        // todo: explore ways to 'object map'
        return {
            outlineVertices: this.cloneArray(frame.outlineVertices),
            redVertices: this.cloneArray(frame.redVertices),
            redEdges: this.cloneArray(frame.redEdges),
            yellowVertices: this.cloneArray(frame.yellowVertices),
            yellowEdges: this.cloneArray(frame.yellowEdges),
            greenVertices: this.cloneArray(frame.greenEdges),
            greenEdges: this.cloneArray(frame.greenEdges)
        }
    }
}