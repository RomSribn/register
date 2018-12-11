"use strict"
const log = txt => console.log(txt);
//=========================================================================================================


const regBtn = {
  signUpBtn: document.querySelector('#SignIn'),
  signUpForm: document.querySelector('.signup'),
  signInBtn: document.querySelector('#SignUp'),
  signInForm: document.querySelector('.login'),
  signBtn: document.querySelectorAll('#SignBtn'),
  sendBtn: document.querySelectorAll('.register-button')
  
}
const mainForm = document.querySelector('.register');

const errorMessage = {
  mainError: document.querySelector('.error'),
  inputErrors: document.querySelector('.localError')
}

const inputLabel = {
  name: document.querySelector('.name'),
  errorName:document.querySelector('.localErrorName'),
  secondname: document.querySelector('.secondname'),
  errorSecondname: document.querySelector('.localErrorSecondname')
}

//getting valid data format (text)
function getEncode(data){
  log(data)
  let formBody = [];
for (let property in data) {
  const encodedKey = encodeURIComponent(property);
  // log(encodedKey)
  const encodedValue = encodeURIComponent(data[property]);
  // log(encodedValue)
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
  log(formBody)
return formBody;
}


regBtn.signBtn.forEach(btn => btn.addEventListener('click', handleToggle));

//submit form
mainForm.addEventListener('submit', handleSubmit);


//local valid
inputLabel.name.addEventListener('change', handleCheck);
inputLabel.secondname.addEventListener('change', handleCheck);

//checking our fields before submitting form
function handleCheck(event){
  inputLabel.errorName.innerText = '';
  const evt = event.target
  console.log(evt.value);
  if(evt.value.length < 3 || evt.value.length > 60){
    if(evt.name === 'name'){
      inputLabel.errorName.innerText = `Field ${evt.name} should contain from 3 to 60 letters`
    }
    if(evt.name === 'secondname'){
      inputLabel.errorSecondname.innerText = `Field ${evt.name} should contain from 3 to 60 letters`
    }
  }
}

//just parse our data from form and getting key 'form'
function JSONtoObj(json){
  return JSON.parse(json).form
}


function handleSubmit(evt){
  event.preventDefault();

    var request = new XMLHttpRequest();
    // POST to httpbin which returns the POST data as JSON
    request.open('POST', 'https://httpbin.org/post', /* async = */ false);

    var formData = new FormData(mainForm);


    request.send(formData);
   
    getValid(JSONtoObj(request.response))
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Error in fetching');
    })
    .then(data => {
      if(data.status === 'OK'){
        location = 'https://romsribn.github.io/company/';
      }
      errorMessage.mainError.innerText = data.message;
    })
    
}

//demo functions (if log in will be excist)
function handleToggle(event){
  let evt = event.target;
  console.log(evt.id);

  if(evt.id === 'SignIn' && regBtn.signInForm.classList.contains('show')){
    regBtn.signInForm.classList.remove('show');
    regBtn.signUpForm.classList.add('show');
  }
  if(evt.id === 'SignUp' && regBtn.signUpForm.classList.contains('show')){
    log('up')
    regBtn.signUpForm.classList.remove('show');
    regBtn.signInForm.classList.add('show');
  }

}


//getting response from server
function getValid(data){
// log(formBody)
// log(getEncode(data))
  return fetch('http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration', {
  method: 'POST',
  body: getEncode(data),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  })
}

// getValid().then(data => log(data))















