class Calculator {
    operationList = [];

    constructor(previousOperand, currentOperand, numberBTNs, operationBTNs, eqlBTN, acBTN, delBTN, pointBTN) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.numberBTNs = numberBTNs;
        this.operationBTNs = operationBTNs;
        this.eqlBTN = eqlBTN;
        this.acBTN = acBTN;
        this.delBTN = delBTN;
        this.pointBTN = pointBTN;

        numberBTNs.forEach((number) => {
            number.addEventListener('click', () => {
                this.appendNumber(number.innerText)
            })
        })

        operationBTNs.forEach((operation) => {
            operation.addEventListener('click', () => {
                this.chooseOperation(operation.innerText)
            })
        })

        for (let i = 0; i < this.operationBTNs.length; i++) {
            this.operationList.push(this.operationBTNs[i].innerText);
        }

        eqlBTN.addEventListener('click', () => {
            this.calculate();
        })

        acBTN.addEventListener('click', () => {
            this.clearAll();
        })

        delBTN.addEventListener('click', () => {
            this.delSymbol();
        })
    }

    calculate() {
        let operator = previousOperand.innerText.slice(-1);
        switch (operator) {
            case '+':
                currentOperand.innerText = parseFloat(previousOperand.innerText) + parseFloat(currentOperand.innerText);
                previousOperand.innerText = '';
                break;
            case '-':
                currentOperand.innerText = parseFloat(previousOperand.innerText) - parseFloat(currentOperand.innerText);
                previousOperand.innerText = '';
                break;
            case '/':
                currentOperand.innerText = parseFloat(previousOperand.innerText) / parseFloat(currentOperand.innerText);
                previousOperand.innerText = '';
                break;
            case '*':
                currentOperand.innerText = parseFloat(previousOperand.innerText) * parseFloat(currentOperand.innerText);
                previousOperand.innerText = '';
                break;
            case '%':
                currentOperand.innerText = parseFloat(currentOperand.innerText / 100) * parseFloat(previousOperand.innerText);
                previousOperand.innerText = '';
                break;
        }
    }

    clearAll() {
        currentOperand.innerText = '';
        previousOperand.innerText = '';
    }

    delSymbol() {
        currentOperand.innerText = currentOperand.innerText.slice(0, -1);
    }

    appendNumber(number) {
        for (let i = 0; i < this.operationList.length; i++) {
            if (currentOperand.innerText === this.operationList[i]) {
                previousOperand.innerText += currentOperand.innerText;
                currentOperand.innerText = '';
            }
        }
        if (currentOperand.innerText === '0') {
            currentOperand.innerText = '';
        }
        currentOperand.innerText += number;
    }

    chooseOperation(operation) {
        previousOperand.innerText += currentOperand.innerText;
        currentOperand.innerText = operation;
    }


}

const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');
const numberBTNs = document.querySelectorAll('.number');
const operationBTNs = document.querySelectorAll('.operator');
const eqlBTN = document.getElementById('eql');
const acBTN = document.getElementById('ac');
const delBTN = document.getElementById('del');
const pointBTN = document.getElementById('point');



Calculator = new Calculator(previousOperand, currentOperand, numberBTNs, operationBTNs, eqlBTN, acBTN, delBTN, pointBTN);
