export default interface Key {
    id: string;
    title: string;
    value: number;
    isFunc: 'Constant' | 'Formula' | 'Function';
    args?: number[];
    expression?: string;
    color?: string;
    order?: number;
}
