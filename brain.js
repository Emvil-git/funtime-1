// let letters = ['I', "'", 'M', ' ', 'J', 'U', 'S', 'T', ' ', 'H', 'A', 'V', 'I', 'N', 'G', ' ', 'F', 'U', 'N'];

let letters = [
    { letter: 'I', id: 'letter_i1' },
    { letter: "'", id: "letter_'2" },
    { letter: 'M', id: 'letter_m3' },
    { letter: ' ', id: 'space_4' },
    { letter: 'J', id: 'letter_j5' },
    { letter: 'U', id: 'letter_u6' },
    { letter: 'S', id: 'letter_s7' },
    { letter: 'T', id: 'letter_t8' },
    { letter: ' ', id: 'space_9' },
    { letter: 'H', id: 'letter_h10' },
    { letter: 'A', id: 'letter_a11' },
    { letter: 'V', id: 'letter_v12' },
    { letter: 'I', id: 'letter_i13' },
    { letter: 'N', id: 'letter_n14' },
    { letter: 'G', id: 'letter_g15' },
    { letter: ' ', id: 'space_16' },
    { letter: 'F', id: 'letter_f17' },
    { letter: 'U', id: 'letter_u18' },
    { letter: 'N', id: 'letter_n19' }
  ]

const funCont = document.getElementById("funtime-container");
const contWidth = funCont.offsetWidth

let grabLetter;
let lastXPOS;
let grabXPOS;
let prevXPOS;
let lastSwitchInd = null;
let switchInd = null;

const announceClick = (e) => {
    if (e.currentTarget.innerHTML !== " "){
        grabLetter = e.currentTarget;

        const rect = funCont.getBoundingClientRect();
        grabXPOS = e.clientX - rect.left;

        // console.log(`Grabbed letter ${e.currentTarget.innerHTML}`)
        // console.log(`Grab Index is: ${getGrabIndex(grabXPOS)}`)
    }
}

const generateLetters = () => {
    funCont.innerHTML = "";

    Array.from(letters).forEach(letter => {
        const letterNode = document.createElement("div")
        letterNode.innerHTML = letter.letter
        letterNode.id = letter.id
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

        // console.log(`Last position of mouse is ${lastXPOS}`)
        // console.log(`expected index is: ${getExpectedIndex(lastXPOS)}`)

        // console.log(`Let go of letter ${grabLetter.innerHTML}`)
        // console.log(`Grab X Pos is: ${grabXPOS}`)
        letterShifter(grabXPOS, lastXPOS, grabLetter);
        grabLetter = ""
        // console.log(`Grabbed letter is now ${grabLetter}`);

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

    const letterObj = {
        letter: letter.innerHTML,
        id: letter.id
    }

    // console.log(grabXPOS)
    // console.log(grabPos)
    // console.log(getGrabIndex(grabPos))
    tLetters.splice(getGrabIndex(grabPos), 1); // "delete" the letter that is grabbed
    // console.log(tLetters)
    tLetters.splice(getExpectedIndex(dropPos), 0, letterObj);
    // console.log(tLetters)

    letters = tLetters;

    // console.log(letters)
}

const posDetector = (e) => {

    const rect = funCont.getBoundingClientRect();
    const currXPos = e.clientX - rect.left;

    const dist = grabXPOS - currXPos;

    // console.log(funCont.children[getExpectedIndex(currXPos)])

    const toSwitch = funCont.children[getExpectedIndex(currXPos)]

    if (grabLetter) {
        grabLetter.style.transform = `translateX(${dist * -1}px)`
        // console.log(`You will be at: ${getExpectedIndex(currXPos)}`)
        // console.log(toSwitch)

        if (switchInd != lastSwitchInd) {
            console.log('SWITCH INDEX CHANGE')
            lastSwitchInd = switchInd;
            switchInd = getCurrLetterIndex(toSwitch.id)
        } else {
            // lastSwitchInd = switchInd;
            switchInd = getCurrLetterIndex(toSwitch.id)
        }

        // const switchInd = getCurrLetterIndex(toSwitch.id)
        const grabInd = getCurrLetterIndex(grabLetter.id)

        console.log(`Switch Index: ${switchInd}`)
        console.log(`Last Switch Index: ${lastSwitchInd}`)
        console.log(`Grab Index: ${grabInd}`)

        if (grabLetter.id !== toSwitch.id ) { // if switch index is not the same as the grab index
            
            if (grabInd < switchInd) {
                if (switchInd > lastSwitchInd) {
                    funCont.children[lastSwitchInd].style.transform = "translateX(-44px)"
                } else if (switchInd < lastSwitchInd){
                    funCont.children[lastSwitchInd].style.transform = "translateX(0px)"
                }
                toSwitch.style.transform = `translateX(-44px)`
            } else {
                if (switchInd > lastSwitchInd) {
                    funCont.children[lastSwitchInd].style.transform = "translateX(0px)"
                } //else if (switchInd < lastSwitchInd){
                //     funCont.children[lastSwitchInd].style.transform = "translateX(-44px)"
                // }
                toSwitch.style.transform = `translateX(44px)`
            }
        } else {
            [...funCont.children].forEach(node => node.style.transform = "translateX(0)")
        }
    } else {
        // console.log(`no letter but your mouse is at: ${currXPos}`)
        // console.log(`targetIndex: ${getExpectedIndex(currXPos)}`)
    }
}

document.addEventListener('mousemove', posDetector)

const getCurrLetterIndex = (id) => {
    return letters.findIndex(lObj => lObj.id == id);
}