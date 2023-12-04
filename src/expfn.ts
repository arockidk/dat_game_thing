export let start = Date.now() / 1000;
export let passed = () => Math.floor(Date.now() / 100 - start + 1);
export function multiplier() {
    return 1+(
        (
            1.2^(
                ( (Date.now()/1000) - start )
                /2
            )
        )
        /5
    )
}
(globalThis as any).passed = passed;
(globalThis as any).multiplier = multiplier;