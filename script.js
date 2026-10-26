let currentInput = '0';
let previousInput = '';
let currentOperator = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperator !== null) calculateResult();
    previousInput = currentInput;
    currentInput = '0';
    currentOperator = operator;
}

function calculateResult() {
    if (currentOperator === null || previousInput === '') return;
    
    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    let result = 0;

    try {
        result = calculateLogic(currentOperator, num1, num2);
        currentInput = result.toString();
        currentOperator = null;
        previousInput = '';
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

function calculateLogic(operator, number1, number2) {
    switch (operator) {
        case '+':
            return number1 + number2; 
        case '-':
            return number1 - number2;
        case '*':
            return number1 * number2;
        case '/':
            if (number2 === 0) {
                throw new Error('cannot divide by zero');
            }
            return number1 / number2;
        default:
            throw new Error(`unknown operator: ${operator}`);
    }
}