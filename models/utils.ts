export declare type PickWithPartial<T, K extends keyof T> = Pick<T, K> & Partial<T>

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
