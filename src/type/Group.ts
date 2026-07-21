import KeyPad from './KeyPad';

export default interface Group {
    id: string;
    title: string;
    //순서
    order?: number;
    keyPads: KeyPad[];
}
