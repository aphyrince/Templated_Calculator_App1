import { create } from 'zustand';
import { basicKeyPad2 } from '../data/basicKeyPad';

interface KeyPadsState {
    keyPads: KeyPad[];
    selectedKeyPad: KeyPad | null;
    editorKeyPad: KeyPad | null;
    editorKeyItem: KeyItem | null;
}

const initialState: KeyPadsState = {
    keyPads: [basicKeyPad2],
    selectedKeyPad: null,
    editorKeyPad: null,
    editorKeyItem: null,
};

export const useKeyPadsStore = create<KeyPadsState>()(() => ({
    ...initialState,
}));

const store = useKeyPadsStore;

export const resetKeyPads = () => {
    store.setState(initialState);
};

export const setKeyPads = (keyPads: KeyPad[]) => {
    store.setState({ keyPads });
};

export const addKeyPad = (keyPad: KeyPad) => {
    store.setState((s) => ({ keyPads: [...s.keyPads, keyPad] }));
};

export const deleteKeyPad = (id: string) => {
    const prevKeyPads = store.getState().keyPads;
    const nextKeyPads = [...prevKeyPads.filter((keyPad) => keyPad.id !== id)];
    store.setState({ keyPads: nextKeyPads });
};

export const updateKeyPad = (id: string, data: Partial<KeyPad>) => {
    const prevKeyPads = store.getState().keyPads;
    const nextKeyPads = [...prevKeyPads.map((keyPad) => (keyPad.id === id ? { ...keyPad, ...data } : keyPad))];
    store.setState({ keyPads: nextKeyPads });
};

export const moveKeyPad = (id: string, to: number) => {
    const prevKeypads = store.getState().keyPads;
    const from = prevKeypads.findIndex((keyPad) => keyPad.id === id);
    const targetKeyPad = prevKeypads[from];
    const targetRemovedKeyPads = prevKeypads.filter((keyPad) => keyPad.id !== id);

    if (to > from) to--;

    const nextKeyPads = [...targetRemovedKeyPads.slice(0, to), targetKeyPad, ...targetRemovedKeyPads.slice(to)];
    store.setState({ keyPads: nextKeyPads });
};

export const addKeyItem = (keyItem: KeyItem) => {
    const prevKeyPads = store.getState().keyPads;
    const targetKeyPad = prevKeyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
    const nextItems: KeyItem[] = [...targetKeyPad.items, keyItem];
    updateKeyPad(keyItem.padId, { items: nextItems });
};

export const deleteKey = (keyItem: KeyItem) => {
    const prevKeyPads = store.getState().keyPads;
    const targetKeyPad = prevKeyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
    const nextItems: KeyItem[] = targetKeyPad.items.filter((item) => item.id !== keyItem.id);
    updateKeyPad(keyItem.padId, { items: nextItems });
};

export const updateKey = (keyItem: KeyItem, data: Partial<KeyItem>) => {
    const prevKeyPads = store.getState().keyPads;
    const targetKeyPad = prevKeyPads.find((keyPad) => keyPad.id === keyItem.padId) as KeyPad;
    const nextItems = targetKeyPad.items.map((item) => (item.id === keyItem.id ? { ...item, ...data } : item));
    updateKeyPad(keyItem.padId, { items: nextItems });
};

export const moveKey = (keyItem: KeyItem, to: number) => {
    const prevItems = store.getState().keyPads.find((keyPad) => keyPad.id === keyItem.padId)?.items as KeyItem[];
    const targetDeletedItems = prevItems.filter((item) => item.id !== keyItem.id);
    const nextItems = [...targetDeletedItems.slice(0, to), keyItem, ...targetDeletedItems.slice(to)];
    updateKeyPad(keyItem.padId, { items: nextItems });
};

export const setSelectedKeyPad = (keyPad: KeyPad) => {
    store.setState({ selectedKeyPad: keyPad });
};

export const setSelectedKeyPadNull = () => {
    store.setState({ selectedKeyPad: null });
};

export const setEditorKeyPad = (keyPad: KeyPad | null) => {
    store.setState({ editorKeyPad: keyPad });
};

export const setEditorKeyItem = (keyItem: KeyItem | null) => {
    store.setState({ editorKeyItem: keyItem });
};
