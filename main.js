function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    if(b == 0) return null
    return a / b 
}

let currentInput = "", previousValue = "", operator = ""

function roundResult(result){
    return Math.round(result * 100000) / 100000
}

function operate(num1, operator, num2){
    let result
    num1 = Number(num1)
    num2 = Number(num2)

    if(operator === "+") result = add(num1, num2)
    else if(operator === "-") result = subtract(num1, num2)
    else if(operator === "*") result = multiply(num1, num2)
    else if(operator === "/") result = divide(num1, num2)

    if(result == null){
        display.innerText = "error"
        currentInput = ""
        previousValue = ""
        operator = ""
        return
    }

    return roundResult(result)
}

const expression = document.querySelector(".work")
const display = document.querySelector(".res")

let reset = false;

const numBtns = document.querySelectorAll(".num")
numBtns.forEach(numBtn => {
    numBtn.addEventListener("click", () => {
        if(reset){
            currentInput = ""
            reset = false
        }
        currentInput += numBtn.innerText
        display.innerText = currentInput
    })
})



const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () => {
        if(currentInput === "" && previousValue === "") return

        if(previousValue !== "" && operator !== "" && currentInput !== ""){
            let result = operate(previousValue, operator, currentInput)
            previousValue = result
            display.innerText = previousValue
            currentInput = ""
        }
        else{
            previousValue = currentInput || previousValue
        }

        operator = operatorBtn.innerText;
        currentInput = ""
    })
})



const equalTo = document.querySelector("#equals")
equalTo.addEventListener("click", () => {
    if(currentInput !== "" && operator !== "" && previousValue !== ""){
        result = operate(previousValue, operator, currentInput)
        expression.innerText = previousValue + " " + operator + " " + currentInput
        display.innerText = result
        currentInput = String(result)
        previousValue = ""
        operator = ""
        reset = true
    }
})

const clear = document.querySelector("#clear")
clear.addEventListener("click", () => {
    currentInput = ""
    previousValue = ""
    operator = ""
    display.innerText = ""
    expression.innerText = ""
})

const backSpace = document.querySelector("#backspace")
backSpace.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1)
    display.innerText = currentInput
    if(currentInput.length == 0){
        display.innerText = "0"
    }
})

const decimal = document.querySelector("#dot")
decimal.addEventListener("click", () => {
    if (reset) {
        currentInput = "0";
        reset = false;
    }
    if(currentInput == ""){
        currentInput += "0"
    }
    if(!currentInput.includes('.')){
        currentInput += '.'   
    }
})


document.addEventListener("keydown", (e) => {
    const key = e.key

    if(!isNaN(key)){
        document.querySelectorAll(".num").forEach(btn => {
            if(btn.innerText === key) btn.click()
        })
    }

    if(['+', "-", "*", "/"].includes(key)){
        document.querySelectorAll(".operator").forEach(btn => {
            if(btn.innerText === key) btn.click()
        })
    }

    if(key === "Enter"){
        document.querySelector("#equals").click()
    }

    if(key === "Backspace"){
        document.querySelector("#backspace").click()
    }

    if(key === "Escape"){
        document.querySelector("#clear").click()
    }

    if(key === "."){
        document.querySelector("#dot").click()
    }

}) 