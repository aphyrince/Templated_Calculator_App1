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
    value: number;
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

type Expression = (number | string | 'blank')[];
