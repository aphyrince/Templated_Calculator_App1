import { create } from 'zustand';
import { calcPosFromIdx } from '../component/keyPadEditor/calcPosFromIdx';

interface GridStore {
    items: GridItem[];
    draggingIdx: number | null;
    gapIdx: number | null;
    setItems: (items: GridItem[]) => void;
    setDraggingIdx: (idx: number | null) => void;
    setGapIdx: (idx: number | null) => void;
    moveItem: (from: number, to: number, meta: GridMeta) => void;
}

const useGridStore = create<GridStore>()((set) => ({
    items: [],
    draggingIdx: null,
    gapIdx: null,
    setItems: (items) => set({ items }),
    setDraggingIdx: (idx: number | null) => set({ draggingIdx: idx }),
    setGapIdx: (idx: number | null) => set({ gapIdx: idx }),
    moveItem: (from: number, to: number, meta: GridMeta) => {
        const prevItems = useGridStore.getState().items;
        const tmpItem = prevItems[from];
        const deletedItems = prevItems.filter((item) => item.id !== tmpItem.id);

        const movedItems = [...deletedItems.slice(0, to), tmpItem, ...deletedItems.slice(to)].map((item, idx) => ({
            ...item,
            idx,
            ...calcPosFromIdx(idx, meta),
        }));

        set({ items: movedItems });
    },
}));

export default useGridStore;
