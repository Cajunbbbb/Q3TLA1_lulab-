// DOM Elements
const form = document.getElementById('user-form');
const registrationFormDiv = document.getElementById('registration-form');
const outputViewDiv = document.getElementById('output-view');
const dataList = document.getElementById('data-list');
const backButton = document.getElementById('back-to-form');
const messageBox = document.getElementById('message-box');

/**
 * Shows a temporary message box for validation or success.
 * @param {string} message The text to display.
 * @param {string} type 'success' or 'error'.
 */
function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = 'message-box show ' + type;
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageBox.className = 'message-box hidden';
    }, 3000);
}

/**
 * Handles form submission and validation.
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 1. Password Validation Check
    if (password !== confirmPassword) {
        showMessage('Error: Passwords do not match. Please try again.', 'error');
        return; // Stop the submission
    }

    // 2. Data Collection
    const formData = new FormData(form);
    const data = {};
    
    // Map form data to a simple object
    for (const [key, value] of formData.entries()) {
        // Special handling for the file input to just show the file name
        if (key === 'photo' && value instanceof File) {
            data[key] = value.name || '[No file selected]';
        } else {
            data[key] = value;
        }
    }

    // 3. Display Output
    dataList.innerHTML = ''; // Clear previous data
    
    // Define keys to skip from display (passwords)
    const skippedKeys = ['password', 'confirmPassword'];

    for (const key in data) {
        if (skippedKeys.includes(key)) {
            continue; // Skip sensitive fields
        }
        
        // Format the key to be user-friendly (e.g., firstName -> First Name)
        const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        let displayValue = data[key];

        // Handle empty or placeholder values
        if (!displayValue || displayValue === 'Select Status') {
            displayValue = '[Not Provided]';
        }
        
        // Make Emergency Contact number appear as a friendly label
        if (key === 'emergencyContact') {
            // Note: The input type for emergencyContact is 'number', so the value is just the number.
            displayValue = `Number: ${displayValue}`;
        }

        const listItem = document.createElement('div');
        listItem.classList.add('data-item');
        listItem.innerHTML = `<strong>${displayKey}:</strong> ${displayValue}`;
        dataList.appendChild(listItem);
    }
    
    // 4. Show success message and swap views
    showMessage('Form submitted successfully!', 'success');
    
    registrationFormDiv.classList.add('hidden');
    outputViewDiv.classList.remove('hidden');
});

/**
 * Handles the back button click to return to the form.
 */
backButton.addEventListener('click', function() {
    // Reset the form fields for a new submission
    form.reset(); 
    
    // Swap views back
    outputViewDiv.classList.add('hidden');
    registrationFormDiv.classList.remove('hidden');
});