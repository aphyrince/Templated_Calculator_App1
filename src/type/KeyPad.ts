import Key from './Key';

export default interface KeyPad {
    id: string;
    title: string;
    keys: Key[];
    order?: number;
    color?: string;
}
