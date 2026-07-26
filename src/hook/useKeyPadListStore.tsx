import { create } from 'zustand';

interface keyPadsStore {
    keyPads: KeyPad_Type[];

    addKeyPad: (newKeyPad: KeyPad_Ing_Type) => void;
    deleteKeyPad: (id: string) => void;
    updateKeyPad: (id: string, data: Partial<KeyPad_Type>) => void;
    moveKeyPad: (id: string, to: number) => void;

    addKey: (padId: string, newKeyNoId: Key_Ing_Type) => void;
    deleteKey: (padId: string, keyId: string) => void;
    updateKey: (padId: string, keyId: string, data: Partial<Key_Type>) => void;
    moveKey: (padId: string, keyId: string, to: number) => void;
}

const usekeyPadsStore = create<keyPadsStore>()((set) => ({
    keyPads: [],

    addKeyPad: (newKeyPadNoId: KeyPad_Ing_Type) => {
        const id = crypto.randomUUID();
        const newKeyPad: KeyPad_Type = { id, ...newKeyPadNoId };
        set((s) => ({ keyPads: [...s.keyPads, newKeyPad] }));
    },

    deleteKeyPad: (id: string) => {
        set((s) => ({ keyPads: [...s.keyPads.filter((keyPad) => keyPad.id !== id)] }));
    },

    updateKeyPad: (id: string, data: Partial<KeyPad_Type>) => {
        set((s) => ({
            keyPads: [...s.keyPads.map((keyPad) => (keyPad.id === id ? { ...keyPad, ...data } : keyPad))],
        }));
    },

    moveKeyPad: (id: string, to: number) => {
        set((s) => {
            const from = s.keyPads.findIndex((keyPad) => keyPad.id === id);
            const target = s.keyPads[from];
            const targetDeletedList = [...s.keyPads.filter((keyPad) => keyPad.id !== id)];
            // 타겟을 뺐으니
            if (to > from) to -= 1;
            const frontList = targetDeletedList.slice(0, to);
            const backList = targetDeletedList.slice(to);
            const resultList = [...frontList, target, ...backList];
            return { keyPads: resultList };
        });
    },

    addKey: (padId: string, newKeyNoId: Key_Ing_Type) => {
        const id = crypto.randomUUID();
        const newKey: Key_Type = { id, ...newKeyNoId };
        set((s) => ({
            keyPads: [
                ...s.keyPads.map((keypad) =>
                    keypad.id === padId ? { ...keypad, keys: [...keypad.keys, newKey] } : keypad,
                ),
            ],
        }));
    },

    deleteKey: (padId: string, keyId: string) => {
        set((s) => ({
            keyPads: [
                ...s.keyPads.map((keypad) =>
                    keypad.id === padId
                        ? { ...keypad, keys: [...keypad.keys.filter((key) => key.id !== keyId)] }
                        : keypad,
                ),
            ],
        }));
    },

    updateKey: (padId: string, keyId: string, data: Partial<Key_Type>) => {
        set((s) => ({
            keyPads: [
                ...s.keyPads.map((keypad) =>
                    keypad.id === padId
                        ? {
                              ...keypad,
                              keys: [...keypad.keys.map((key) => (key.id === keyId ? { ...key, ...data } : key))],
                          }
                        : keypad,
                ),
            ],
        }));
    },

    moveKey: (padId: string, keyId: string, to: number) => {
        set((s) => {
            const targetKeyPad = s.keyPads.find((keypad) => keypad.id === padId);

            if (!targetKeyPad) return s;

            const from = targetKeyPad.keys.findIndex((key) => key.id === keyId);
            const targetKey = targetKeyPad.keys[from];
            const targetDeletedKeys = [...targetKeyPad.keys.filter((key) => key.id !== keyId)];
            if (to > from) to -= 1;
            const frontKeys = targetDeletedKeys.slice(0, to);
            const backKeys = targetDeletedKeys.slice(to);

            const movedKeys = [...frontKeys, targetKey, ...backKeys];

            const movedKeyPad = { ...targetKeyPad, keys: [...movedKeys] };

            return { keyPads: s.keyPads.map((keypad) => (keypad.id === padId ? { ...movedKeyPad } : keypad)) };
        });
    },
}));

export default usekeyPadsStore;
