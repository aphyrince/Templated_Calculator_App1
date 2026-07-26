const keys: Key_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    id: crypto.randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum: KeyPad_Type = {
    name: 'standard numbers',
    keys,
    id: crypto.randomUUID(),
};

export { stdNum };
