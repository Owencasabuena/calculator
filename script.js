function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    if(secondNumber == 0) {
        return null;
    } else {
        return firstNumber / secondNumber;
    }
}

function operate(firstNumber, operator, secondNumber) {
    switch(operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
    }
}

let firstNumber = 0;
let secondNumber;
let lastSecondNumber = null;
let currentOperator;
let shouldResetDisplay = false;

const display = document.querySelector(".answer");
const numberButtons = document.querySelectorAll(".numbers");
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const number = button.textContent;

        // Handle decimal input
        if (number == ".") {
            if (display.textContent.includes(".")) return;

            if (shouldResetDisplay) {
                display.textContent = "0.";
            } else {
                if (display.textContent == 0) {
                    display.textContent = "0.";
                } else {
                    display.textContent += ".";
                }
            }
            shouldResetDisplay = false;
            return;
        }

        // Handle number input
        if (display.textContent == 0 && !display.textContent.includes(".")) {
            display.textContent = number;
        } else if (shouldResetDisplay) {
            display.textContent = number;
            shouldResetDisplay = false;
        } else {
            if (display.textContent.length >= 10) return;
            display.textContent += number;
        }
    });
});

const operatorButtons = document.querySelectorAll(".operators");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equals");

let equation = document.querySelector(".equation");
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if(button.textContent == '×') {
            currentOperator = '*';
        } else {
            currentOperator = button.textContent;
        }
        firstNumber = display.textContent;
        if(currentOperator == '*') {
            equation.textContent = firstNumber + " × ";
        } else {
            equation.textContent = firstNumber + " " + currentOperator;
        }
        shouldResetDisplay = true;
    });
});


equalButton.addEventListener('click', function () {
    if (!currentOperator) return;

    let first = typeof firstNumber === "string" ? parseFloat(firstNumber) : firstNumber;

    if (shouldResetDisplay && lastSecondNumber != null) {
        secondNumber = lastSecondNumber;
    } else {
        secondNumber = display.textContent;
        lastSecondNumber = secondNumber;
    }

    let second = typeof secondNumber === "string" ? parseFloat(secondNumber) : secondNumber;

    let result = operate(first, currentOperator, second);
    const symbol = currentOperator === '*' ? '×' : currentOperator;
    if (result === null) {
        display.textContent = "Undefined";
        equation.textContent = `${first} ÷ ${second} =`;
        return;
    } else {
        equation.textContent = `${first} ${symbol} ${second} =`;
    }
    let newResult = Math.round(result * 100) / 100;
    display.textContent = String(newResult).slice(0, 10);
    firstNumber = result;
    shouldResetDisplay = true;
});

clearButton.addEventListener('click', function() {
    firstNumber = "";
    currentOperator = "";
    secondNumber = "";
    display.textContent = "0";
    equation.textContent = "";
});

deleteButton.addEventListener('click', function() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
});
