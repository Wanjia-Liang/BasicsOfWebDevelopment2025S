
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.Book-content form');
    const pickupDateInput = document.getElementById('pickupDate');
    const returnDateInput = document.getElementById('returnDate');
    const emailInput = document.getElementById('email');

    const availabilityStart = new Date('2025-12-06');
    const availabilityEnd = new Date('2025-12-28');

    const toISODate = (date) => date.toISOString().split('T')[0];
    pickupDateInput.min = toISODate(availabilityStart);
    pickupDateInput.max = toISODate(availabilityEnd);
    returnDateInput.min = toISODate(availabilityStart);
    returnDateInput.max = toISODate(availabilityEnd);


    const commonDomains = {
        "gamil.com": "gmail.com",
        "gmial.com": "gmail.com",
        "hotmial.com": "hotmail.com",
        "outlok.com": "outlook.com",
        "yaho.com": "yahoo.com",
        "icloud.co": "icloud.com"
    };

    function validateEmail(email) {

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!pattern.test(email)) {
            return "Please enter a valid email address.";
        }

        const domain = email.split("@")[1];
        if (commonDomains[domain]) {
            return `Did you mean: ${email.split("@")[0]}@${commonDomains[domain]} ?`;
        }

        return null;
    }

    form.addEventListener('submit', (event) => {
        const errors = [];


        const pickupValue = pickupDateInput.value;
        const returnValue = returnDateInput.value;

        if (pickupValue && returnValue) {
            const pickupDate = new Date(pickupValue + "T00:00:00");
            const returnDate = new Date(returnValue + "T00:00:00");

            if (pickupDate < availabilityStart || pickupDate > availabilityEnd) {
                errors.push('Pick-up date must be between 06.12.2025 and 28.12.2025.');
            }

            if (returnDate < availabilityStart || returnDate > availabilityEnd) {
                errors.push('Return date must be between 06.12.2025 and 28.12.2025.');
            }

            if (returnDate < pickupDate) {
                errors.push('Return date cannot be before pick-up date.');
            }
        }


        const emailValue = emailInput.value.trim();
        const emailError = validateEmail(emailValue);

        if (emailError) {
            errors.push(emailError);
        }


        if (errors.length > 0) {
            event.preventDefault();
            alert(errors.join('\n'));
            return;
        }


        const name = document.getElementById('name').value.trim();
        const country = document.getElementById('country').value;
        const license = document.getElementById('license').value.trim();
        const returnLocation = document.getElementById('returnLocation').value;

        const message =
            'Please confirm your booking:\n\n' +
            'Car: Toyota Corolla 1.2L\n' +
            `Pick-up: ${pickupValue} – Helsinki Airport\n` +
            `Return: ${returnValue} – ${returnLocation}\n` +
            `Name: ${name}\n` +
            `Email: ${emailValue}\n` +
            `Driver\'s license: ${license} (${country})\n\n` +
            'Click OK to submit your order.';

        if (!confirm(message)) {
            event.preventDefault();
        }
    });
});

