document.addEventListener('DOMContentLoaded', function () {
    // Selecting necessary DOM elements
    const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people');
    const customTipInput = document.getElementById('custom-tip');
    const tipButtons = document.querySelectorAll('.tip-option button');
    const errorBill = document.getElementById('bill-error');
    const errorPeople = document.getElementById('people-error');
    const totalAmount = document.querySelectorAll('.total h1')[1];
    const tipAmount = document.querySelectorAll('.total h1')[0];
    const resetButton = document.getElementById('reset');

    let tipPercent = 0;
    let billAmount = 0;
    let numberOfPeople = 0;

    // Function to validate the input fields
    function validateInputs() {
        let isValid = true;

        // Validate bill input
        if (billAmount === 0 && billInput.value !== '') {
            errorBill.textContent = "Can't be zero.";
            isValid = false;
        } else if (billAmount < 0) {
            errorBill.textContent = "Can't be negative.";
            isValid = false;
        } else if (isNaN(billAmount) && billInput.value !== '') {
            errorBill.textContent = "Must be a number.";
            isValid = false;
        } else {
            errorBill.textContent = '';
        }

        // Validate people input
        if (numberOfPeople === 0 && peopleInput.value !== '') {
            errorPeople.textContent = "Can't be zero.";
            isValid = false;
        } else if (numberOfPeople < 0) {
            errorPeople.textContent = "Can't be negative.";
            isValid = false;
        } else if (isNaN(numberOfPeople) && peopleInput.value !== '') {
            errorPeople.textContent = "Must be a number.";
            isValid = false;
        } else {
            errorPeople.textContent = '';
        }

        return isValid;
    }

    // Function to calculate tip and total amount
    function calculate() {
        // Only calculate if inputs are valid
        if (validateInputs()) {
            // Avoid NaN by checking for valid inputs
            if (billAmount > 0 && numberOfPeople > 0) {
                const tipPerPerson = (billAmount * tipPercent) / 100 / numberOfPeople;
                const totalPerPerson = (billAmount / numberOfPeople) + tipPerPerson;

                // Update the UI with calculated values
                tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
                totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;

                // Enable the reset button
                resetButton.disabled = false;
                resetButton.classList.add('enable'); // Add 'enable' class to the reset button
            } else {
                // If billAmount or numberOfPeople are zero or invalid, set the results to $0.00
                tipAmount.textContent = "$0.00";
                totalAmount.textContent = "$0.00";

                // Disable the reset button and remove 'enable' class
                resetButton.disabled = true;
                resetButton.classList.remove('enable');
            }
        } else {
            // Reset to 0 if inputs are invalid
            tipAmount.textContent = "$0.00";
            totalAmount.textContent = "$0.00";

            // Disable the reset button and remove 'enable' class
            resetButton.disabled = true;
            resetButton.classList.remove('enable');
        }
    }

    // Event listener for bill input
    billInput.addEventListener('input', () => {
        billAmount = parseFloat(billInput.value);
        calculate();
    });

    // Event listener for people input
    peopleInput.addEventListener('input', () => {
        numberOfPeople = parseInt(peopleInput.value) || 0;
        calculate();
    });

    // Event listeners for tip buttons (5%, 10%, 15%, 25%, 50%)
    tipButtons.forEach((button) => {
        button.addEventListener('click', () => {
            tipPercent = parseInt(button.textContent);
            tipButtons.forEach((btn) => btn.classList.remove('selected')); // Remove selected from all
            button.classList.add('selected'); // Add selected to clicked button
            calculate();
        });
    });

    // Event listener for custom tip input
    customTipInput.addEventListener('input', () => {
        let customTipValue = parseInt(customTipInput.value);
        if (!isNaN(customTipValue) && customTipValue > 0) {
            tipPercent = customTipValue;
            tipButtons.forEach((btn) => btn.classList.remove('selected')); // Remove selected from all
            calculate();
        } else {
            tipPercent = 0;
            calculate();
        }
    });

    // Event listener for reset button
    resetButton.addEventListener('click', () => {
        // Reset all inputs and states
        billInput.value = '0';
        peopleInput.value = '0';
        customTipInput.value = '';
        tipButtons.forEach((btn) => btn.classList.remove('selected')); // Remove selected class from all buttons
        tipAmount.textContent = "$0.00";
        totalAmount.textContent = "$0.00";

        // Disable the reset button and remove 'enable' class
        resetButton.disabled = true;
        resetButton.classList.remove('enable');
    });

    // Initial calculation when page loads
    calculate();
});
