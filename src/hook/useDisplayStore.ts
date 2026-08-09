import { create } from 'zustand';

interface DisplayStore {
    expression: Expression[];
    blanks: (number | null)[];
    cursorIdx: number;
    setExpression: (expression: Expression[]) => void;
    setCursorIdx: (idx: number) => void;
    setBlankOfIdx: (value: number | null, idx: number) => void;
    excute: () => number;
}

const useDisplayStore = create<DisplayStore>()((set) => ({
    expression: [],
    blanks: [],
    cursorIdx: 0,
    setExpression: (expression: Expression[]) => set({ expression }),
    setCursorIdx: (idx: number) => set({ cursorIdx: idx }),
    setBlankOfIdx: (value: number | null, idx: number) => {
        const currBlanks = useDisplayStore.getState().blanks;
        currBlanks[idx] = value;
        set({ blanks: [...currBlanks] });
    },
    excute: () => {
        console.log('Expression Store : excute!');

        return 1;
    },
}));

export default useDisplayStore;
