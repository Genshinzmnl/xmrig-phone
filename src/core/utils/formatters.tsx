export const formatHashrate = (hr: number | string | null | undefined, fixed: number = 2): [number, string] => {
    if (hr === null || hr === undefined || isNaN(hr as any)) {
        return [0, ""];
    }

    const units = ["H", "kH", "MH", "GH", "TH"];
    let fHr = parseFloat(`${hr}`);

    for (let i = units.length - 1; i >= 0; i--) {
        const threshold = Math.pow(1000, i);
        if (fHr >= threshold) {
            return [parseFloat((fHr / threshold).toFixed(fixed)), units[i]];
        }
    }

    return [parseFloat(fHr.toFixed(fixed)), "H"];
}