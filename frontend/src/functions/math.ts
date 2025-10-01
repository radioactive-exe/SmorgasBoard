import type { Size } from "../classes/area";

function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

function roundToNearest(num: number, stepSize: number): number {
    let converted = num / stepSize;
    converted = Math.round(converted);
    converted *= stepSize;
    return converted;
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(dimensions: Size): Size {
    if (dimensions.width <= 0 || dimensions.height <= 0) {
        return { width: 0, height: 0 };
    }

    const commonDivisor = gcd(dimensions.width, dimensions.height);
    const ratioWidth = dimensions.width / commonDivisor;
    const ratioHeight = dimensions.height / commonDivisor;

    return {
        width: ratioWidth,
        height: ratioHeight,
    };
}

export { clamp, getAspectRatio, roundToNearest };
