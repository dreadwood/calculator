'use strict';

const numberBtns = document.querySelectorAll(`[data-number]`);
const operationBtns = document.querySelectorAll(`[data-operation]`);
const equalsBtn = document.querySelector(`[data-equals]`);
const deleteBtn = document.querySelector(`[data-delete]`);
const clearBtn = document.querySelector(`[data-clear]`);
const previousOperandTextElement = document.querySelector(`[data-previous-operand]`);
const currentOperandTextElement = document.querySelector(`[data-current-operand]`);

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = ``;
    this.previousOperand = ``;
    this.operation = null;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slise(0, -1);
  }

  appendNumber(number) {
    if (number === `.` && this.currentOperand.includes(`.`)) {
      return;
    }

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === ``) {
      return;
    }


    if (operation === `√`) {
      this.operation = operation;
      this.compute();
      return;
    }

    if (this.previousOperand !== ``) {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand.toString() + ` ` + operation.toString();
    this.currentOperand = ``;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // if (isNaN(prev) || isNaN(current)) {
    //   return;
    // }

    switch (this.operation) {
      case `+`:
        computation = prev + current;
        break;
      case `-`:
        computation = prev - current;
        break;
      case `*`:
        computation = prev * current;
        break;
      case `÷`:
        computation = prev / current;
        break;
      case `√`:
        computation = Math.sqrt(current);
        break;
      case `^`:
        computation = Math.pow(prev, current);
        break;
      default:
        return;
    }

    if (isNaN(computation)) {
      return;
    }

    this.currentOperand = computation;
    this.operation = null;
    this.previousOperand = ``;
  }

  printError() {
    this.currentOperandElement.innerText = `Error`;
    this.previousOperandElement.innerText = ``;
    this.clear();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString(); // string
    const integerDigits = parseFloat(stringNumber.split(`.`)[0]);
    const decimalDigits = stringNumber.split(`.`)[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = ``;
    } else {
      integerDisplay = integerDigits.toLocaleString(`ru`, {maximumFractionDigits: 0});
    }

    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.operation === `√`) {
      this.printError();
      return;
    }

    this.currentOperandElement.innerText =
      this.getDisplayNumber(this.currentOperand);

    if (this.operation !== null) {
      this.previousOperandElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.innerText = ``;
    }
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberBtns.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener(`click`, () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener(`click`, () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearBtn.addEventListener(`click`, () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener(`click`, () => {
  calculator.delete();
  calculator.updateDisplay();
});
