/*vytvoreni tlacitek pres grid
1) jak nejlepe nastavit hodnotu tlacitka? id? on click?
vyfiltrovat hodnotu ktera se rovna e.target.id tu dosadit do operace
2) nastavit hodnotu pres onclick?

*/

let calculatorButtons = [
	{
		name: 'delete',
		symbol: '⌫',
		formula: false,
		type: 'key',
	},
	{
		name: 'clear',
		symbol: 'C',
		formula: false,
		type: 'key',
	},
	{
		name: 'percent',
		symbol: '%',
		formula: '/100',
		type: 'number',
	},
	{
		name: 'division',
		symbol: '÷',
		formula: '/',
		type: 'operator',
	},
	{
		name: '7',
		symbol: 7,
		formula: 7,
		type: 'number',
	},
	{
		name: '8',
		symbol: 8,
		formula: 8,
		type: 'number',
	},
	{
		name: '9',
		symbol: 9,
		formula: 9,
		type: 'number',
	},
	{
		name: 'multiplication',
		symbol: '×',
		formula: '*',
		type: 'operator',
	},
	{
		name: '4',
		symbol: 4,
		formula: 4,
		type: 'number',
	},
	{
		name: '5',
		symbol: 5,
		formula: 5,
		type: 'number',
	},
	{
		name: '6',
		symbol: 6,
		formula: 6,
		type: 'number',
	},
	{
		name: 'addition',
		symbol: '+',
		formula: '+',
		type: 'operator',
	},
	,
	{
		name: '1',
		symbol: 1,
		formula: 1,
		type: 'number',
	},
	{
		name: '2',
		symbol: 2,
		formula: 2,
		type: 'number',
	},
	{
		name: '3',
		symbol: 3,
		formula: 3,
		type: 'number',
	},
	{
		name: 'subtraction',
		symbol: '–',
		formula: '-',
		type: 'operator',
	},
	{
		name: '0',
		symbol: 0,
		formula: 0,
		type: 'number',
	},
	{
		name: 'comma',
		symbol: '.',
		formula: '.',
		type: 'number',
	},
	{
		name: 'calculate',
		symbol: '=',
		formula: '=',
		type: 'calculate',
	},
];

//sELECT ELEMENTS
const inputElement = document.querySelector('.input');
const outputOperationElement = document.querySelector('.operation .value');
const outputResultElement = document.querySelector('.result .value');

//  CREATE VARIABLES
let data = {
	operation: [],
	result: [],
};

//FUNCTION CREATE CALCULATOR BUTTONS

function createCalculatorButtons() {
	const btnsPerRow = 4;
	let addedBtns = 0;

	calculatorButtons.forEach((button) => {
		if (addedBtns % btnsPerRow == 0) {
			inputElement.innerHTML += `<div class="row"></div>`;
		}

		const row = document.querySelector('.row:last-child');
		row.innerHTML += `<button id="${button.name}">
                            ${button.symbol}
                          </button>`;

		addedBtns++;
	});
}

createCalculatorButtons();

//ADD EVENT LISTENER TO BUTTONS
inputElement.addEventListener('click', (e) => {
	const targetBtn = e.target;

	calculatorButtons.forEach((button) => {
		if (button.name === targetBtn.id) calculator(button);
	});
});

//CREATE FUNCTION CALCULATOR
function calculator(button) {
	if (button.type == 'operator') {
		data.operation.push(button.symbol);
		data.result.push(button.formula);
	} else if (button.type == 'number') {
		data.operation.push(button.symbol);
		data.result.push(button.formula);
	} else if (button.type == 'key') {
		if (button.name == 'clear') {
			data.operation = [];
			data.result = [];
			updateOutputResult(0);
		} else if (button.name == 'delete') {
			data.result.pop();
			data.operation.pop();
		}
	} else if (button.type == 'calculate') {
		// PUSH WHAT'S LEFT IN TEMP TO RESULT AND JOIN RESULT
		let resultJoined = data.result.join('');

		// CLEAR ALL ARRAYS, NO NEED TO SAVE ANYTHING ANYMORE
		data.operation = [];
		data.result = [];

		// CHECK IF THERE WAS A SYNATX ERROR IN THE operation
		let resultFinal;
		try {
			resultFinal = eval(resultJoined);
		} catch (error) {
			if (error instanceof SyntaxError) {
				resultFinal = 'Syntax Error!';
				updateOutputResult(resultFinal);
				return;
			}
		}

		// FORMAT THE RESULT
		resultFinal = formatResult(resultFinal);

		//SAVE RESULT FOR ANY FUTURE USE
		data.operation.push(resultFinal);
		data.result.push(resultFinal);

		//UPDATE OUTPUT
		updateOutputResult(resultFinal);

		return;
	}

	updateOutputOperation(data.operation.join(''));
}

//FUNCTION UPDATE OPERATION ELEMENT
function updateOutputOperation(operation) {
	outputOperationElement.innerHTML = operation;
}

//FUNCTION UPDATE OUTPUT ELEMENT
function updateOutputResult(result) {
	outputResultElement.innerHTML = result;
}

//FUNCTION DIGIT COUNTER
function digitCounter(number) {
	return number.toString().length;
}

//FUNCTION IS FLOAT
function isFloat(number) {
	return number % 1 != 0;
}

const maxOutputNumberLength = 10;
const outputPrecision = 5;

//FUNCTION FORMAT RESULT
function formatResult(result) {
	if (digitCounter(result) > maxOutputNumberLength) {
		if (isFloat(result)) {
			const resultInt = parseInt(result);
			const resultIntLength = digitCounter(resultInt);

			if (resultIntLength > maxOutputNumberLength) {
				return result.toPrecision(outputPrecision);
			} else {
				const numDigitsAfterPoint =
                maxOutputNumberLength - resultIntLength;
				return result.toFixed(numDigitsAfterPoint);
			}
		} else {
			return result.toPrecision(outputPrecision);
		}
	} else {
		return result;
	}
}
