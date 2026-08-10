import { randomUUID } from 'expo-crypto';

const basicPadId = randomUUID();

const basicKeys: Key_Type[] = [
    { padId: basicPadId, id: randomUUID(), title: '7', value: 7, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '8', value: 8, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '9', value: 9, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '/', value: '/', type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '4', value: 4, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '5', value: 5, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '6', value: 6, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '*', value: '*', type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '1', value: 1, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '2', value: 2, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '3', value: 3, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '-', value: '-', type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '0', value: 0, type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '.', value: '.', type: 'Constant' },
    { padId: basicPadId, id: randomUUID(), title: '+', value: '+', type: 'Constant' },
];

export const basicKeyPad: KeyPad_Type = {
    title: 'Basic Calculator',
    id: basicPadId,
    keys: basicKeys,
};
