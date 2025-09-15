export interface FuseResult<T> {
  item: T;
  refIndex: number;
  score: number;
}

export interface FuseOptions<T> {
  keys?: ReadonlyArray<keyof T | string>;
  threshold?: number;
  ignoreLocation?: boolean;
}

export default class Fuse<T> {
  constructor(list: ReadonlyArray<T>, options?: FuseOptions<T>);
  setCollection(list: ReadonlyArray<T>): void;
  search(pattern: string): Array<FuseResult<T>>;
}
