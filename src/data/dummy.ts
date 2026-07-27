const stdNum_id = crypto.randomUUID();

const keys: Key_Ing_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    padId: stdNum_id,
    id: crypto.randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum: KeyPad_Type = {
    title: 'standard numbers',
    id: crypto.randomUUID(),
    keys,
};

const keys2: Key_Ing_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    padId: stdNum_id,
    id: crypto.randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum2: KeyPad_Type = {
    title: 'seconde numbers2',
    id: crypto.randomUUID(),
    keys: keys2,
};

export { stdNum, stdNum2 };
