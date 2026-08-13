import { randomUUID } from 'expo-crypto';
import { produce } from 'immer';
import { create } from 'zustand';

interface DisplayState {
    tokens: Token[];
    cursor: Cursor;
    result: number | null;
}

const initialDisplayState: DisplayState = {
    tokens: [],
    cursor: { currIdx: 0, pos: { x: 0, y: 0, width: 0, height: 0 } },
    result: null,
};

export const useDisplayStore2 = create<DisplayState>()(() => ({
    ...initialDisplayState,
}));

const store = useDisplayStore2;

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

    let idx = store.getState().cursor.currIdx;

    // 현재 커서가 맨 뒤에 있을 때 ( 커서가 가리키는 곳에 토큰이 없고 앞칸에 있는 상황에 delete 누르면 )
    if (prevTokens.length === idx) idx--;

    const nextTokens = prevTokens.filter((token) => token.id !== prevTokens[idx].id);
    setTokens(nextTokens);
    setCursorIdx(idx);
};
