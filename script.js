let runningTotal = 0;
let buffer = "0";
let operator;

const screen = document.querySelector('.display');
const buttons = document.querySelectorAll('.calc-button');

function handleUserAction(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (operator === null) { return };
            operate(parseInt(buffer));
            operator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
        default:
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') { return; }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        operate(intBuffer);
    }
    operator = symbol;
    buffer = '0';
}

function operate(value) {
    if (operator === '+') {
        runningTotal += value;
    } else if (operator === '-') {
        runningTotal -= value;
    } else if (operator === '*') {
        runningTotal *= value;
    } else if (operator === '/') {
        runningTotal /= value;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    buttons.forEach(button => {
        button.addEventListener('click', (e) => handleUserAction(e.target.innerHTML))
    })
}

init();