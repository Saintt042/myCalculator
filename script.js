// How calculator actually works, working mechanism... lol

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        //this will clear only the last number on the string
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        //this makes the . be clickable just once.
        if (number === '.' && this.currentOperand.includes('.')) return
        //this makes numbers to keep adding together
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
         //if the previous operand is not equal to an empty string
        if (this.currentOperand ==='') return
        //automatically calculates results if an arithmetic symbol is pressed instead of equals to symbol
        if (this.previousOperand !== '') {
            this.compute()
        }
        //this makes it so when  we are done inputing numbers, whenever we add our arithmetic symbols, it clears from current operand up to the previous operand
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break

                case '-':
                    computation = prev - current
                    break

                    case '*':
                        computation = prev * current
                        break

                        case '÷':
                            computation = prev / current
                            break
        default:
            return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
       
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
         this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    
    }
}





// first we get all our constant variables by using const for the numberButtons, query by using document.querySelectorAll: this gets all elements with same attributes in our case, numbers

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')





const calculator = new Calculator(previousOperandTextElement, 
currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
   })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
   })
})

//we add cummute 

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})



allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})