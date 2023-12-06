
//almost done, just remove href when animating anchor tags
const translatetext = () => {
    let selector = `[data-translate]`;
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        let firstText = element.innerHTML; // Use innerHTML instead of innerText to preserve anchor tags
        let secondText = element.dataset.translate;
        element.dataset.translate = firstText;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // all the letters that we can use to animate, should be 26
        let interval = null;
        let iteration = 0;
        let buffer = firstText; // we start by buffering the first text, so we can go back to it later
        if (element.innerHTML == buffer) buffer = secondText; // if the text in the document is the same as the first text, we change the buffer to the second text
        clearInterval(interval);
        console.log(element.innerHTML);
        interval = setInterval(() => {
            // magic happens here
            let bufferArray = buffer.split('');
            let outputArray = [];
            let insideTag = false;
            let tagBuffer = '';
            let insideAnchorTag = false;
            let anchorTagBuffer = '';
            bufferArray.forEach((letter, index) => {
                if (
                    index < iteration ||
                    letter === ' ' ||
                    letter === '<' ||
                    letter === '>' ||
                    letter === ':' ||
                    (letter === 'h' &&
                        bufferArray[index + 1] === 'r' &&
                        bufferArray[index + 2] === 'e' &&
                        bufferArray[index + 3] === 'f')
                ) {
                    if (insideTag) {
                        tagBuffer += letter;
                    } else if (insideAnchorTag) {
                        anchorTagBuffer += letter;
                    } else {
                        outputArray.push(buffer[index]);
                    }
                } else if (letter === '<') {
                    if (bufferArray[index + 1] === 'a') {
                        insideAnchorTag = true;
                        anchorTagBuffer = '';
                    } else if (bufferArray[index + 1] === '/') {
                        insideTag = false;
                        tagBuffer += letter;
                        outputArray.push(tagBuffer);
                    } else if (bufferArray[index + 1] === '>') {
                        insideTag = false;
                        tagBuffer += letter;
                        outputArray.push(tagBuffer);
                    } else {
                        insideTag = true;
                        tagBuffer = letter;
                    }
                } else if (insideAnchorTag && letter === '>') {
                    insideAnchorTag = false;
                    anchorTagBuffer += letter;
                    outputArray.push(anchorTagBuffer);
                } else if (
                    !insideTag &&
                    !insideAnchorTag &&
                    ![';', '{', '(', '[', ' ', '.', '#'].includes(letter)
                ) {
                    outputArray.push(letters[Math.floor(Math.random() * letters.length)]); // change to the number of chars in the letters var to change the letters
                } else {
                    if (insideTag) {
                        tagBuffer += letter;
                    } else if (insideAnchorTag) {
                        anchorTagBuffer += letter;
                    }
                }
            });
            element.innerHTML = outputArray.join('');
            if (iteration >= buffer.length) {
                clearInterval(interval);
            }
            iteration += 1;
        }, 0);
    });
};
export default translatetext;
