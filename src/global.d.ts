interface KeyPad_Ing_Type {
    title: string;
    keys: Key_Type[];
    color?: string;
    memo?: string;
}

interface KeyPad_Type extends KeyPad_Ing_Type {
    id: string;
}

interface Key_Ing_Type {
    title: string;
    value: number | string;
    type: 'Constant' | 'Formula' | 'Function';
    args?: number[];
    expression?: string;
    color?: string;
    memo?: string;
}

interface Key_Type extends Key_Ing_Type {
    id: string;
    padId: string;
}

interface KeyPad {
    id: string;
    name: string;
    items: KeyItem[];
    color?: string;
    memo?: string;
}

interface KeyItem {
    id: string;
    padId: string;
    name: string;
    value: number | string;
    type: 'Constant' | 'Function';
    color?: string;
    memo?: string;
}

interface GridItem {
    id: string;
    value: Key_Type;
    x: number;
    y: number;
    idx: number;
}

interface GridMeta {
    COLUMN: number;
    ITEM_SIZE: number;
    ITEM_BORDER: number;
    TOP: number;
    LEFT: number;
    WIDTH: number;
    HEIGHT: number;
    ITEM_COUNT: number;
}

interface Token {
    id: string;
    idx: number;
    value: number | string | 'Blank' | null;
}

interface Cursor {
    currIdx: number;
    pos: Pos;
}

interface Pos {
    x: number;
    y: number;
    width: number;
    height: number;
}
