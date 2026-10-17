const input_element = document.querySelector(".input");
let calculator_buttons = [

{
    name :"delete",
    symbol:"⌫",
    formula: false,
    type : "key"
},

{
    name: "multiplication",
    symbol: "x",
    formula: "*",
    type: "operator"

},
{
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator"
},
{
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator"
},
{
    name: "subtraction",
    symbol: "-",
    formula: "-",
    type: "operator"            
},
{
    name: 1,
    symbol: 1,
    formula: 1,
    type: "number"
},
{
    name: 2,
    symbol: 2,
    formula: 2,
    type: "number"
},
{
    name: 3,
    symbol: 3,
    formula: 3,
    type: "number" 
},
{
    name: 4,
    symbol: 4,
    formula: 4,
    type: "number"
},
{
    name: 5,
    symbol: 5,
    formula: 5,
    type: "number"
},
{
    name: 6,
    symbol: 6,
    formula: 6,
    type: "number"
},
{
    name: 7,
    symbol: 7,
    formula: 7,
    type: "number"
} ,                 
{
    name: 8,
    symbol: 8,
    formula: 8,
    type: "number"      
},
{
    name: 9, 
    symbol: 9,
    formula: 9,
    type: "number"
},
{
    name: 0,
    symbol: 0,
    formula: 0,
    type: "number"      
},
{
    name:"e",
    symbol:"e",
    formula:"Math.E",
    type:"number"
},
{
    name:"π",
    symbol:"π",
    formula:"Math.PI",
    type:"number"
},
{
    name:"decimal",
    symbol:".",
    formula:".",
    type:"number"
},
{
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number"
},
{
    name: "calculate",
    symbol: "=",
    formula:"=",
    type: "calculate"
},
{
    name: "cos",
    symbol: "cos",
    formula: "Math.cos",
    type: "trigo_function"
},
{
    name:"sin",
    symbol:"sin",
    formula:"Math.sin",
    type:"trigo_function"
},
{
    name:"tan",
    symbol:"tan",
    formula:"Math.tan",
    type:"trigo_function"
},
{
    name:"acos",
    symbol:"acos",
    formula:"Math.acos",
    type:"trigo_function"
},
{
    name:"asin",
    symbol:"asin",
    formula:"Math.asin",
    type:"trigo_function"
},
{
    name:"atan",
    symbol:"atan",
    formula:"Math.atan",
    type:"trigo_function"
},
{
    name:"exp",
    symbol:"exp",
    formula:"Math.exp",
    type:"Math_function"
},
{
    name:"Ln",
    symbol:"Ln",
    formula:"Math.log",
    type:"Math_function"
},
{
    name:"log",
    symbol:"log",
    formula:"Math.log10",
    type:"Math_function"
},
{
    name:"Rad",
    symbol:"Rad",
    formula:false,
    type:"key"
},
{
    name:"Deg",
    symbol:"Deg",
    formula:false,
    type:"key"
},
{
    name: "square",
    symbol: "x²",
    formula: "^2",
    type: "math_function"
}, 
{
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function"
},
{
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "math_function"// why r there sooo manyy
},
{
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "math_function"
},
{
    name :"clear",
    symbol:"C",
    formula: false,
    type : "key"
},
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
