const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".output .value");
const output_result_element = document.querySelector(".result .value");

function updateOutputOperation(operation) {
    output_operation_element.innerHTML = operation;
};

function updateOutputResult(result) {
    output_result_element.innerHTML = result;
};
let calculator_buttons = [
{
    name: "Rad",
    symbol: "Rad",
    formula: false,
    type: "key"
},
{
    name: "Deg",
    symbol: "Deg",
    formula: false,
    type: "key"
},
{
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function"
},
{
    name: "square",
    symbol: "x²",
    formula: "^2",
    type: "math_function"
},
{
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "math_function"
},
{
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "math_function"
},
{
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key"
},
{
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key"
},
{
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number"
},
{
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos",
    type: "trigo_function"
},
{
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function"
},
{
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan",
    type: "trigo_function"
},
{
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number"
},
{
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number"
},
{
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number"
},
{
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator"
},
{
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number"
},
{
    name: "acos",
    symbol: "acos",
    formula: "trigo(Math.acos",
    type: "trigo_function"
},
{
    name: "asin",
    symbol: "asin",
    formula: "trigo(Math.asin",
    type: "trigo_function"
},
{
    name: "atan",
    symbol: "atan",
    formula: "trigo(Math.atan",
    type: "trigo_function"
},
{
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number"
},
{
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number"
},
{
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number"
},
{
    name: "multiplication",
    symbol: "x",
    formula: "*",
    type: "operator"
},
{
    name: "factorial",
    symbol: "x!",
    formula: "FACTORIAL",
    type: "math_function"
},
{
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function"
},
{
    name: "Ln",
    symbol: "Ln",
    formula: "Math.log",
    type: "math_function"
},
{
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function"
},
{
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number"
},
{
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number"
},
{
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number"
},
{
    name: "subtraction",
    symbol: "-",
    formula: "-",
    type: "operator"
},
{
    name: "power",
    symbol: "x^y",
    formula: "POWER(",
    type: "math_function"
},
{
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "math_function"
},
{
    name: "decimal",
    symbol: ".",
    formula: ".",
    type: "number"
},
{
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number"
},
{
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate"
},
{
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator"
}
];

const btns_per_row = 8;
let added_btns = 0;
let row;

calculator_buttons.forEach(button => {
    if (added_btns % btns_per_row == 0) {
        input_element.innerHTML += `<div class="row"></div>`;
        row = document.querySelector(".row:last-child");
    }

    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
    added_btns++;
});
input_element.addEventListener("click", event => {
    const target_btn = event.target;
    calculator_buttons.forEach(button => {
        if (button.name === target_btn.id) calculator(button);
    });
});
let data ={
    operation: [],
    formula: [], 
};
function  calculator(button){
    
    console.log("Button clicked object:", button);
    if (button.type === "key") {
        const Radbtn = document.getElementById("Rad");
        const Degbtn = document.getElementById("Deg");
        if (button.name ==="Rad"){
                RADIAN = true;
                Radbtn.classList.add("active");
                Degbtn.classList.remove("active");
                console.log("Mode changed to: RADIAN = true");
            }
        else if (button.name ==="Deg"){
                RADIAN = false;
                Degbtn.classList.add("active");
                Radbtn.classList.remove("active");
                console.log("Mode changed to: RADIAN = false");
        
        
    }
    if (button.name === "delete") {
            data.operation.pop();
            data.formula.pop();
        }
        else if (button.name ==="clear"){
            data.operation =[];
            data.formula =[];
        }
}
    if (button.type === "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type === "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type === "math_function") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
   
    
    
        
    else if (button.type === "trigo_function") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type ==="calculate"){
    try{
        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);
        let FACTORIALS_NUMBERS = FACTORIALNUMBERGETTER(data.formula, FACTORIAL_SEARCH_RESULT);
        let POWER_SEARCH_RESULT = search(data.formula,POWER);
        let BASES = powerbasegetter(data.formula,POWER_SEARCH_RESULT);
        let formula_str = data.formula.join('');
        let TRIGO_SEARCH_RESULT = search(data.formula, "trigo(");
        let INV_TRIGO_SEARCH_RESULT = search(data.formula, "inv_trigo(");
        let trigo_count =0;
        data.formula.forEach(element=>{
            if (typeof element === 'string'&&element.includes("trigo")){
                trigo_count++;}
            });
        BASES.forEach(base=>{
            let toReplace = base +POWER
            let replacement =" Math.pow("+base+",";
        formula_str = formula_str.replace(toReplace,replacement)
       
        });

FACTORIALS_NUMBERS.forEach(factorial => {
                formula_str = formula_str.replace(factorial.toReplace, factorial.replacement);
            });
    for(let i = 0 ; i< POWER_SEARCH_RESULT.length;i++){
        formula_str+=")";
    }
    for (let i = 0; i < trigo_count; i++) {
                formula_str += ")";
            }
    console.log("Evaluating formula string:", formula_str);
        let result = eval(formula_str);
        updateOutputResult(result);
    }
    catch(Error){
        updateOutputResult("Error")
        console.error("Calc erroe",Error)
    }
}

    updateOutputOperation(data.operation.join(''));
}
function factorial(num){
    if (num %1!==0) return gamma(num+1);
    if (num===0||num === 1 )return 1;
    let result = 1;
    for (let i =1; i<=num; i ++){
        result = result*i;
        if (result === Infinity ) return Infinity;
    }
    return result;
}
function gamma(num){
    let n = num - 1
    var g = 7,
        p = [
            0.99999999999980993,
            676.5203681218851,
            -1259.1392167224028,
            771.3234287776535,
            -176.6150291498386,
            12.507343278686905,
            -0.13857109526572012,
            9.984369578019571e-6,
            1.5056327351493116e-7
        ];
        if (num<0.5){
            return Math.PI/(Math.sin(Math.PI*num)*gamma(1-num));

        }
        else{
            n--;
            var x = p[0];
            for (var i =1 ; i<g+2;i++){
                x += p[i]/(n+i);
            }
            var t = n+g+0.5;
            return Math.sqrt(2*Math.PI)*Math.pow(t,n+0.5)*Math.exp(-t)*x;
        }
}
const POWER ="POWER("

function search(array,keyword){
    let result_array =[];
    array.forEach((element,index) =>{
        if(keyword == element) result_array.push(index)
    });
    return result_array
}
function powerbasegetter(formula,search_result){
    let power_bases = [];
    search_result.forEach(power_index=>{
       let  index =power_index-1;
       let parentheses_count =0;
       let base = [];
        while (index>=0){
            if (formula[index]=="(") parentheses_count--;
            if (formula[index]==")") parentheses_count++;
            is_operator = formula[index]==["+","-","/","*"].includes()
            is_power = formula[index] == POWER
            if((is_operator&&parentheses_count===0)||is_power)break;
        
            base.unshift(formula[index]);
            index = index-1;
        }
        power_bases.push(base.join(''));
    });
    return power_bases
}

const FACTORIAL ="FACTORIAL"
function FACTORIALNUMBERGETTER(formula,search_result){
        let factorials_numbers =[];
        let factorial_sequence = 0;
        
        search_result.forEach((index,i)=>{
            let number =[];
            let next_input_index = index+1
            let next_input = formula[next_input_index];
            if(next_input== FACTORIAL){
                factorial_sequence+=1;
                return;
            }
            let first_factorial_index = index - factorial_sequence;
            let previous_input_index = first_factorial_index-1;
            let parenthese_count = 0;
            while(previous_input_index>=0){
                if (formula[previous_input_index]=="(")parentheses_count--;
                if (formula[previous_input_index]==")")parentheses_count++;
                is_operator = formula[previous_input_index] == ["+","-","/","*"].includes(formula[previous_input_index]);
                if((is_operator&& parenthese_count ===0)) break;
                number.unshift (formula[previous_input_index]);
                previous_input_index--;
        }
        number_str = number.join('');
        let factorial ="factorial(";
        let close_parentheses =")";
        let times = factorial_sequence +1;
        let toReplace = number_str + FACTORIAL.repeat(times);
        let replacement = factorial.repeat(times)+number_str+close_parentheses.repeat(times);
        factorials_numbers.push({
            toReplace: toReplace ,
            replacement:replacement
        });
        factorial_sequence=0;
        
    });
    return factorials_numbers

}
let RADIAN = true;
function trigo(callback,angle){
    if(!RADIAN){
        angle = angle*Math.PI/180;
    }
    return callback(angle);
}
function inv_trigo(callback,value){
    let angle = callback(value);
    if(!RADIAN){
        angle=angle*180/Math.PI;
    }
    return angle;
}
