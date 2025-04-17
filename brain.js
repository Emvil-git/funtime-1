let letters = ['I', "'", 'M', ' ', 'J', 'U', 'S', 'T', ' ', 'H', 'A', 'V', 'I', 'N', 'G', ' ', 'F', 'U', 'N'];

const funCont = document.getElementById("funtime-container");
const contWidth = funCont.offsetWidth

let grabLetter;
let lastXPOS;
let grabXPOS;

const announceClick = (e) => {
    if (e.currentTarget.innerHTML !== " "){
        grabLetter = e.currentTarget;

        const rect = funCont.getBoundingClientRect();
        grabXPOS = e.clientX - rect.left;

        console.log(`Grabbed letter ${e.currentTarget.innerHTML}`)
        console.log(`Grab Index is: ${getGrabIndex(grabXPOS)}`)
    }
}

const generateLetters = () => {
    funCont.innerHTML = "";

    Array.from(letters).forEach(letter => {
        const letterNode = document.createElement("div")
        letterNode.innerHTML = letter
        letterNode.classList.add("funtime-letter")
        if (letter === " ") {
            letterNode.classList.add("funtime-space")
        }
        funCont.appendChild(letterNode)
    })

    let funLetters = document.getElementsByClassName("funtime-letter");

    Array.from(funLetters).forEach(letter => {
        letter.addEventListener('mousedown', announceClick)
    })
}

document.onload = generateLetters();


const announceUp = (e) => {
    if (grabLetter) {
        const rect = funCont.getBoundingClientRect();
        lastXPOS = e.clientX - rect.left;

        console.log(`Last position of mouse is ${lastXPOS}`)
        console.log(`expected index is: ${getExpectedIndex(lastXPOS)}`)

        console.log(`Let go of letter ${grabLetter.innerHTML}`)
        console.log(`Grab X Pos is: ${grabXPOS}`)
        letterShifter(grabXPOS, lastXPOS, grabLetter.innerHTML);
        grabLetter = ""
        console.log(`Grabbed letter is now ${grabLetter}`);

        generateLetters();
    } else {
        console.log('No letter grabbed')
    }
}



document.addEventListener('mouseup', announceUp)

const getExpectedIndex = (xPos) => {
    if (xPos < 44) {
        return 0;
    } else if (xPos > 792) {
        return 18;
    } else {
        let mult = Math.ceil(xPos/44);
        return mult - 1
    }
}

const getGrabIndex = (xPos) => {
    if (xPos < 0) {
        return;
    } else if (xPos > 836) {
        return;
    } else {
        let mult = Math.ceil(xPos/44);
        return mult - 1;
    }
}

const letterShifter = (grabPos, dropPos, letter) => {
    let tLetters = letters.slice();

    console.log(grabXPOS)
    console.log(grabPos)
    console.log(getGrabIndex(grabPos))
    tLetters.splice(getGrabIndex(grabPos), 1); // "delete" the letter that is grabbed
    console.log(tLetters)
    tLetters.splice(getExpectedIndex(dropPos), 0, letter);
    console.log(tLetters)

    letters = tLetters;

    console.log(letters)
}

