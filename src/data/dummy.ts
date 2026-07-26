const keys: Key_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    id: idx.toString(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum: KeyPad_Ing_Type = {
    name: 'standard numbers',
    keys,
};
export { stdNum };
