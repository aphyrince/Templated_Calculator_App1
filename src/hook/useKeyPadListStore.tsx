import { create } from 'zustand';

interface KeyPadsStore {
    KeyPads: KeyPad_Type[];
    addKeyPad: (newKeyPad: KeyPad_Ing_Type) => void;
    deleteKeyPad: (id: string) => void;
    updateKeyPad: (updatedKeyPad: KeyPad_Type) => void;
    moveKeyPad: (id: string, order: number) => void;
    addKey: (newKey: Key_Ing_Type) => void;
    deleteKey: (padId: string, keyId: string) => void;
    updateKey: (padId: string, updatedKey: Key_Type) => void;
    moveKey: (padId: string, order: number) => void;
}
const useKeyPadsStore = create<KeyPadsStore>()((set) => ({
    KeyPads: [],
    addKeyPad: (newKeyPadNoId: KeyPad_Ing_Type) => {
        const id = new Date().toDateString() + Math.random() * 1000 + '_KeyPad';
        const newKeyPad: KeyPad_Type = { id, ...newKeyPadNoId };
        set((s) => ({ KeyPads: [...s.KeyPads, newKeyPad] }));
    },
    deleteKeyPad: (id: string) => {
        set((s) => ({ KeyPads: [...s.KeyPads.filter((keyPad) => keyPad.id !== id)] }));
    },
    moveKeyPad: (id: string, order: number) => {
        set((s) => {
            const prevOrder = s.KeyPads.findIndex((keyPad) => keyPad.id === id);
            const target = s.KeyPads[prevOrder];
            const targetDeletedList = [...s.KeyPads.filter((keyPad) => keyPad.id !== id)];
            const frontList = targetDeletedList.slice(0, order);
            const backList = targetDeletedList.slice(order);
            const resultList = [...frontList, target, ...backList];
            return { KeyPads: resultList };
        });
    },
}));

export default useKeyPadsStore;
