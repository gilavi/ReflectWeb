
function get(id) {
    return document.getElementById(id);
}

function getClass(className) {
    return document.getElementsByClassName(className)
}

function getTag(tag) {
    return document.getElementsByTagName(tag)
}
let form = [];

function comparePasswords() {
    // if (get('RegistrationFormPassword') && get('RegistrationFormPasswordRepeat')) {
    //     if(get('RegistrationFormPassword').value.length > 8 && get('RegistrationFormPasswordRepeat').value.length > 8) {
    //         return get('RegistrationFormPassword').value === get('RegistrationFormPasswordRepeat').value
    //     }
    // }
    return false;
}

function animateRegistrationFormOne() {
        $('#form2').style = 'margin-left: 200px';
        $('#form1').animate({opacity: "hide", marginLeft: '-200px'}, 'slow', 'linear', function() {
            $(this).remove();
            $('#form2').animate( { opacity: "show", marginLeft: "0"}, 500);

        });
}

// function animateRegistrationFormTwo() {
//     $('#form3').style = 'margin-left: 200px';
//     $('#form2').animate({opacity: "hide", marginLeft: '-200px'}, 'slow', 'linear', function() {
//         $(this).remove();
//         $('#form3').animate( { opacity: "show", marginLeft: "0"}, 500);
//
//     });
// }

function animateRegistrationFormThree() {
    $('#form4').style = 'margin-left: 200px';
    $('#form2').animate({opacity: "hide", marginLeft: '-200px'}, 'slow', 'linear', function() {
        $(this).remove();
        $('#form4').animate( { opacity: "show", marginLeft: "0"}, 500);

    });
}

function validateForm1(button) {
    button.addEventListener('click', function(event) {
        if (!comparePasswords() &&  get('form1').checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {

            form.push(get('defaultLoginFormEmail').value);
            form.push(get('RegistrationFormPassword').value);

            get('form2').className.replace("was-validated", "")
            animateRegistrationFormOne();
        }
        get('form1').classList.add('was-validated');
    }, false)}

function validateForm2(button) {
    button.addEventListener('click', function(event) {
        if (!comparePasswords() &&  get('form2').checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // get('form3').className.replace("was-validated", "")
            // animateRegistrationFormTwo();
            form.push(get('companyName').value);
            form.push(get('codeAuth').value);

            sendData(form);
        }
        get('form2').classList.add('was-validated');

    }, false)}

// function validateForm3(button) {
//     button.addEventListener('click', function(event) {
//         if (!comparePasswords() &&  get('form3').checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         } else {
//
//         }
//
//         get('form3').classList.add('was-validated');
//
//     }, false)}

(function() {
    'use strict';
    // attach();
    window.addEventListener('load', function() {
        let continueRegistrationToStepTwo = get('continueRegistrationToStepTwo'),
            continueRegistrationToStepThree = get('continueRegistrationToStepThree'),
            finishRegistration = get('submitRegistration');

        validateForm1(continueRegistrationToStepTwo);
        validateForm2(continueRegistrationToStepThree);
        // validateForm3(finishRegistration);

    }, false);
})();

// function attach() {
//     if (get('employeeCount')) {
//         get('employeeCount').addEventListener('input', () => {
//             let employeeCount = get('employeeCount'),
//                 totalPrice = get('totalPrice'),
//                 standard = get('option1'),
//                 pro = get('option2');
//                 if (standard.checked) {
//                     totalPrice.innerHTML = employeeCount.value * 5
//                 } else if (pro.checked){
//                     totalPrice.innerHTML = employeeCount.value * 10
//                 }
//         })
//     }
// }
// get('option1').addEventListener('change', () => attach())
// get('option2').addEventListener('change', () => attach())

let loginBtn = get('submit');

function sendData(form) {
    // let username = get('defaultLoginFormUsername').value;
    // let password = get('defaultLoginFormPassword').value;
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:4001/users" , true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            if (this.statusText === 'Created') {
                animateRegistrationFormThree()
            }
        }
    };
    xhttp.send("username=" + form[0] + "&" + "password=" + form[1] + "&" + "companyName=" + form[2] + "&" +"companyCode=" + form[3]);
};

$(document).ready(function () {
    console.log(getTag('form'))

})
