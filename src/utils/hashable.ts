export interface Hashable extends Equatable {
    hashCode: () => number;
}

export interface Equatable {
    equals: (obj: Object) => boolean;
}

export interface Comparable {
    compareTo: (obj: Object) => number;
}