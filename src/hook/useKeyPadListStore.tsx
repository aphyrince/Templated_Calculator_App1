import { create } from 'zustand';

interface KeyPadListStore {
    KeyPadList: KeyPad_Type[];
    addKeyPad: (newKeyPad: KeyPad_Ing_Type) => void;
    deleteKeyPad: (id: string) => void;
    changeKeyPadOrder: (id: string, order: number) => void;
}
const useKeyPadListStore = create<KeyPadListStore>()((set) => ({
    KeyPadList: [],
    addKeyPad: (newKeyPadNoId: KeyPad_Ing_Type) => {
        const id = new Date().toDateString() + Math.random() * 1000 + '_KeyPad';
        const newKeyPad: KeyPad_Type = { id, ...newKeyPadNoId };
        set((s) => ({ KeyPadList: [...s.KeyPadList, newKeyPad] }));
    },
    deleteKeyPad: (id: string) => {
        set((s) => ({ KeyPadList: [...s.KeyPadList.filter((keyPad) => keyPad.id !== id)] }));
    },
    changeKeyPadOrder: (id: string, order: number) => {
        set((s) => {
            const prevOrder = s.KeyPadList.findIndex((keyPad) => keyPad.id === id);
            const target = s.KeyPadList[prevOrder];
            const targetDeletedList = [...s.KeyPadList.filter((keyPad) => keyPad.id !== id)];
            const frontList = targetDeletedList.slice(0, order);
            const backList = targetDeletedList.slice(order);
            const resultList = [...frontList, target, ...backList];
            return { KeyPadList: resultList };
        });
    },
}));

export default useKeyPadListStore;
