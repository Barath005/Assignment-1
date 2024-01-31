//getting varibles by id
var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var msgError = document.getElementById("msg-error");
var submitSuccess = document.getElementById("submit-success");
var form = document.getElementById("form"); 

//validateing name by if and regex
function validateName() {
    var name = document.getElementById("contact-name").value;
    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;
    }
    if (!name.match(/^[A-Za-z]+\s{1}[A-Za-z]+$/)) {
        nameError.innerHTML = "Write full name";
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

//validateing phoneno by if and regex
function validatePhoneNo() {
    var phone = document.getElementById('contact-number').value;
    if (phone.length == 0) {
        phoneError.innerHTML = "Phone number is required";
        return false;
    }
    if (phone.length != 10) {
        phoneError.innerHTML = "10 digits required";
        return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = "Only Digits";
        return false;
    }
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

//validateing email by if and regex
function validateEmail() {
    var email = document.getElementById("contact-email").value;

    if (email.length === 0) {
        emailError.innerHTML = "Email is required";
        return false;
    }

    var emailRegex = /^[A-Za-z._-][A-Za-z0-9._-]*@[A-Za-z][A-Za-z0-9]*\.[A-Za-z]{2,4}$/;

    if (!email.match(emailRegex)) {
        emailError.innerHTML = "Invalid email format";
        return false;
    }

    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

//validateing message by if and regex

function validateMsg() {
    var msg = document.getElementById("contact-msg").value;
    var required = 30;
    var left = required - msg.length;

    if (left > 0) {
        msgError.innerHTML = left + " more characters required";
        return false;
    }
    msgError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

//validateing form by if and submitting form
function validateForm() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateName() && validatePhoneNo() && validateEmail() && validateMsg()) {
            submitSuccess.style.display = 'block';
            submitSuccess.innerText = "Thank you";
            

        }
    });
}


validateForm();



  