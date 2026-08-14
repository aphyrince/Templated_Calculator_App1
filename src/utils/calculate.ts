export default function calculate(exps: Token[]) {
    const expressionString = exps.map((exp) => (exp.value === 'Blank' ? '' : String(exp.value))).join('');

    if (exps.some((exp) => exp.value === 'Blank')) return null;
    if (!expressionString) return null;
    if (!/^[0-9+\-*/.(),A-Za-z ]+$/.test(expressionString)) return null;

    try {
        const evalFn = new Function(
            'Math',
            'PI',
            'E',
            'sin',
            'cos',
            'tan',
            'sqrt',
            'abs',
            'log',
            'exp',
            'pow',
            'min',
            'max',
            `"use strict"; return (${expressionString})`,
        );
        const value = evalFn(
            Math,
            Math.PI,
            Math.E,
            Math.sin,
            Math.cos,
            Math.tan,
            Math.sqrt,
            Math.abs,
            Math.log,
            Math.exp,
            Math.pow,
            Math.min,
            Math.max,
        );
        if (typeof value !== 'number' || !Number.isFinite(value)) return null;
        return value;
    } catch {
        return null;
    }
}
