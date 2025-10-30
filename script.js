class Calculator {
    operationList = ['(', ')', '.'];
    stack = [];
    output = [];

    precedence = new Map ([
        ["+", 2],
        ["-", 2],
        ["*", 3],
        ["/", 3],
        ["^", 4],
        ["(", 5]
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
            this.calculate();
            this.reversePOlNotationConv();
        })

        acBTN.addEventListener('click', () => {
            this.clearAll();
        })

        delBTN.addEventListener('click', () => {
            this.delSymbol();
        })
    }

    calculate() {   
        this.previousOperand.innerText += this.currentOperand.innerText 
        // let operator = previousOperand.innerText.slice(-1);
        // switch (operator) {
        //     case '+':
        //         this.currentOperand.innerText = parseFloat(this.previousOperand.innerText) + parseFloat(this.currentOperand.innerText);
        //         this.previousOperand.innerText = '';
        //         break;
        //     case '-':
        //         this.currentOperand.innerText = parseFloat(this.previousOperand.innerText) - parseFloat(this.currentOperand.innerText);
        //         this.previousOperand.innerText = '';
        //         break;
        //     case '/':
        //         this.currentOperand.innerText = parseFloat(this.previousOperand.innerText) / parseFloat(this.currentOperand.innerText);
        //         this.previousOperand.innerText = '';
        //         break;
        //     case '*':
        //         this.currentOperand.innerText = parseFloat(this.previousOperand.innerText) * parseFloat(this.currentOperand.innerText);
        //         this.previousOperand.innerText = '';
        //         break;
        //     case '%':
        //         this.currentOperand.innerText = parseFloat(this.currentOperand.innerText / 100) * parseFloat(this.previousOperand.innerText);
        //         this.previousOperand.innerText = '';
        //         break;
        // }
    }

    isOperator(i){
        return this.operationList.includes(i)
    }

    reversePOlNotationConv(){
        let expression = [...this.previousOperand.innerText]
        console.log(expression)
        let str = ''
        expression.forEach((i) => {
            console.log(i)
             if(this.isOperator(i)){
                let lastSymbol = this.stack.at(this.stack.length - 1)
                console.log("str: " + str)
                this.output.push(parseInt(str))
                str = ''
                if(this.precedence.get(i) > this.precedence.get(lastSymbol) || this.stack.length === 0){
                    console.log("pr: " + i)
                    this.stack.push(i)
                }
                else{
                    this.output.push(this.stack.pop())
                }
                } else  {
                    str += i;
            }
        })
        console.log(this.stack)
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
        for (let i = 0; i < this.operationList.length; i++) {
            if (this.currentOperand.innerText === this.operationList[i]) {
                this.previousOperand.innerText += this.currentOperand.innerText;
                this.currentOperand.innerText = '';
            }
        }
        // if (this.currentOperand.innerText === '0') {
        //     this.currentOperand.innerText = '';
        // }
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
        this.previousOperand.innerText += this.currentOperand.innerText;
        this.currentOperand.innerText = operation;
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
