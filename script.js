class Calculator {
    operationList = [];
    stack = [];
    output = [];

    precedence = new Map ([
        ["+", 2],
        ["-", 2],
        ["*", 3],
        ["/", 3],
        ["^", 4],
        ["(", 5],
        ["%", 4]
    ])
    
    constructor(previousOperand, currentOperand, numberBTNs, operationBTNs, eqlBTN, acBTN, delBTN, pointBTN, parenthesis) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
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

    canAddPoint(expression){ 
        if(expression.length === 0){
            return true;
        }

        let lastChar = expression.slice(-1);

        if(this.isOperator(lastChar) || this.isParenthesis(lastChar)){
            return false;
        }

        let currentNumber = '';
        for (let i = expression.length - 1; i >= 0; i--) {
            if(this.isOperator(expression[i]) || this.isParenthesis(expression[i])){
                break;
            }
            currentNumber = expression[i] + currentNumber;
        }
        return !currentNumber.includes('.');

    }

    appendPoint() {
        const expression = this.currentOperand.innerText;
        let lastChar = expression.slice(-1);
        if(expression.length === 0 || this.isOperator(lastChar) || this.isParenthesis(lastChar)){
            this.currentOperand.innerText += '0.';
            return;
        }

        if(this.canAddPoint(expression)){
            this.currentOperand.innerText += '.';
        }
    }

    calculate() {   
        this.output.forEach((i) => {
            if(this.isOperator(i)){
                let b = this.stack.pop()
                let a = this.stack.pop()
                switch(i){
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
            let scientific = result.toExponential(8);
            scientific = scientific.replace(/(\.\d*?[1-9])0+e/, '$1e');
            this.currentOperand.innerText = scientific;
        } else {
            resultStr = resultStr.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
            this.currentOperand.innerText = resultStr;
        }    
    }


    isOperator(i){
        return this.operationList.includes(i)
    }

    isParenthesis(i){
        return i === '(' || i === ')'
    }

    isHigherPrecedence(i, lastSymbol){
        return this.precedence.get(i) > this.precedence.get(lastSymbol) || this.stack.length === 0 || lastSymbol === '('
    }

    reversePOlNotation(){
        this.previousOperand.innerText = this.currentOperand.innerText + '=' 
        let expression = [...this.previousOperand.innerText]
        console.log(expression)
        let str = ''
        expression.forEach((i) => {
             if(this.isOperator(i)){
                let lastSymbol = this.stack.at(this.stack.length - 1)
                this.output.push(parseInt(str))
                str = ''
                if(this.isHigherPrecedence(i, lastSymbol)){
                    this.stack.push(i)
                }
                else {
                    this.output.push(this.stack.pop())
                    this.stack.push(i)
                }
            } else if(this.isParenthesis(i)){
                if(i === '('){
                    this.stack.push(i)
                } else {
                    if(str !== ''){
                        this.output.push(parseInt(str))
                        str = ''
                    }                    
                    while(this.stack.length > 0 && this.stack.at(this.stack.length - 1) !== '('){
                        this.output.push(this.stack.pop())
                    }
                    this.stack.pop()
                }
            }
            else  {
                str += i;
            }
        })
        if(str !== ''){
            this.output.push(parseInt(str))
        }
        while(this.stack.length > 0){
            this.output.push(this.stack.pop())
        }   
        console.log(this.output)
    }

    clearAll() {
        this.currentOperand.innerText = '';
        this.previousOperand.innerText = '';
    }

    delSymbol() {
        this.currentOperand.innerText = this.currentOperand.innerText.slice(0, -1);
    }

    appendNumber(number) {
        this.currentOperand.innerText += number;
    }

    appendParenthesis(symbol){
        if(symbol == ')'){
            for (let i = 0; i < this.currentOperand.innerText.length; i++) {
                if(!this.currentOperand.innerText.includes('(')){
                    return;
                }
            }
        }

        let lastSymbol = currentOperand.innerText.slice(-1);
        if(symbol == '('){
            for (let i = 0; i < this.operationList.length; i++) {
                if(!this.operationList.includes(lastSymbol)){
                    this.currentOperand.innerText += '*';
                    break;
                } 
            };
            this.currentOperand.innerText += '(';
        } else if(symbol == ')'){
            this.currentOperand.innerText += ')';
        }
    }

    chooseOperation(operation) {
        this.currentOperand.innerText += operation;
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
const parenthesis = document.querySelectorAll('.parenthesis')

Calculator = new Calculator(previousOperand, currentOperand, numberBTNs, operationBTNs, eqlBTN, acBTN, delBTN, pointBTN, parenthesis);
