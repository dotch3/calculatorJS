window.addEventListener('load', start);

const numbersEntered = false;
const globalOperations = {
    operations: [{
        name: 'addition',
        operator: '+',
        label: 'Adição',
        type: 'a_b'
    },
    {
        name: 'substraction',
        operator: '-',
        label: 'Subtração',
        type: 'a_b'
    },
    {
        name: 'multiplication',
        operator: '*',
        label: 'Multiplicação',
        type: 'a_b'
    },
    {
        name: 'division',
        operator: '/',
        label: 'Divisão',
        type: 'a_b'
    },
    {
        name: 'divisor',
        operator: '%',
        label: 'Divisores',
        type: 'a'
    },
    {
        name: 'exponential',
        operator: '^',
        label: 'Expoente',
        type: 'a'
    },
    {
        name: 'factorial',
        operator: '!',
        label: 'Fatorial',
        type: 'a'
    },
    {
        name: 'squareRoot',
        operator: 'sqrt',
        label: 'Raiz Quadrada',
        type: 'a'
    },

        // ['addition', 'substraction', 'multiplication', 'division', 'Radicals', 'Exponents', 'Factorial'];
    ]
};
var inputNumberA = null;
var inputumberB = null;


function start() {
    console.log('DOM loaded');
    inputNumberA = document.querySelector('#numberA')
    inputNumberB = document.querySelector('#numberB')

    activateInput();
    if (numbersEntered) {
        render();
        clearInput();
    }

}

function render() {
    let divResults = document.querySelector('#operations');

    divResults.innerHTML = '';
    let result = null;

    for (let index = 0; index < globalOperations.operations.length; index++) {
        var currentOperation = globalOperations.operations[index];

        if (currentOperation.type === 'a') {
            let resA = calculateOperation(currentOperation, parseInt(inputNumberA.value, 10));
            let resB = calculateOperation(currentOperation, parseInt(inputNumberB.value, 10));
        }
        else if (currentOperation.type === 'a_b') {
            result = calculateOperations(currentOperation);
        }
        function calculateOperation(currentOperation, numberEntered) {
            let divisorsArray = [];
            switch (currentOperation.operator) {
                case ('^'):
                    operationLiteral = `${currentOperation.label}  (${numberEntered}${currentOperation.operator}2 )`
                    result = formatNumber(Math.pow(numberEntered, 2).toFixed(2));
                    drawResults(operationLiteral, result);
                    break;
                case ('%'):
                    operationLiteral = `${currentOperation.label}  (${numberEntered})`
                    result = divisor(numberEntered);
                    resultLiteral = `${result.length}: [${result}]`
                    drawResults(operationLiteral, resultLiteral);
                    break;
                case ('!'):
                    operationLiteral = `${currentOperation.label}  (${numberEntered}${currentOperation.operator})`
                    if (numberEntered > 21) {
                        result = 'Número muito grande';
                        drawResults(operationLiteral, result);
                        break;
                    }
                    result = factorial(numberEntered);
                    drawResults(operationLiteral, result);
                    break;
                case ('sqrt'):
                    operationLiteral = `${currentOperation.label}  (${currentOperation.operator} ${numberEntered})`
                    result = formatNumber(Math.sqrt(numberEntered).toFixed(2));
                    drawResults(operationLiteral, result);
                    break;

                default:
                    console.log('Operação não definida');

            }

            function divisor(numberEntered) {
                for (let i = 2; i < numberEntered; i++) {
                    while (numberEntered % i === 0) {
                        divisorsArray.push(i);
                        numberEntered /= i;
                    };
                }
                if (numberEntered > 1) {
                    divisorsArray.push(numberEntered);
                }

                return divisorsArray;
            }
            function factorial(numberEntered) {
                if (numberEntered === 0) {
                    return 1;
                }

                return numberEntered * factorial(numberEntered - 1);

            }
        }
    }
    function calculateOperations(currentOperation) {
        console.log('operaçao com 2 numeros', currentOperation.name);
        let operationLiteral = ''

        switch (currentOperation.operator) {
            case ('-'):
                operationLiteral = `${currentOperation.label}  (${inputNumberA.value}${currentOperation.operator}${inputNumberB.value})`
                resultAB = eval(inputNumberA.value + currentOperation.operator + inputNumberB.value);
                drawResults(operationLiteral, resultAB);

                operationLiteral = `${currentOperation.label}  (${inputNumberB.value}${currentOperation.operator}${inputNumberA.value})`
                resultBA = eval(inputNumberB.value + currentOperation.operator + inputNumberA.value);
                drawResults(operationLiteral, resultBA);
                break;
            case ('/'):
                console.log('Operation division');
                if (inputNumberA.value == 0 || inputNumberB.value == 0) {
                    let result0 = "Divisão por 0"
                    operationLiteral = `${currentOperation.label}  (${inputNumberA.value}${currentOperation.operator}${inputNumberB.value})`
                    drawResults(operationLiteral, result0);

                    operationLiteral = `${currentOperation.label}  (${inputNumberB.value}${currentOperation.operator}${inputNumberA.value})`
                    drawResults(operationLiteral, result0);
                }
                else {
                    operationLiteral = `${currentOperation.label}  (${inputNumberA.value}${currentOperation.operator}${inputNumberB.value})`
                    result = formatNumber(eval(inputNumberA.value + currentOperation.operator + inputNumberB.value).toFixed(2));
                    drawResults(operationLiteral, result);

                    operationLiteral = `${currentOperation.label}  (${inputNumberB.value}${currentOperation.operator}${inputNumberA.value})`
                    result = formatNumber(eval(inputNumberB.value + currentOperation.operator + inputNumberA.value).toFixed(2));
                    drawResults(operationLiteral, result);
                }
                break;
            default:
                operationLiteral = `${currentOperation.label}  (${inputNumberA.value}${currentOperation.operator}${inputNumberB.value})`
                result = formatNumber(eval(inputNumberA.value + currentOperation.operator + inputNumberB.value).toFixed(2));
                drawResults(operationLiteral, result);
        }
    }

    function drawResults(operationLiteral, result) {
        // Creating the DIV
        let divRes = document.createElement('div');
        divRes.classList.add('input', 'col', 's3');

        // Creating the input field
        let inputRes = document.createElement('input');
        inputRes.classList.add('validate', 'results');
        inputRes.readOnly = true;
        inputRes.value = result;

        // Creating the label

        let labelRes = document.createElement('label');
        labelRes.classList.add('labelResults');
        labelRes.textContent = operationLiteral;

        divRes.appendChild(labelRes);
        divRes.appendChild(inputRes);

        divResults.appendChild(divRes);
    }

}

function formatNumber(number) {
    return new Intl.NumberFormat('pt-BR').format(number);
}

function activateInput() {
    console.log('activateInput');

    function handleTyping(input) {
        console.log('handleTyping');
        const value = input.target.value

        if (inputNumberA.value.trim() && inputNumberB.value.trim()) {
            render();
        }
        else if (!inputNumberA.value.trim()) {
            inputNumberA.dataset.state = 'invalid'
        }
        else {
            inputNumberB.dataset.state = 'invalid'
        }

    }

    inputNumberA.addEventListener('input', handleTyping);
    inputNumberA.focus();

    inputNumberB.addEventListener('input', handleTyping);

}

function clearInput() {
    inputNumberA.value = '';
    inputNumberB.value = '';
    inputNumberA.focus();
}

    // start();

