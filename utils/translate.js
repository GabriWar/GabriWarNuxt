const translatetext = (child) => {
    let selector = `[data-translate]`;
    if (child == 1) {
        selector = `[data-translate-child]`;
    }
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        let firstText = element.innerText;
        let secondText = element.dataset.translate;
        element.dataset.translate = firstText;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // all the letters that we can use to animate, should be 26
        let interval = null;
        let iteration = 0;
        let buffer = firstText; // we start by buffering the first text, so we can go back to it later
        if (element.innerText == buffer) {
            buffer = secondText;
        } // if the text in the document is the same as the first text, we change the buffer to the second text
        clearInterval(interval);
        interval = setInterval(() => {
            // magic happens here
            element.innerText = buffer
                .split('')
                .map((letter, index) => {
                    if (index < iteration || letter === ' ') {
                        return buffer[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)]; // change to the number of chars in the letters var to change the letters
                })
                .join('');
            if (iteration >= buffer.length) {
                clearInterval(interval);
            }
            iteration += 1; 
        }, 0);
    });
};
export default translatetext;
