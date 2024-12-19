const radioSelection = document.querySelectorAll("input[type = 'radio']");
const encryptionSelection = document.querySelector("#encryption");
const decryptionSelection = document.querySelector("#decryption");
const encryptionDecryptionButton = document.querySelector("#encryptionDecryptionButton");
const inputTextarea = document.querySelector("#input")
const outputTextarea = document.querySelector("#output")

let equation = "21 x ^ 10 + 21 x ^ 8 + 52 x ^ 7 + 82 x ^ 6 + 50 x ^ 5 + 91 x ^ 4 + 34 x ^ 3 + 12 x ^ 2 + 5";
let alphabet = ["a" , "b" , "c" , "d" , "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"," "];
let arrayOfNumbers = [];
let setOfNumbers;

radioSelection.forEach((selection) => {
    selection.onclick = (event) => {
        radioSelection.forEach((selection) => {
            selection.classList.remove("checked")
        })
        event.target.classList.add("checked");
    }
})

encryptionDecryptionButton.onclick = () => {
    if(encryptionSelection.classList.contains("checked")) {
        outputTextarea.innerHTML = encryption(inputTextarea.value)
    } else if(decryptionSelection.classList.contains("checked")) {
        outputTextarea.innerHTML = decryption(inputTextarea.value)
    }
}

while(equation != 0) {
    equation = d(equation);
    getCoefficients(equation);
}

function d(expression) {
    expression = math.derivative(expression , "x");
    expression = math.rationalize(expression);
    return expression.toString();
}

function getCoefficients(expression) {
    let filteredExpression;
    expression = expression.replaceAll("*" , " ");
    expression = expression.replaceAll("x" , " ");
    expression = expression.replaceAll("^" , " ");
    expression = expression.replaceAll("+" , " ");
    expression = expression.replaceAll("- " , "-");
    expression = expression.split(" ");

    filteredExpression = expression.filter((element) => element != 0);
    
    for(let i = 0; i < filteredExpression.length - 1; i++) {
        if(i % 2 != 0) {
            filteredExpression[i] = "";
        }
    }

    filteredExpression = filteredExpression.filter((element) => element != 0);
    
    for(element of filteredExpression) {
        arrayOfNumbers.push(element);
    }
}

setOfNumbers = new Set(arrayOfNumbers);
arrayOfNumbers = [...setOfNumbers]

function encryption(value) {
    let encryptedText = ""
    for(let character of value) {
        let index = alphabet.indexOf(character)
        let number = arrayOfNumbers[index]
        encryptedText += `${number})`
    }
    return encryptedText
}

function decryption(value) {
    let arrayOfEncryptionText = value.split(")")
    let decryptedText = ""
    arrayOfEncryptionText.pop()
    for(let number of arrayOfEncryptionText) {
        let index = arrayOfNumbers.indexOf(number)
        let character = alphabet[index]
        decryptedText += character;
    }
    return decryptedText
}