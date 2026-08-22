import { randomUUID } from 'expo-crypto';
import { create } from 'zustand';
import calculate from '../utils/calculate';
import { isBlankType } from '../utils/isBlankType';
import { isFullFuncBlank } from '../utils/isFullFuncBlank';
import { isFuncToken } from '../utils/isFuncToken';

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
    store.setState((s) => ({ cursor: { ...s.cursor, currIdx: idx } }));
};

export const insertToken = (value: Token['value'], to?: number) => {
    const prevTokens = store.getState().tokens;

    if (
        prevTokens.length > 0 &&
        isFuncToken(prevTokens[prevTokens.length - 1]) &&
        !isFullFuncBlank(prevTokens[prevTokens.length - 1])
    ) {
        insertToFuncBlank(value);
        return;
    }

    const idx = to === undefined ? store.getState().cursor.currIdx : to;
    const id = randomUUID();
    const token: Token = {
        id,
        idx,
        value,
    };
    const nextTokens = [...prevTokens.slice(0, idx), token, ...prevTokens.slice(idx)];
    const nextCursorIdx = idx + 1;

    setTokens(nextTokens);
    setCursorIdx(nextCursorIdx);
};

export const insertToFuncBlank = (value: Token['value']) => {
    if (typeof value !== 'number') return;

    const prevTokens = store.getState().tokens;
    const funcToken = prevTokens[prevTokens.length - 1];

    if (!funcToken.blankIdxs || !funcToken.funcExps) return;

    for (const blankIdx of funcToken.blankIdxs) {
        if (isBlankType(funcToken.funcExps[blankIdx]) && funcToken.funcExps[blankIdx].value === null) {
            funcToken.funcExps[blankIdx].value = value;
            break;
        }
    }

    const nextTokens = [...prevTokens.slice(0, -1), { ...funcToken, id: randomUUID() }];
    setTokens(nextTokens);

    if (isFullFuncBlank(funcToken)) {
        setCursorIdx(prevTokens.length);
    }
};

export const insertFuncToken = (funcExps: FuncExp[], name: string, to?: number) => {
    const idx = to === undefined ? store.getState().cursor.currIdx : to;

    const blankIdxs: number[] = [];
    funcExps.forEach((exp, idx) => {
        if (isBlankType(exp)) blankIdxs.push(idx);
    });
    const funcToken: Token = {
        id: randomUUID(),
        idx,
        value: 'Function',
        name,
        funcName: name,
        blankIdxs,
        funcExps,
    };

    const prevTokens = store.getState().tokens;
    const nextTokens = [...prevTokens.slice(0, idx), funcToken, ...prevTokens.slice(idx)];

    if (blankIdxs.length === 0) {
        const nextCursorIdx = idx + 1;
        setCursorIdx(nextCursorIdx);
    }

    setTokens(nextTokens);
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
