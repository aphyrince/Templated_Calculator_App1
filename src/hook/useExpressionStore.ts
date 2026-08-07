interface ExpressionStore {
    expression: Expression[];
    blankValues: number[];
    cursorIdx: number;
    setExpression: (expression: Expression) => void;
    setCursorIdx: (idx: number) => void;
    setblankValueOfIdx: (value: number | null) => void;
}
