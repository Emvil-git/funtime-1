let letters = ['I', "'", 'M', ' ', 'J', 'U', 'S', 'T', ' ', 'H', 'A', 'V', 'I', 'N', 'G', ' ', 'F', 'U', 'N'];

const funCont = document.getElementById("funtime-container");
const contWidth = funCont.offsetWidth
let funLetters = document.getElementsByClassName("funtime-letter");
let grabLetter;
let lastXPOS;

console.log(contWidth)
console.log(funLetters.length);

const generateLetters = () => {
    Array.from(letters).forEach(letter => {
        const letterNode = document.createElement("div")
        letterNode.innerHTML = letter
        letterNode.classList.add("funtime-letter")
        if (letter === " ") {
            letterNode.classList.add("funtime-space")
        }
        funCont.appendChild(letterNode)
    })
}

document.onload = generateLetters();

const announceClick = (e) => {
    grabLetter = e.currentTarget;
    console.log(`Grabbed letter ${e.currentTarget.innerHTML}`)
}

const announceUp = (e) => {
    if (grabLetter) {
        console.log(`Let go of letter ${grabLetter.innerHTML}`)
        grabLetter = ""
    } else {
        console.log('No letter grabbed')
    }

    console.log(`Grabbed letter is now ${grabLetter}`)
}

Array.from(funLetters).forEach(letter => {
    letter.addEventListener('mousedown', announceClick)
    // letter.addEventListener('mouseup', announceUp)
})

document.addEventListener('mouseup', announceUp)





