export function calcIndexFromPos(x: number, y: number, meta: GridMeta) {
    'worklet';
    x = Math.max(meta.LEFT, Math.min(x, meta.COLUMN * meta.ITEM_SIZE + meta.LEFT));

    const column = Math.floor((x - meta.LEFT) / meta.ITEM_SIZE);
    const row = Math.floor((y - meta.TOP) / meta.ITEM_SIZE);

    let index = row * meta.COLUMN + column;

    index = Math.max(0, Math.min(index, meta.ITEM_COUNT));

    return index;
}
