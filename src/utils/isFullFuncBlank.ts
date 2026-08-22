import { isBlankType } from '@/src/utils/isBlankType';
// true일 때 꽉 찬거고, false일 때 입력이 필요함.
export function isFullFuncBlank(funcToken: Token) {
    // Blank가 없는 경우
    if (!funcToken.blankIdxs || (funcToken.blankIdxs && funcToken.blankIdxs.length === 0)) {
        return true;
    }
    if (!funcToken.funcExps) return true;

    for (const blankIdx of funcToken.blankIdxs) {
        if (isBlankType(funcToken.funcExps[blankIdx]) && funcToken.funcExps[blankIdx].value === null) return false;
    }
    return true;
}
