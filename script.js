class Calculator {
    operationList = [];
    stack = [];
    output = [];

    precedence = new Map([
        ["+", 2],
        ["-", 2],
        ["*", 3],
        ["/", 3],
        ["^", 4],
        ["(", 5],
        ["%", 4]
    ])

    constructor(expressionDisplay, inputDisplay, numberBTNs, operationBTNs, eqlBTN, acBTN, delBTN, pointBTN, parenthesis) {
        this.expressionDisplay = expressionDisplay;
        this.inputDisplay = inputDisplay;
        this.numberBTNs = numberBTNs;
        this.operationBTNs = operationBTNs;
        this.eqlBTN = eqlBTN;
        this.acBTN = acBTN;
        this.delBTN = delBTN;
        this.pointBTN = pointBTN;
        this.parenthesisBTN = parenthesis;

        this.numberBTNs.forEach((number) => {
            number.addEventListener('click', () => {
                this.appendNumber(number.innerText)
            })
        })

        this.operationBTNs.forEach((operation) => {
            operation.addEventListener('click', () => {
                this.chooseOperation(operation.innerText)
            })
        })

        this.parenthesisBTN.forEach((symbol) => {
            symbol.addEventListener('click', () => {
                this.appendParenthesis(symbol.innerText)
            })
        })

        for (let i = 0; i < this.operationBTNs.length; i++) {
            this.operationList.push(this.operationBTNs[i].innerText);
        }

        eqlBTN.addEventListener('click', () => {
            this.reversePOlNotation();
            this.calculate();
        })

        acBTN.addEventListener('click', () => {
            this.clearAll();
        })

        delBTN.addEventListener('click', () => {
            this.delSymbol();
        })

        pointBTN.addEventListener('click', () => {
            this.appendPoint();
        })
    }

    canAddPoint(expression) {
        if (expression.length === 0) {
            return true;
        }

        let lastChar = expression.slice(-1);

        if (this.isOperator(lastChar) || this.isParenthesis(lastChar)) {
            return false;
        }

        let currentNumber = '';
        for (let i = expression.length - 1; i >= 0; i--) {
            if (this.isOperator(expression[i]) || this.isParenthesis(expression[i])) {
                break;
            }
            currentNumber = expression[i] + currentNumber;
        }
        return !currentNumber.includes('.');

    }

    appendPoint() {
        const expression = this.inputDisplay.innerText;
        if (expression.length === 0) {
            this.inputDisplay.innerText = '0.';
            return;
        }
        if (this.canAddPoint(expression)) {
            this.inputDisplay.innerText += '.';
        }
    }

    calculate() {
        this.output.forEach((i) => {
            if (this.isOperator(i)) {
                let b = this.stack.pop()
                let a = this.stack.pop()
                switch (i) {
                    case '+':
                        this.stack.push(a + b)
                        break;
                    case '-':
                        this.stack.push(a - b)
                        break;
                    case '*':
                        this.stack.push(a * b)
                        break;
                    case '/':
                        this.stack.push(a / b)
                        break;
                    case '^':
                        this.stack.push(a ** b)
                        break;
                    case '%':
                        this.stack.push((a / 100) * b)
                        break;
                }
            } else {
                this.stack.push(i)
            }
        })
        const result = this.stack.pop();
        let resultStr = result.toString();
        if (resultStr.length > 12) {
            this.inputDisplay.innerText = result.toExponential(6);
        } else {
            this.inputDisplay.innerText = resultStr;
        }
    }


    isOperator(i) {
        return this.operationList.includes(i)
    }

    isParenthesis(i) {
        return i === '(' || i === ')'
    }

    isHigherPrecedence(i, lastSymbol) {
        return this.precedence.get(i) > this.precedence.get(lastSymbol) || this.stack.length === 0 || lastSymbol === '('
    }

    reversePOlNotation() {
        this.expressionDisplay.innerText = this.inputDisplay.innerText
        let expression = [...this.expressionDisplay.innerText]
        console.log(expression)
        let str = ''
        expression.forEach((i) => {
            if (this.isOperator(i)) {
                let lastSymbol = this.stack.at(this.stack.length - 1)
                this.output.push(parseInt(str))
                str = ''
                if (this.isHigherPrecedence(i, lastSymbol)) {
                    this.stack.push(i)
                }
                else {
                    this.output.push(this.stack.pop())
                    this.stack.push(i)
                }
            } else if (this.isParenthesis(i)) {
                if (i === '(') {
                    this.stack.push(i)
                } else {
                    if (str !== '') {
                        this.output.push(parseInt(str))
                        str = ''
                    }
                    while (this.stack.length > 0 && this.stack.at(this.stack.length - 1) !== '(') {
                        this.output.push(this.stack.pop())
                    }
                    this.stack.pop()
                }
            }
            else {
                str += i;
            }
        })
        if (str !== '') {
            this.output.push(parseInt(str))
        }
        while (this.stack.length > 0) {
            this.output.push(this.stack.pop())
        }
        console.log(this.output)
    }

    clearAll() {
        this.inputDisplay.innerText = '';
        this.expressionDisplay.innerText = '';
    }

    delSymbol() {
        this.inputDisplay.innerText = this.inputDisplay.innerText.slice(0, -1);
    }

    appendNumber(number) {
        this.inputDisplay.innerText += number;
    }

    appendParenthesis(symbol) {
        if (symbol == ')') {
            for (let i = 0; i < this.inputDisplay.innerText.length; i++) {
                if (!this.inputDisplay.innerText.includes('(')) {
                    return;
                }
            }
        }

        let lastSymbol = inputDisplay.innerText.slice(-1);
        if (symbol == '(') {
            for (let i = 0; i < this.operationList.length; i++) {
                if (!this.operationList.includes(lastSymbol)) {
                    this.inputDisplay.innerText += '*';
                    break;
                }
            };
            this.inputDisplay.innerText += '(';
        } else if (symbol == ')') {
            this.inputDisplay.innerText += ')';
        }
    }

    chooseOperation(operation) {
        let lastSymbol = inputDisplay.innerText.slice(-1);
        for (let i = 0; i < this.operationList.length; i++) {
            if (lastSymbol === this.operationList[i]) {
                this.inputDisplay.innerText = this.inputDisplay.innerText.slice(0, -1);
                break;
            } else if (lastSymbol === '(') {
                break
            }
        };
        this.inputDisplay.innerText += operation;
    }
}

const expressionDisplay = document.querySelector('.expression-display');
const inputDisplay = document.querySelector('.input-display');
const numberBTNs = document.querySelectorAll('.number');
const operationBTNs = document.querySelectorAll('.operator');
const eqlBTN = document.getElementById('eql');
const acBTN = document.getElementById('ac');
const delBTN = document.getElementById('del');
const pointBTN = document.getElementById('point');
const parenthesis = document.querySelectorAll('.parenthesis')

Calculator = new Calculator(expressionDisplay, inputDisplay, numberBTNs, operationBTNs, eqlBTN, acBTN, delBTN, pointBTN, parenthesis);