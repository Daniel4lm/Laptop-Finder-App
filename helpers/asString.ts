export function asString(value: string | string[]) {

    let realValue: string;

    if (Array.isArray(value)) {
        realValue = value[0];
    } else {
        realValue = value;
    }

    return !realValue || realValue.toLowerCase() === 'all' ? null : realValue;
}