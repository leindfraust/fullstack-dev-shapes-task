export function shuffleArray<T extends Record<string, unknown>[]>(array: T): T {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    const result: T = [] as unknown as T;

    for (let i = 0; i < array.length; i++) {
        result.push(array[i]);

        if (Math.random() > 0.5) {
            result.push(array[i]);
        }
    }

    return result;
}

export function generateRandomColor(): string {
    const colors = [
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue",
        "Violet",
        "Pink",
        "Brown",
        // "Black",
        // "White",
        "Gray",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
