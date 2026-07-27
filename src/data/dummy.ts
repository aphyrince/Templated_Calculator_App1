import { randomUUID } from 'expo-crypto';

const stdNum_id = randomUUID();

const keys: Key_Ing_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    padId: stdNum_id,
    id: randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum: KeyPad_Type = {
    title: 'standard numbers',
    id: randomUUID(),
    keys,
};

const keys2: Key_Ing_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    padId: stdNum_id,
    id: randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum2: KeyPad_Type = {
    title: 'seconde numbers2',
    id: randomUUID(),
    keys: keys2,
};

export { stdNum, stdNum2 };
