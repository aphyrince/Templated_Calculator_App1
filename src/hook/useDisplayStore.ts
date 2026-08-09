import { randomUUID } from 'crypto';
import { create } from 'zustand';

interface DisplayStore {
    exps: Expression[];
    blanks: (number | null)[];
    cursorIdx: number;
    setExps: (exps: Expression[]) => void;
    setCursorIdx: (idx: number) => void;
    setBlankOfIdx: (value: number | null, idx: number) => void;
    insertExp: (value: ExpValue) => void;

    excute: () => number;
}

const useDisplayStore = create<DisplayStore>()((set) => ({
    exps: [],
    blanks: [],
    cursorIdx: 0,
    setExps: (exps: Expression[]) => set({ exps }),
    setCursorIdx: (idx: number) => set({ cursorIdx: idx }),
    setBlankOfIdx: (value: number | null, idx: number) => {
        const currBlanks = useDisplayStore.getState().blanks;
        currBlanks[idx] = value;
        set({ blanks: [...currBlanks] });
    },
    insertExp: (value: ExpValue, to: number = -1) => {
        const newExp: Expression = { id: randomUUID(), value };
        if (to === -1) set((s) => ({ exps: [...s.exps, newExp] }));
        else {
            set((s) => ({ exps: [...s.exps.slice(0, to), newExp, ...s.exps.slice(to)] }));
        }
    },

    excute: () => {
        console.log('Expression Store : excute!');

        return 1;
    },
}));

export default useDisplayStore;
