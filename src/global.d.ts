interface KeyPadList_Type {
    id: string;
    title: string;
    //순서
    order?: number;
    keyPads: KeyPad[];
}

interface KeyPad_Type {
    id: string;
    title: string;
    keys: Key[];
    order?: number;
    color?: string;
}

interface Key_Type {
    id: string;
    title: string;
    value: number;
    isFunc: 'Constant' | 'Formula' | 'Function';
    args?: number[];
    expression?: string;
    color?: string;
    order?: number;
}
