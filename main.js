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
    return a / b 
}

let num1 = "", num2 = "", operator, result;

function operate(num1, operator, num2){

    num1 = Number(num1)
    num2 = Number(num2)

    if(operator === "+") result = add(num1, num2)
    else if(operator === "-") result = subtract(num1, num2)
    else if(operator === "*") result = multiply(num1, num2)
    else if(operator === "/") result = divide(num1, num2)

    return result
}

let isClicked = false;

const showOpr = document.querySelector(".work")
const showRes = document.querySelector(".res")


const operatorBtns = document.querySelectorAll(".operator")
Array.from(operatorBtns).forEach(operatorBtn => operatorBtn.addEventListener("click", () => {
    if(num2){
        let tempRes = operate(num1, operator, num2)
        num1 =  tempRes
        num2 = ""
        showOpr.textContent = tempRes;
    }
    operator = operatorBtn.textContent
    isClicked = true
    showOpr.textContent += operator
}))

const numBtns = document.querySelectorAll(".num")
Array.from(numBtns).forEach(numBtn => numBtn.addEventListener("click", () => {
    let content = numBtn.textContent
    if(!isClicked){
        num1 += content
        showOpr.textContent += content
    }
    else{
        num2 += content
        showOpr.textContent += content
    }
    console.log(num1)
    console.log(num2)
}))


const equalBtn = document.querySelector("#equals")
equalBtn.addEventListener("click", () => {
    let tempRes = operate(num1, operator, num2)
    showRes.textContent = tempRes
    num1 = tempRes
    num2 = ""
})