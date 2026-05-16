//black magic in order to change value when values are changed
class CalculatorState {
  #storedValue = null;
  #currentOperator = null;

  get storedValue() { return this.#storedValue; }
  set storedValue(v) {
    if (v === null){
      document.getElementById("operation_status").innerHTML = "";
    } else {
      document.getElementById("operation_status").innerHTML = "Current operation:<br>" + v;
    }
    this.#storedValue = v; 
  }

  get currentOperator() { return this.#currentOperator; }
  set currentOperator(v) {
    if (v === null){
      document.getElementById("operation_status").innerHTML = "";
    } else {
      document.getElementById("operation_status").innerHTML = document.getElementById("operation_status").innerHTML + " " + v;
    }

    this.#currentOperator = v; 
  }
}

const state = new CalculatorState();


document.addEventListener("DOMContentLoaded", () => {

  //dropdown list
  let currentAction = "btn1";
  document.getElementById("chosenBtn").addEventListener("click", () => {
    switch (currentAction) {
      case "btn1":
        setSoloOperator("1/x");
        break;
      case "btn2":
        setSoloOperator("sin(x)");
        break;
      case "btn3":
        setSoloOperator("cos(x)");
        break;
      case "btn4":
        setSoloOperator("tan(x)");
        break;
      case "btn5":
        setSoloOperator("e^x");
        break;
      case "btn6":
        setSoloOperator("ln(x)");
        break;
      case "btn7":
        setSoloOperator("√x");
        break;
      case "btn8":
        setSoloOperator("arcsin(x)");
        break;
      case "btn9":
        setSoloOperator("arccos(x)");
        break;
      case "btn10":
        setSoloOperator("arctan(x)");
        break;
      case "btn11":
        setOperator("x√y");
        break;
      case "btn12":
        setOperator("x^y");
        break;
      case "btn13":
        setOperator("logx(y)");
        break;
      case "btn14":
        setSoloOperator("x!");
        break;
    }
  });

  const toggleBtn = document.getElementById("toggleBtn");
  const dropdown = document.getElementById("dropdown");
  
  toggleBtn.addEventListener("click", () => {
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      overlay.style.display = "none";
    } else {
      dropdown.style.display = "block";
      overlay.style.display = "block";
    }
  });

  dropdown.addEventListener("click", (e) => {
    if (e.target.dataset.action) {
      currentAction = e.target.dataset.action;
      document.getElementById("chosenBtn").innerHTML = e.target.innerHTML;
      dropdown.style.display = "none";
      overlay.style.display = "none";
    }
  });

  const overlay = document.getElementById("overlay");
  overlay.addEventListener("click", () => {
    dropdown.style.display = "none";
    overlay.style.display = "none";
  });


  //Alerts
  setAlert("alert");

  //normal buttons
  document.getElementById("nine_button").addEventListener("click", () => insertDigit("9"));
  document.getElementById("eight_button").addEventListener("click", () => insertDigit("8"));
  document.getElementById("seven_button").addEventListener("click", () => insertDigit("7"));
  document.getElementById("six_button").addEventListener("click", () => insertDigit("6"));
  document.getElementById("five_button").addEventListener("click", () => insertDigit("5"));
  document.getElementById("four_button").addEventListener("click", () => insertDigit("4"));
  document.getElementById("three_button").addEventListener("click", () => insertDigit("3"));
  document.getElementById("two_button").addEventListener("click", () => insertDigit("2"));
  document.getElementById("one_button").addEventListener("click", () => insertDigit("1"));
  document.getElementById("zero_button").addEventListener("click", () => insertDigit("0"));

  document.getElementById("change_sign_button").addEventListener("click", toggleSign);
  document.getElementById("decimal_dot_button").addEventListener("click", insertDecimalDot);
  document.getElementById("delete_symbol_button").addEventListener("click", deleteSymbol);
  document.getElementById("clear_entry_button").addEventListener("click", () => document.getElementById("text_field").value = "0");
  document.getElementById("clear_all_button").addEventListener("click", clearAll);

  //operator buttons
  document.getElementById("plus_button").addEventListener("click", () => setOperator("+"));
  document.getElementById("minus_button").addEventListener("click", () => setOperator("-"));
  document.getElementById("multiply_button").addEventListener("click", () => setOperator("×"));
  document.getElementById("divide_button").addEventListener("click", () => setOperator("÷"));
  document.getElementById("equal_button").addEventListener("click", equal);
});

function setAlert(alert){
  document.getElementById(alert).addEventListener("click", (e) => {
    if (!document.getElementById(alert + "_content").contains(e.target)) {
      document.getElementById(alert).style.display = "none";
    }
  });

  document.getElementById("close_" + alert).onclick = () => document.getElementById(alert).style.display = "none";
}

function throwAlert(text){
  document.getElementById("alert_text").innerHTML = text;
  document.getElementById("alert").style.display = "flex";

}

function insertDigit(digit) {
  const input = document.getElementById("text_field");
  const digitsOnly = input.value.replace(/[^0-9]/g, "");
  if (digitsOnly.length < 8) {
    if (input.value === "0") {
      input.value = digit;
    } else {
      input.value = input.value + digit;
    }
  } else {
    throwAlert("You are trying to enter too long number");
  }
}


function toggleSign() {
  const input = document.getElementById("text_field");
  const value = input.value;

  if (value === "0" || value === "0.") {
    return;
  }

  if (value.startsWith("-")) {
    input.value = value.substring(1);
  } else {
    input.value = "-" + value;
  }
}

function insertDecimalDot() {
  const input = document.getElementById("text_field");
  const digitsOnly = input.value.replace(/[^0-9]/g, "");

  if ( (digitsOnly.length >= 8) || (input.value.includes("."))) {
    throwAlert("You are trying to enter extra dot where is no space for it");
    return;
  }

  input.value = input.value + ".";
}

function deleteSymbol() {
    const input = document.getElementById("text_field");
    let value = input.value;

    value = value.slice(0, -1);


    if (value === "" || value === "-" || value === "0") {
        input.value = "0";
    } else {
        input.value = value;
    }
}

function clearAll() {
  state.storedValue = null;
  state.currentOperator = null;
  document.getElementById("text_field").value = "0";
}


//computational mecanics
function setOperator(operator) {
  const input = document.getElementById("text_field");
  const value = parseFloat(input.value);

  if (state.storedValue === null) {
    state.storedValue = value;
  } else if (state.currentOperator) {
    let formatted = formatNumber(calculate(state.storedValue, value, state.currentOperator));
    if (formatted === null) {
      input.value = 0;
      state.storedValue = null;
      state.currentOperator = null;
      return;
    }
    state.storedValue = parseFloat(formatted);
    input.value = state.storedValue;
  }

  state.currentOperator = operator;
  input.value = "0";
}

function calculate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": 
      if (b === 0) {
        throwAlert("You can't divide by zero");
        return 0;
      }
      return a / b;
    case "x√y":
      if (a == 0){
        throwAlert("You can't divide by zero");
        return 0;
      }
      if ((b < 0) && ((!Number.isInteger(a)) || ((Number.isInteger(a)) && ((a % 2) === 0)))){
        throwAlert("Root of this number is not a number");
        return 0;
      }
      return Math.pow(b, 1 / a);
    case "x^y":
      let result = Math.pow(a, b);

      if (Number.isNaN(result) || !Number.isFinite(result)) {
        throwAlert("Such power is not a number");
        return 0;
      }

      return result;
    case "logx(y)":
      if ((a <= 0) || (a === 1) || (b <= 0)) {
        throwAlert("Such log is not a number");
        return 0;
      }

      return Math.log(b) / Math.log(a);
      }
}

function formatNumber(value) {
  if (Object.is(value, -0)) value = 0;

  let num = Number(value.toFixed(7));
  let str = num.toString();

  let parts = str.split(".");
  let intPart = parts[0].replace("-", "");
  let fracPart = parts[1] || "";

  if (intPart.length > 8) {
    throwAlert("Your value<br>(" + value + ")<br>is too long");
    return null;
  }

  let totalDigits = intPart.length + fracPart.length;

  if (totalDigits > 8) {
    let allowedFracLen = 8 - intPart.length;
    fracPart = fracPart.substring(0, allowedFracLen);
  }

  return fracPart.length > 0 ? parts[0] + "." + fracPart : parts[0];
}

function formatResult(value) {
  const input = document.getElementById("text_field");
  const formatted = formatNumber(value);

  if (formatted === null) {
    input.value = 0;
    state.storedValue = null;
    state.currentOperator = null;
  } else {
    input.value = formatted;
  }
}

function equal() {
  const input = document.getElementById("text_field");
  const value = parseFloat(input.value);

  if (state.storedValue !== null && state.currentOperator) {
    state.storedValue = calculate(state.storedValue, value, state.currentOperator);
    formatResult(state.storedValue);
    state.currentOperator = null;
    state.storedValue = null;
  } else {
    formatResult(value);
  }
}

function setSoloOperator(operator) {
  state.currentOperator = null;
  state.storedValue = null; //just in name of beuty
  const input = document.getElementById("text_field");
  formatResult(calculateSolo(parseFloat(input.value), operator));
}

function factorialRec(n) {
  if (n === 0) {
    return 1;
  }
  if (n >= 12){ //12! is 479 001 600 which is muuch longer than max number 99 999 999
    return null;
  }
  return n * factorialRec(n - 1);
  
}


function calculateSolo(a, operator) {
  switch (operator) {
    case "1/x": 
      if (a === 0) {
        throwAlert("You can't divide by zero");
        return 0;
      }
      return 1 / a;
    case "sin(x)": return Math.sin(a);
    case "cos(x)": return Math.cos(a);
    case "tan(x)": return Math.tan(a); //never infinity, because I allow 8 digits at maximum
    case "e^x": return Math.exp(a);
    case "ln(x)": 
      if (a <= 0){
        throwAlert("ln of this number is not a number");
        return 0;
      }
      return Math.log(a);
    case "√x":
      if (a < 0){
        throwAlert("Square root of this number is not a number");
        return 0;
      }
      return Math.sqrt(a);
    case "arcsin(x)":
      if ((a > 1) || (a < -1) ){
        throwAlert("arcsin of this number is not a number");
        return 0;
      }
      return Math.asin(a);
    case "arccos(x)":
      if ((a > 1) || (a < -1) ){
        throwAlert("arccos of this number is not a number");
        return 0;
      }
      return Math.acos(a);
    case "arctan(x)":
      if (a < -Math.PI / 2 || a > Math.PI / 2) {
        throwAlert("arctan of this number is not a number");
        return 0;
      }
      return Math.atan(a);
    case "x!":
      if ((a < 0) || (!Number.isInteger(a))){
        throwAlert("This number has no factorial");
        return 0;
      }
      let result = factorialRec(a);

      if (!Number.isInteger(result)) {
        throwAlert("Your value<br>(" + result + ")<br>is too long");
        return 0;
      }

      return result;
  }
}
