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
