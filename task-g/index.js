

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registrationForm");
    const timestampInput = document.getElementById("timestamp");
    const table = document.getElementById("registrationTable");

    function setTimestamp() {
        const now = new Date();
        const formatted = now.toISOString().slice(0, 16);
        timestampInput.value = formatted;
    }

    function showError(id, message) {
        const span = document.getElementById(id);
        if (span) {
            span.textContent = message;
        }


    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(span => {
            span.textContent = '';
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearErrors();
        setTimestamp();

        let isValid = true;

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const birthDateStr = document.getElementById('birthDate').valueAsDate;
        const termsChecked = document.getElementById('terms').checked;

        if (!fullName) {
            showError('fullNameError', 'Please enter your full name.');
            isValid = false;
        } else {
            const nameParts = fullName.split(' ').filter(part => part.length > 0);
            if (nameParts.length < 2) {

                showError('fullNameError', 'Please enter your first and last name together.');
                isValid = false;
            }

        }
        if (!email) {
            showError('emailError', 'Please enter your email address.');
            isValid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('emailError', 'Please enter a valid email address.');
                isValid = false;
            }
        }

        if (!phone) {
            showError('phoneError', 'Please enter your phone number.');
            isValid = false;
        } else {
            const phonePattern = /^\+3580\d{7,10}$/;
            if (!phonePattern.test(phone)) {
                showError('phoneError', 'Please enter a valid phone number starting with +3580 followed by 7 or 8 digits.');
                isValid = false;
            }
        }

        if (!birthDateStr) {
            showError('birthDateError', 'Please enter your birth date.');
            isValid = false;
        } else {

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (birthDateStr > today) {
                showError('birthDateError', 'Birth date cannot be in the future.');
                isValid = false;
            }
        }

        if (termsChecked !== true) {
            showError('termsError', 'You must agree to the terms and conditions.');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${timestampInput.value}</td>
                <td>${fullName}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${birthDateStr}</td>
                <td>${termsChecked ? 'Yes' : 'No'}</td>
            `;
        table.querySelector('tbody').appendChild(newRow);

        form.reset();
        setTimestamp();
    }
    );
    setTimestamp();

    form.addEventListener("reset", () => {
        clearErrors();
    });

});
