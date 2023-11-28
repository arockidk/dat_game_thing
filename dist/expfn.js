let start = Date.now() / 1000;
export function multiplier() {
    return 1 + ((1.2 ^ ((start - (Date.now() / 1000) + 120)
        / 2))
        / 5);
}
//# sourceMappingURL=expfn.js.map