// Element Selectors
const elements = {
    names: document.querySelector("#name"), // Input field for name
    email: document.querySelector("#email"), // Input field for email
    phone: document.querySelector("#phone"), // Input field for phone number
    password: document.querySelector("#password"), // Input field for password
    confirmPassword: document.querySelector("#confirm-password"), // Input field for confirming password
    form: document.querySelector("#my-form"), // Form element
    submit: document.querySelector(".submit-btn"), // Submit button
};

// Regular Expressions
const regex = {
    name: /^[a-zA-Z\s]+$/, // Regular expression for name validation
    phone: /^\d{10}$/, // Regular expression for phone number validation
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for email validation
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/, // Regular expression for password validation
};

// Validation Function
function validateField(field, regex, errorMsgText) {
    let errorMsg = document.querySelector(`#${field.id}-error`); // Error message element
    if (field.value.trim() === "") {
        showError(field, errorMsg, "This field cannot be empty!"); // Show error if field is empty
    } else if (regex && !regex.test(field.value)) {
        showError(field, errorMsg, errorMsgText); // Show error if field value doesn't match regex
    } else {
        removeError(errorMsg); // Remove error if field value is valid
    }
}

function showError(field, errorMsg, text) {
    if (!errorMsg) {
        errorMsg = document.createElement("p"); // Create error message element if it doesn't exist
        errorMsg.id = `${field.id}-error`; // Set error message element id
        field.parentNode.insertBefore(errorMsg, field.nextSibling); // Insert error message element after the field
    }
    errorMsg.innerText = text; // Set error message text
}

function removeError(errorMsg) {
    if (errorMsg) {
        errorMsg.remove(); // Remove error message element
    }
}

// Event Listeners
elements.names.addEventListener("input", () => {
    validateField(elements.names, regex.name, "Please enter a valid name!"); // Validate name field on input
});

elements.email.addEventListener("input", () => {
    validateField(elements.email, regex.email, "Please enter a valid email!"); // Validate email field on input
});

elements.phone.addEventListener("input", () => {
    validateField(
        elements.phone,
        regex.phone,
        "Please enter a valid phone number!"
    ); // Validate phone number field on input
});

elements.password.addEventListener("input", () => {
    validateField(
        elements.password,
        regex.password,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
    ); // Validate password field on input
});

elements.confirmPassword.addEventListener("input", () => {
    let errorMsg = document.querySelector("#confirm-password-error"); // Error message element for confirm password field
    if (elements.confirmPassword.value.trim() === "") {
        showError(
            elements.confirmPassword,
            errorMsg,
            "This field cannot be empty!"
        ); // Show error if confirm password field is empty
    } else if (elements.password.value !== elements.confirmPassword.value) {
        showError(elements.confirmPassword, errorMsg, "Passwords don't match!"); // Show error if passwords don't match
    } else {
        removeError(errorMsg); // Remove error if confirm password field is valid
    }
});

elements.submit.addEventListener("click", (e) => {
    e.preventDefault();

    // Trigger validation on all fields
    validateField(elements.names, regex.name, "Please enter a valid name!"); // Validate name field
    validateField(elements.email, regex.email, "Please enter a valid email!"); // Validate email field
    validateField(
        elements.phone,
        regex.phone,
        "Please enter a valid phone number!"
    ); // Validate phone number field
    validateField(
        elements.password,
        regex.password,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
    ); // Validate password field

    // Special case for confirm password validation
    let confirmPasswordErrorMsg = document.querySelector(
        "#confirm-password-error"
    ); // Error message element for confirm password field
    if (elements.confirmPassword.value.trim() === "") {
        showError(
            elements.confirmPassword,
            confirmPasswordErrorMsg,
            "This field cannot be empty!"
        ); // Show error if confirm password field is empty
    } else if (elements.password.value !== elements.confirmPassword.value) {
        showError(
            elements.confirmPassword,
            confirmPasswordErrorMsg,
            "Passwords don't match!"
        ); // Show error if passwords don't match
    } else {
        removeError(confirmPasswordErrorMsg); // Remove error if confirm password field is valid
    }

    // Check for any error messages
    let hasErrors = document.querySelectorAll("[id$='-error']").length > 0;

    // If no errors, submit the form
    if (!hasErrors) {
        elements.form.submit();
        alert("Form successfully submitted!");
    } else {
        alert(
            "Please correct the errors or fill the form completely before submitting."
        );
    }
});
