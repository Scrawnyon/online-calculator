var displayText;
var currentNum;
var storedNum;
var total;
var calculatorDisplay;
var calculationinprogress;

function initialize()
{
    displayText = "";
    currentNum = "";
    storedNum = "";
    total = 0;
    calculatorDisplay = document.querySelector('#calculatorDisplay');
    calculationInProgress = false;
}

function refreshDisplayText()
{
    console.log(displayText);
    calculatorDisplay.textContent = displayText;
}

function add()
{
    var _num1 = parseInt(currentNum);
    currentNum = _num1;

    if(calculationInProgress)
    {
        var _num2 = parseInt(storedNum);

        total = _num1 + _num2;
        currentNum = "";
        storedNum = total;
        displayText = total + " + ";
    }
    else
    {
        displayText += " + ";
        storedNum = currentNum;
        currentNum = 0;
        calculationInProgress = true;
    }


    refreshDisplayText();
}

function deduct(num)
{
    displayText += "-";
}

function divide(num)
{
    displayText += "/";
    currentNum /= num;
}

function multiply(num)
{
    displayText += "*";
    currentNum *= num;
}

function sqr(num)
{
    displayText += "sqr";
}

function numberButton(num)
{
    if (displayText == "undefined")
    {
        displayText = num;
        currentNum = num;
    }
    else
    {
        displayText += num.toString();
        currentNum += num.toString();
    }

    refreshDisplayText();
}

function equals()
{
    calculationInProgress = false;
}

function clear()
{
    console.log("clear");
    currentNum = "";
    storedNum = "";
    displayText = "";

    refreshDisplayText();
}