function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

function roundToNearest(num: number, stepSize: number): number {
    let converted = num / stepSize;
    converted = Math.round(converted);
    converted *= stepSize;
    return converted;
}

export {
    clamp,
    roundToNearest
}