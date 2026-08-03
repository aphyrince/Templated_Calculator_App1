export function calcPosFromIdx(idx: number, meta: GridMeta) {
    const x = (idx % meta.COLUMN) * meta.ITEM_SIZE;
    const y = Math.floor(idx / meta.COLUMN) * meta.ITEM_SIZE;
    return { x, y };
}
