interface KeyPad_Ing_Type {
    title: string;
    keys: Key[];
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
