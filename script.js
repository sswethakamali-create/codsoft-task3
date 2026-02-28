let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const currDisplay = document.getElementById('curr-display');
const prevDisplay = document.getElementById('prev-display');

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        // Prevent multiple decimals
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+': result = prev + curr; break;
        case '−': result = prev - curr; break;
        case '×': result = prev * curr; break;
        case '÷': 
            if (curr === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / curr; 
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function updateDisplay() {
    currDisplay.innerText = currentInput;
    if (operator !== null) {
        prevDisplay.innerText = `${previousInput} ${operator}`;
    } else {
        prevDisplay.innerText = '';
    }
}