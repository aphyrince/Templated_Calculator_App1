export function isBlankType(exp: FuncExp) {
    return typeof exp !== 'number' && typeof exp !== 'string';
}
