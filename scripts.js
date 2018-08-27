var calculatorDisplay; // The text div showing the user the current calculation, and results

var currentNum; // The number the user is cyrrently typing, as a string
var calculation; // The calculation the user is currently using, as string (+, *, sqrt)
var storedNum; // The previous value the user input (ie. before pressing the plus/minus/multiply button)

var calculationInProgress; // Bool to keep track whether the user has pressed a calculation button (+, -), or if we're just dealing with nubmers so far

function initialize() // Initialize relevant variables on page load
{
    calculatorDisplay = document.querySelector("#calculatorDisplay");

    currentNum = "";
    calculation = "";
    storedNum = "";

    calculationInProgress = false;

    // Add a key listener for keypad buttons
    window.addEventListener("keydown", keydownListener);
}

function keydownListener(event)
{
    console.log(event);
    var keycode = event.keyCode;
    switch(keycode)
    {
        case 13:
            equals();
            break;
        case 48:
            numberButton(0);
            break;
        case 49:
            numberButton(1);
            break;
        case 50:
            numberButton(2);
            break;
        case 51:
            numberButton(3);
            break;
        case 52:
            numberButton(4);
            break;
        case 53:
            numberButton(5);
            break;
        case 54:
            numberButton(6);
            break;
        case 55:
            numberButton(7);
            break;
        case 56:
            numberButton(8);
            break;
        case 57:
            numberButton(9);
            break;
        case 96:
            numberButton(0);
            break;
        case 97:
            numberButton(1);
            break;
        case 98:
            numberButton(2);
            break;
        case 99:
            numberButton(3);
            break;
        case 100:
            numberButton(4);
            break;
        case 101:
            numberButton(5);
            break;
        case 102:
            numberButton(6);
            break;
        case 103:
            numberButton(7);
            break;
        case 104:
            numberButton(8);
            break;
        case 105:
            numberButton(9);
            break;
        case 106:
            calculationButton("*");
            break;
        case 107:
            calculationButton("+");
            break;
        case 109:
            calculationButton("-");
            break;
        case 111:
            calculationButton("/");
            break;
        default:
            break;
    }
}

function calculationButton(calc, solveImmediately = false)
{
    // If a calculation is already in progress, solve the old calculation first. The sum of the solution is stored in storedNum
    if (calculationInProgress)
        solve();
    else if (currentNum != "")
    {
        // This was the first calculation the user made, or the display was just cleared. Just store the current number
        storedNum = currentNum;
        currentNum = "";
    }
    else if (storedNum == "")
    {
        // User is trying to do a calculation, but we have no numbers yet. Bail
        return;
    }
    
    calculation = calc;
    calculationInProgress = true;

    // If we want to solve immediately (fe. for the sqrt button), force solve here
    if (solveImmediately)
        solve(true);

    refreshDisplayText();
}

function numberButton(num) // Called when user presses a number button
{
    if (calculationInProgress == false && storedNum != "")
        return;

    // Add the number as a character to the current number string (string to enable multi-digit calculations)
    currentNum += num;
    refreshDisplayText();
}

function backButton()
{
    if (currentNum.length <= 0)
        return;
        
    currentNum = currentNum.substring(0, currentNum.length - 1);

    refreshDisplayText();
}

function decimalButton()
{
    if (calculationInProgress == false && storedNum != "")
        return;
    
    if (currentNum == "")
        currentNum = 0;
    
    currentNum += ".";
    refreshDisplayText();
}

function equals()
{
    // Force solve() and refresh the text display
    solve();
    refreshDisplayText();
}

function clearDisplay() // Clear the calculator text and all relevant variables
{
    calculatorDisplay.textContent = "";
    currentNum = "";
    storedNum = "";
    calculation = "";
    calculationInProgress = false;
}

function refreshDisplayText() // Refresh the calculation text
{
    // Combine all the related text, clamp the length to 14, and set the textContent
    var _text = storedNum + " " + calculation + " " + currentNum;
    var _length = Math.min(_text.length, 14);
    calculatorDisplay.textContent = _text.substring(0, _length);
}

function solve(forceSolve = false) // Solves the current calculation and stores the sum in storedNum
{
    // Don't solve if the user hasn't given a number yet, or if no calculation is in progress and solve isn't forced
    if (forceSolve == false && (currentNum == "" || calculationInProgress == false))
        return;

    // Parse user input to numbers
    var _num1 = parseFloat(currentNum);
    var _num2 = parseFloat(storedNum);

    // Check calculation type and calculate
    switch(calculation)
    {
        case "+":
            storedNum = (_num1 + _num2);
            break;
        case "-":
            storedNum = (_num1 - _num2);
            break;
        case "/":
            storedNum = (_num2 / _num1);
            break;
        case "*":
            storedNum = (_num1 * _num2);
            break;
        case "sqrt":
            // If used tries to calculate sqrt with two values already typed, just add them together ¯\_(ツ)_/¯
            if (currentNum != "")
                _num2 += _num1;

            storedNum = Math.sqrt(_num2);
            break;
        default:
            console.error("Calculation type " + calculation + " missing from switch-case");
            break;
    }

    // Reset relevant variables and set calculationInProgress to false
    currentNum = "";
    calculation = "";
    calculationInProgress = false;
}