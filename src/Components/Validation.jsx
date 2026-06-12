export default function Validation(values) {
    let errors = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#]).{8,}$/;
    const phone_pattern = /^[0-9]{10}$/; // ✅ NEW

    // ✅ NAME (used in register + contact)
    if (values?.name !== undefined) {
        if (values.name === "") {
            errors.name = "Name Should Not Be Empty"
        } else if (values.name.length < 3 || values.name.length > 30) {
            errors.name = "Name must be between 3-30"
        }
    }

    // ✅ EMAIL (used in all forms)
    if (values?.email !== undefined) {
        if (values.email === "") {
            errors.email = "Email Should Not Be Empty"
        } else if (!email_pattern.test(values.email)) { // ✅ UNCOMMENTED
            errors.email = "Invalid Email Format"
        }
    }

    // ✅ PASSWORD (only for login + register)
    if (values?.password !== undefined) {
        if (values.password === "") {
            errors.password = "Password Should Not Be Empty"
        }
        // optional strong validation
        /*
        else if (!password_pattern.test(values.password)) {
            errors.password = "Password must contain uppercase, lowercase, number & symbol"
        }
        */
    }
    if (values?.phone !== undefined) {
        if (values.phone === "") {
            errors.phone = "Phone Should Not Be Empty"
        } else if (!phone_pattern.test(values.phone)) {
            errors.phone = "Phone must be exactly 10 digits"
        }
    }

    return errors;
}