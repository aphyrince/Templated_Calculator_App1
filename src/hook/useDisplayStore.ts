import { randomUUID } from 'expo-crypto';
import { create } from 'zustand';

interface DisplayStore {
    exps: Expression[];
    blanks: (number | null)[];
    cursorIdx: number;
    setExps: (exps: Expression[]) => void;
    setCursorIdx: (idx: number) => void;
    setBlankOfIdx: (value: number | null, idx: number) => void;
    insertExp: (value: ExpValue, to?: number) => void;
    deleteLastExp: () => void;
    clearExps: () => void;

    excute: () => number;
}

const useDisplayStore = create<DisplayStore>()((set) => ({
    exps: [],
    blanks: [],
    cursorIdx: 0,
    setExps: (exps: Expression[]) => set({ exps }),
    setCursorIdx: (idx: number) => {
        const exps = useDisplayStore.getState().exps;
        const nextIdx = Math.max(0, Math.min(idx, exps.length));
        set({ cursorIdx: nextIdx });
    },
    setBlankOfIdx: (value: number | null, idx: number) => {
        const currBlanks = useDisplayStore.getState().blanks;
        currBlanks[idx] = value;
        set({ blanks: [...currBlanks] });
    },
    insertExp: (value: ExpValue, to?: number) => {
        const id = randomUUID();
        const newExp: Expression = { id, value };
        set((s) => {
            const insertPos = to !== undefined ? to : s.cursorIdx;
            const nextExps = [...s.exps.slice(0, insertPos), newExp, ...s.exps.slice(insertPos)];
            return { exps: nextExps, cursorIdx: insertPos + 1 };
        });
    },
    deleteLastExp: () => {
        set((s) => {
            if (s.exps.length === 0) return s;
            const deleteIdx = s.cursorIdx > 0 ? s.cursorIdx - 1 : s.exps.length - 1;
            const nextExps = [...s.exps.slice(0, deleteIdx), ...s.exps.slice(deleteIdx + 1)];
            const nextCursor = Math.max(0, deleteIdx);
            return { exps: nextExps, cursorIdx: nextCursor };
        });
    },
    clearExps: () => {
        set({ exps: [], blanks: [], cursorIdx: 0 });
    },

    excute: () => {
        console.log('Expression Store : excute!');

        return 1;
    },
}));

export default useDisplayStore;
