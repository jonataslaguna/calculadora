const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ""
  }

  // adicionar dígito à tela da calculadora
  addDigit(digit) {
    console.log(digit)
    // Verificar se já tem um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return
    }

    this.currentOperation = digit
    this.updateScreen()
  }

  // processar todas as operações da calculadora
  processOperation(operation) {
    // Checar se o valor atual(current) está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Akterar operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation)
      }
      return;
    }

    // Pegar os valores de current e previous
    let operationValue
    let previous = +this.previousOperationText.innerText.split(" ")[0]
    let current = +this.currentOperationText.innerText

    switch (operation) {
      case "+":
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous)
        break;
      case "/":
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case "Del":
        this.processDelOperator()
        break
      case "CE":
        this.processClearCurrentOperator()
        break
      case "C":
        this.processClearAll()
        break
      case "=":
        this.processEqualOperator()
        break
      default:
        return
    }
  }

  // Mudar os valores da tela da calculadora
  updateScreen(
    operationValue = null, operation = null, current = null, previous = null) {
    if (operationValue === null) {
      //Anexar número ao valor atual
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // Checar se o valor é zero, se for apenas adicione o valor atual
      if (previous === 0) {
        operationValue = current
      }
      // Adicionar valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = ""
    }
  }

  // Mudar opreção matemática
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"]

    if (!mathOperations.includes(operation)) {
      return
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation
  }

  // Deletar o digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }

  // Limpar a opreção atual(current)
  processClearCurrentOperator() {
    this.currentOperationText.innerText = ""
  }

  // Limpar todas as operações
  processClearAll() {
    this.currentOperationText.innerText = ""
    this.previousOperationText.innerText = ""
  }

  // Precessar uma operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1]
    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText

    if (+value >= 0 || value === ".") {
      console.log(value)
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
    }
  }
  )
})