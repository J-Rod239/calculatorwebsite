let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value) && value !== ".") {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === '÷' && buffer === "0") {
                screen.innerText = "Error";
                triggerShake();
                buffer = "0";
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = `${runningTotal}`;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1 || (buffer.length === 2 && buffer.includes("-"))) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0" && runningTotal === 0) {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = `${runningTotal}`;
}

function flushOperation(floatBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += floatBuffer;
            break;
        case '-':
            runningTotal -= floatBuffer;
            break;
        case '×':
            runningTotal *= floatBuffer;
            break;
        case '÷':
            runningTotal /= floatBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (numberString === "." && buffer.includes(".")) {
        return;
    }

    if (buffer === "0" || (previousOperator && buffer === `${runningTotal}`)) {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        const target = event.target;
        if (!target.matches("button")) {
            return;
        }
        buttonClick(target.innerText);
    });
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') 
        ? 'Light Mode' 
        : 'Dark Mode';
});

function triggerShake() {
    screen.classList.add('shake');
    setTimeout(() => {
        screen.classList.remove('shake');
    }, 300);
}

init();