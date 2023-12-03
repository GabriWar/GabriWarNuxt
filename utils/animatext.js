const animaText = (id, FirstText, SecoundText) => {
	if (FirstText == undefined || SecoundText == undefined) {
		//check if the user passed the text to be animated, if now we just use the doc innerText
		if (FirstText != undefined) {
			SecoundText = FirstText;
		} //if the user passed the first text, we use the doc innerText for the secound text
		else FirstText = document.getElementById(id).innerText;
		SecoundText = document.getElementById(id).innerText;
	}
	const element = document.getElementById(id); //saving the innertext in a var
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //all the letters that we can use to animate, should be 26
	let interval = null;
	let iteration = 0;
	let buffer = FirstText; //we start by buffering the first text, so we can go back to it later
	if (document.getElementById(id).innerText == buffer) {
		buffer = SecoundText;
	} //if the text in the document is the same as the first text, we change the buffer to the secound text
	clearInterval(interval);
	interval = setInterval(() => {
		//magic happens here
		element.innerText = buffer
			.split("")
			.map((letter, index) => {
				if (index < iteration) {
					return buffer[index];
				}
				return letters[Math.floor(Math.random() * 26)]; // 26 change to the number of chars in the letters var to change the letters
			})
			.join("");
		if (iteration >= buffer.length) {
			clearInterval(interval);
		}
		iteration += 1 / 3;
	}, 30);
};
export default animaText;
