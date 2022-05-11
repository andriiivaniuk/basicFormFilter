const email = document.getElementById("input-email");
const phone = document.getElementById("input-phone");
const namee = document.getElementById("input-name");
const button = document.getElementById("done-but");
const panel = document.querySelector(".panel");

let nameErrors = [];
let phoneErrors = [];
let emailErrors = [];

let nameErrorsStack = [];
let phoneErrorsStack = [];
let emailErrorsStack = [];

const possibleErrors = ["phoneMissing", "phoneWrongSymbol", "phoneLengthError", "phoneFormatError", "emailMissing",
 "emailLengthError", "emailFormatError", "nameMissing", "nameLengthError", "nameWrongSymbol" ];

const createErrorMessage = (element, errorMessage, errorID) => {
    let errorNode = document.createElement("span");
    errorNode.classList.add("errorSpan");
    errorNode.innerHTML = errorMessage;
    errorNode.id = errorID;

    if (errorID.includes("name")) {
        if(!nameErrors.includes(errorID)){
            nameErrors.push(errorID);
            nameErrorsStack.push(errorNode);
            return;
        }
    }  
    if (errorID.includes("phone")) {
        if(!phoneErrors.includes(errorID)){
            phoneErrors.push(errorID);
            phoneErrorsStack.push(errorNode);
            return;
        }
    }  
    if (errorID.includes("email")) {
        if(!emailErrors.includes(errorID)){
            emailErrors.push(errorID);
            emailErrorsStack.push(errorNode);
            return;
        }
    }  
}

const onPhoneBlur = (e) => {

    if(phone.value.length === 0){
        phoneErrors = [];
        createErrorMessage(phone.parentElement, "This field is required", "phoneMissing")
    }

    phoneErrorsStack.forEach(x => {
        if(document.getElementById(x.id) === null){
            phone.parentElement.append(x);
        }
    })

    phoneErrorsStack = [];
}

const onPhoneInput = (e) => {

    if(phone.value.length === 0){
        phoneErrors.forEach( x => {
            if(document.getElementById(x)){
                document.getElementById(x).remove();
            }
        })

        phoneErrors = ['phoneMissing'];
        return;
    }


    if(phoneErrors.includes("phoneMissing") && phone.value.length > 0){
        if(document.getElementById("phoneMissing")){
            document.getElementById("phoneMissing").remove();
        }

        phoneErrors = phoneErrors.filter(x => x !== "phoneMissing");
        phoneErrorsStack = phoneErrorsStack.filter(x => x.id !== "phoneMissing");
    }

    if(phoneErrors.includes("phoneWrongSymbol")){
        let counter = 0;

        for(let i = 0; i < phone.value.length; i++){
            if(phone.value.charCodeAt(i) < 48 || phone.value.charCodeAt(i) > 57 ){
                if(i === 0 && phone.value[i] === '+'){
                    continue;
                }
                else{
                    counter++;
                }
            }
        }

        if(counter === 0){
            if(document.getElementById("phoneWrongSymbol")){
                document.getElementById("phoneWrongSymbol").remove();
            }
            phoneErrors = phoneErrors.filter(x => x !== "phoneWrongSymbol");
            phoneErrorsStack = phoneErrorsStack.filter(x => x.id !== "phoneWrongSymbol");
        }
    }

    if(phoneErrors.includes("phoneLengthError")){
        if(phone.value.length >= 10 && phone.value.length < 14){
            if(document.getElementById("phoneLengthError")){
                document.getElementById("phoneLengthError").remove();
            }
            phoneErrors = phoneErrors.filter(x => x !== "phoneLengthError");
            phoneErrorsStack = phoneErrorsStack.filter(x => x.id !== "phoneLengthError");
        }
    }

    if(phoneErrors.includes("phoneFormatError")){
        if((phone.value.includes("+380") && phone.value[0] === "+") || phone.value[0] === '0'){
            document.getElementById("phoneFormatError").remove();
            phoneErrors = phoneErrors.filter(x => x !== "phoneFormatError");
            phoneErrorsStack = phoneErrorsStack.filter(x => x.id !== "phoneFormatError");
        }
    }

    if(phone.value.length === 0){
        if(phoneErrors.includes("phoneMissing")){
           return; 
        }
        if(!phoneErrors.includes("phoneMissing")){
            createErrorMessage(phone.parentElement, "This field is required", "phoneMissing");
            
            phoneErrors.forEach( (x) => {
                if(x !== "phoneMissing"){
                    document.getElementById(x).remove();
                }
            })
            phoneErrors = ["phoneMissing"];
            return;
        }
    }

    if(phone.value.length < 10 || phone.value.length > 13){
        if(!phoneErrors.includes("phoneLengthError")){
            createErrorMessage(phone.parentElement, "phone has to be at least 10 and less than 14 characters long", "phoneLengthError");
        }
    }

    for(let i = 0; i < phone.value.length; i++){
        if(phone.value.charCodeAt(i) < 48 || phone.value.charCodeAt(i) > 57 ){
            if(i === 0 && phone.value[i] === '+'){
                continue;
            }
            else{
                if(document.getElementById("phoneWrongSymbol") === null){
                    createErrorMessage(phone.parentElement, "wrong symbol in phone number", "phoneWrongSymbol");
                }
            }
        }
    }

    if(!phone.value.includes("+380") && phone.value[0] !== '0'){
        if(!phoneErrors.includes("phoneFormatError")){
            createErrorMessage(phone.parentElement, "phone has to be of right format +380 or 0 ", "phoneFormatError");
        }
        
    }

}

const onEmailBlur = (e) => {

    if(email.value.length === 0){
        emailErrors = [];
        createErrorMessage(email.parentElement, "This field is required", "emailMissing")
    }

    emailErrorsStack.forEach(x => {
        if(document.getElementById(x.id) === null){
            email.parentElement.append(x);
        }
    })

    emailErrorsStack = [];
}

const onEmailnput = (e) => {
    if(email.value.length === 0){
        emailErrors.forEach( x => {
            if(document.getElementById(x) !== null){
                document.getElementById(x).remove();
            }
        })

        emailErrors = ["emailMissing"];
        return;
    }

    if(emailErrors.includes("emailMissing") && email.value.length > 0){
        if(document.getElementById("emailMissing")){
            document.getElementById("emailMissing").remove();
        }
        emailErrors = emailErrors.filter(x => x !== "emailMissing");
    }

    if(email.value.length >= 5 && emailErrors.includes("emailLengthError")){
        if(document.getElementById("emailLengthError")){
            document.getElementById("emailLengthError").remove();
        }

        emailErrors = emailErrors.filter(x => x !== "emailLengthError");
        emailErrorsStack = emailErrorsStack.filter(x => x.id !== "emailLengthError");
    }

    if(emailErrors.includes("emailFormatError") && email.value.includes("@") && email.value.includes(".")){        
        if(document.getElementById("emailFormatError")){
            document.getElementById("emailFormatError").remove();
        }

        emailErrors = emailErrors.filter(x => x !== "emailFormatError");
        emailErrorsStack = emailErrorsStack.filter(x => x.id !== "emailFormatError");
    }   

    if((!email.value.includes("@") || !email.value.includes(".")) && !emailErrors.includes("emailFormatError")){
        createErrorMessage(email.parentElement, "wrong email format, @ or . are missing", "emailFormatError");
    }

    if(!emailErrors.includes("emailLengthError") && email.value.length < 5){
        createErrorMessage(email.parentElement, "email has to be at least 5 characters long", "emailLengthError");
    }

}

const onNameBlur = (e) => {
    if(namee.value.length === 0){
        nameErrors = [];
        createErrorMessage(namee.parentElement, "This field is required", "nameMissing")
    }

    nameErrorsStack.forEach(x => {
        if(document.getElementById(x.id) === null){
            namee.parentElement.append(x);
        }
    })

    nameErrorsStack = [];
}

const onNameInput = (e) => {

    if(namee.value.length === 0){
        nameErrors.forEach( x => {
            if(document.getElementById(x) !== null){
                document.getElementById(x).remove();
            }
        })

        nameErrors = ["nameMissing"];
        return;
    }

    if(nameErrors.includes("nameMissing") && namee.value.length > 0){
        if(document.getElementById("nameMissing")){
            document.getElementById("nameMissing").remove();
        }
        nameErrors = nameErrors.filter(x => x !== "nameMissing");
    }

    if(namee.value.length >= 3 && nameErrors.includes("nameLengthError")){
        if(document.getElementById("nameLengthError")){
            document.getElementById("nameLengthError").remove();
        }

        nameErrors = nameErrors.filter(x => x !== "nameLengthError");
        nameErrorsStack = nameErrorsStack.filter(x => x.id !== "nameLengthError");
    }

    if(!nameErrors.includes("nameWrongSymbol")){
        for(let i = 0; i < namee.value.length; i++){
            
            let str = namee.value[i];
            
            if((str.charCodeAt(0) < 65 || str.charCodeAt(0) > 90) && (str.charCodeAt(0) < 97 || str.charCodeAt(0) > 122) && str !== ' ' ){
                if(!nameErrors.includes("nameWrongSymbol")){
                    createErrorMessage(namee.parentElement, "wrong symbol in name", "nameWrongSymbol");
                    break;
                }
            }
        }
    }

    if(nameErrors.includes("nameWrongSymbol")){
        let counter = 0;

        for(let i = 0; i < namee.value.length; i++){

            let str = namee.value[i];
            if ((str.charCodeAt(0) < 65 || str.charCodeAt(0) > 90) && (str.charCodeAt(0) < 97 || str.charCodeAt(0) > 122) && str !== ' ' ){
                counter++;
                break;
            }
        }

        if(counter === 0){
            if(document.getElementById("nameWrongSymbol")){
                document.getElementById("nameWrongSymbol").remove();
            }

            nameErrors = nameErrors.filter(x => x !== "nameWrongSymbol");
            nameErrorsStack = nameErrorsStack.filter(x => x.id !== "nameWrongSymbol");
        }
    }

    if(namee.value.length === 0){
        if(nameErrors.includes("nameMissing")){
           return; 
        }
        if(!nameErrors.includes("nameMissing")){
            createErrorMessage(namee.parentElement, "This field is required", "nameMissing");
            
            nameErrors.forEach( (x) => {
                if(x !== "nameMissing"){
                    if(document.getElementById(x)){
                        document.getElementById(x).remove();
                    }
                }
            })
            nameErrors = ["nameMissing"];
            return;
        }
    }  

    if(!nameErrors.includes("nameLengthError") && namee.value.length < 3){
        createErrorMessage(namee.parentElement, "name has to be at least 3 characters long", "nameLengthError");
    }

}

const checkCorrectFields = () => {
    
    if(button.disabled === true && nameErrors.length === 0 && emailErrors.length === 0 && phoneErrors.length === 0 
        && namee.value !== '' && email.value !== '' && phone.value !== ''){

            button.disabled = false;
            possibleErrors.forEach(x => {
                if(document.getElementById(x)){
                    document.getElementById.remove();
                } 
            }); 
            return;
    }

    if(button.disabled === false && nameErrors.length !== 0 || emailErrors.length !== 0 || phoneErrors.length !== 0 
        || namee.value === '' || email.value === '' || phone.value === ''){
            button.disabled = true;
    }
    
}

const buttonClick = () => {
    alert("data OK, will try to send to the server");

    postInfo({name: namee.value, phone: phone.value, email: email.value}, "http://localhost:3000/data/", "POST");
}

const postInfo = async (newItem, url, method) => {
    newItem.id = newItem.name;

    let responce = await fetch(url, { 
        method: method,
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newItem),
    })

    if(responce.ok){
        console.log("task done");
    }

    else{
        console.log("problem with changing the storage");
    }

}


email.addEventListener("blur", onEmailBlur);
phone.addEventListener("blur", onPhoneBlur);
namee.addEventListener("blur", onNameBlur);

email.addEventListener("input", onEmailnput);
phone.addEventListener("input", onPhoneInput);
namee.addEventListener("input", onNameInput);

panel.addEventListener("input", checkCorrectFields);

