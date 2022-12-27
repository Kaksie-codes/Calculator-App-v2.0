//storing all the html we want to manipulate in javascript variables
const previousScreen = document.querySelector(".display-2");
const currentScreen = document.querySelector(".display-1");
const tempResultScreen = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operator");
const equalEl = document.querySelector(".equals");
const clearAllEl = document.querySelector(".clear");
const clearLastEntryEl = document.querySelector(".clearEntry");
const deleteEl = document.querySelector('.delete');
const signChangeEl = document.querySelector('.signChange');


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
        
        if(currentOperand.length > 24) return
        
         
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
    // if(isNaN(result) || isNaN(currentOperand)) return
    if(currentOperand.length > 16){
        currentScreen.style.fontSize = '2rem'
    }else if(currentOperand.length > 14){
        currentScreen.style.fontSize = '3rem'
    }
    else{
        currentScreen.style.fontSize = '3.5rem'
    }
    previousScreen.textContent = previousOperand;
    currentScreen.textContent = currentOperand;    
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
        previousOperand += currentOperand + ' ' + currentOperator + " ";
        currentOperand = '';
        updateDisplay();
        currentScreen.textContent = '0'; 
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
    // currentScreen.value = '0';   
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
    currentScreen.textContent = '0';
} )

clearLastEntryEl.addEventListener('click', () => {
    console.log('clearing entry...')
    
    currentOperand = '';
    updateDisplay()
    currentScreen.textContent = '0';
})

deleteEl.addEventListener('click', () => {
    if(currentOperand.length < 1){
        currentScreen.value = '0';
        return
    }
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay()    
})

signChangeEl.addEventListener('click', () => {
    currentOperand = Number(currentOperand) * -1;
    updateDisplay()
})





