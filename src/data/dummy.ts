import { randomUUID } from 'expo-crypto';

const stdNum_id = randomUUID();
const stdNum_id2 = randomUUID();

const keys: Key_Type[] = Array.from({ length: 10 }, (_, idx) => ({
    padId: stdNum_id,
    id: randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum: KeyPad_Type = {
    title: 'standard numbers',
    id: stdNum_id,
    keys,
};

const keys2: Key_Type[] = Array.from({ length: 20 }, (_, idx) => ({
    padId: stdNum_id2,
    id: randomUUID(),
    title: idx.toString(),
    value: idx,
    type: 'Constant',
}));

const stdNum2: KeyPad_Type = {
    title: 'seconde numbers2',
    id: stdNum_id2,
    keys: keys2,
};

export { stdNum, stdNum2 };
