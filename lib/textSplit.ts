export function splitTextIntoChars(element: HTMLElement): HTMLElement[] {
    const text = element.textContent || "";
    const chars: HTMLElement[] = [];

    // Clear the element
    element.innerHTML = "";

    // Create span for each character
    text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
        span.style.display = "inline-block";
        element.appendChild(span);
        chars.push(span);
    });

    return chars;
}

export function splitTextIntoWords(element: HTMLElement): HTMLElement[] {
    const text = element.textContent || "";
    const words: HTMLElement[] = [];

    // Clear the element
    element.innerHTML = "";

    // Create span for each word
    text.split(" ").forEach((word, index, array) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.marginRight = index < array.length - 1 ? "0.25em" : "0";
        element.appendChild(span);
        words.push(span);
    });

    return words;
}

export function splitTextIntoLines(element: HTMLElement): HTMLElement[] {
    const text = element.textContent || "";
    const lines: HTMLElement[] = [];

    // Clear the element
    element.innerHTML = "";

    // Create div for each line (split by newline)
    text.split("\n").forEach((line) => {
        const div = document.createElement("div");
        div.textContent = line || "\u00A0"; // Preserve empty lines
        element.appendChild(div);
        lines.push(div);
    });

    return lines;
}
