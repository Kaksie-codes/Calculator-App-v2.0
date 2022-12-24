//storing all the html we want to manipulate in javascript variables
const previousScreen = document.querySelector(".display-1");
const currentScreen = document.querySelector(".display-2");
const tempResultScreen = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEntryEl = document.querySelector(".last-entity-clear");


//lets keep track of the operands and operators
let currentOperand = '';
let previousOperand = '';
let currentOperator = '';
let result = '';

/*add click event listeners to all numbers, once a number is clicked,
 update the Currentscreen and the currentOperand variables
*/
numbersEl.forEach(num => {
    num.addEventListener('click', () => {
        //use object destruction to save the value of any clicked button to the variable called number
        const {textContent: number} = num;

        //prevent the operand from having more than 1 decimal point
        if(currentOperand.includes('.') && number === '.') return        
        
         
        if(previousOperand && !currentOperand){
            currentOperand = '';
        }
        
        //update the value of the currentOperand with the number clicked.
        currentOperand += number;
        currentOperand = currentOperand.replace(/^00/, '0')
        // if(currentOperand.match(/^00/) && number === "0" && currentOperand.match(/^00/)) return
        updateDisplay();               
    })
})

function updateDisplay(){
    if(isNaN(result) || isNaN(currentOperand)) return
    previousScreen.textContent = previousOperand;
    currentScreen.textContent = currentOperand;
    tempResultScreen.textContent = result;
}

/*add click event listeners to all the operators, once an operator is clicked,
update the display, update the variables*/
operationEl.forEach(op => {
    op.addEventListener('click', () => {
        //use object destructuring to store the value of the operator clicked in the variable operator
        const {textContent: operator} = op;        
        //prevent the operator from being selected if we do not have any operand
        if(!currentOperand) return
        
        //if we have the two operands, run the calculate function
        if(currentOperand && previousOperand && currentOperator){
            calculate();            
        }else{
            result = currentOperand;            
        }
        currentOperator = operator;
        previousOperand += currentOperand + ' ' + currentOperator + " "
        updateDisplay();
        currentOperand = '';
        
    })
})

equalEl.addEventListener('click', () => {
    // // result = currentOperand;
    if(!result) return
    // console.log(result)
    // if(!currentOperand){
    //     currentOperand = result;
    // }
    calculate();
    previousOperand += currentOperand;
    currentOperand = result;
    result = '';
    updateDisplay()
    previousOperand = '';    
})

function calculate(){
    if(currentOperator === '-'){
        result = Number(result) - Number(currentOperand);
    }else if(currentOperator === '÷'){
        result = Number(result) / Number(currentOperand);
    }else if(currentOperator === '+'){
        result = Number(result) + Number(currentOperand);
    }else if(currentOperator === '%'){
        result = Number(result) % Number(currentOperand);
    }else if(currentOperator === '×'){
        result = Number(result) * Number(currentOperand);
    }
}

//reset everything once clear all btn is clicked
clearAllEl.addEventListener('click', () => {
    previousOperand = '';
    currentOperand = '';    
    currentOperator = '';
    result = '';    
    updateDisplay()
} )

clearLastEntryEl.addEventListener('click', () => {
    currentOperand = '';
    updateDisplay()
})









