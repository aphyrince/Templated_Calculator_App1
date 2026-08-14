import { create } from 'zustand';
import { basicKeyPad2 } from '../data/basicKeyPad';

interface KeyPadsState {
    keyPads: KeyPad[];
    selectedKeyPad: KeyPad | null;
}

const initialState: KeyPadsState = {
    keyPads: [basicKeyPad2],
    selectedKeyPad: null,
};

export const useKeyPadsStore2 = create<KeyPadsState>()(() => ({
    ...initialState,
}));

const store = useKeyPadsStore2;

export const resetKeyPads = () => {
    store.setState(initialState);
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
