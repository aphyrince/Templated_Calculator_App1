import { randomUUID } from 'expo-crypto';
import { produce } from 'immer';
import { create } from 'zustand';
import calculate from '../utils/calculate';

export interface DisplayState {
    tokens: Token[];
    cursor: Cursor;
    result: number | null;
}

const initialDisplayState: DisplayState = {
    tokens: [],
    cursor: { currIdx: 0, pos: { x: 0, y: 0, width: 0, height: 0 } },
    result: null,
};

export const useDisplayStore = create<DisplayState>()(() => ({
    ...initialDisplayState,
}));

const store = useDisplayStore;

export const resetDisplayStore = () => {
    store.setState(initialDisplayState);
};

export const setTokens = (tokens: Token[]) => {
    store.setState({ tokens });
};

export const clearTokens = () => {
    setTokens([]);
};

export const setCursorIdx = (idx: number) => {
    store.setState(produce((state: DisplayState) => (state.cursor.currIdx = idx)));
};

export const insertToken = (value: Token['value'], to?: number) => {
    const idx = to === undefined ? store.getState().cursor.currIdx : to;
    const id = randomUUID();
    const token: Token = {
        id,
        idx,
        value,
    };
    const prevTokens = store.getState().tokens;
    const nextTokens = [...prevTokens.slice(0, idx), token, ...prevTokens.slice(idx)];
    const nextCursorIdx = idx + 1;

    setTokens(nextTokens);
    setCursorIdx(nextCursorIdx);
};

// 현재 커서가 위치해 있는 곳의 토큰을 삭제함.
export const deleteToken = () => {
    const prevTokens = store.getState().tokens;
    if (prevTokens.length === 0) return;

    const prevCursorIdx = store.getState().cursor.currIdx;

    if (prevCursorIdx === 0) return;

    const nextTokens = prevTokens.filter((token) => token.id !== prevTokens[prevCursorIdx - 1].id);

    setTokens(nextTokens);
    setCursorIdx(prevCursorIdx - 1);
};

export const calculateResult = () => {
    const tokens = store.getState().tokens;
    const result = calculate(tokens);
    store.setState({ result });
};

export const setResultNull = () => {
    store.setState({ result: null });
};
