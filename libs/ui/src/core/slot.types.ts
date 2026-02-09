export type TngSlotValue = string | string[] | null | undefined;
export type TngSlotMap<S extends string> = Partial<Record<S, TngSlotValue>>;
