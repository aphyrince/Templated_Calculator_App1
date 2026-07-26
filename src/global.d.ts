interface KeyPad_Ing_Type {
    name: string;
    keys: Key[];
    color?: string;
}

interface KeyPad_Type extends KeyPad_Ing_Type {
    id: string;
}

interface Key_Type {
    id: string;
    title: string;
    value: number;
    type: 'Constant' | 'Formula' | 'Function';
    args?: number[];
    expression?: string;
    color?: string;
}
