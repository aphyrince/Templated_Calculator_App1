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
    parameters?: string[];
    expression?: Token[];
    color?: string;
    memo?: string;
}

interface GridItem {
    id: string;
    keyItem: KeyItem;
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
    value: number | string | 'Function' | null;
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

// type FuncToken = Token;

interface FuncToken extends Token {
    funcExps: (number | string | Blank)[];
}

interface Blank {
    id: string;
    idx: number;
    name: string;
    value: number;
}
