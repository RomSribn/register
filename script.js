"use strict"
const log = txt => console.log(txt);



const regBtn = {
  signUpBtn: document.querySelector('#SignIn'),
  signUpForm: document.querySelector('.signup'),
  signInBtn: document.querySelector('#SignUp'),
  signInForm: document.querySelector('.login'),
  signBtn: document.querySelectorAll('#SignBtn'),
  sendBtn: document.querySelectorAll('.register-button')
  
}
const mainForm = document.querySelector('.register')
// log(mainForm)

let dataFromForm = new FormData(mainForm);

// var details = {
//     'userName': 'test@gmail.com',
//     'password': 'Password!',
//     'grant_type': 'password'
// };

const frForm = {
  "agres": "on", 
    "email": "123432456@sdf.com", 
    "gender": "male", 
    "name": "sadfsadfsadf", 
    "pass": "123", 
    "secondname": "asfasdfsdf"
    }

let formBody = [];
function getEncode(data){

for (let property in data) {
  const encodedKey = encodeURIComponent(property);
  // log(encodedKey)
  const encodedValue = encodeURIComponent(data[property]);
  // log(encodedValue)
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
// return formBody
}

// log(getEncode({"agres":"on","email":"123432456@sdf.com","gender":"male","name":"sfsfsddfsdf","pass":"sfsfsdd23fsdf","secondname":"sfsfsddfsdf"}))


// log(formBody)


// const params = {
//   method: 'post',
//   body: {
//   "agres": "on", 
//     "email": "123432456@sdf.com", 
//     "gender": "male", 
//     "name": "sadfsadfsadf", 
//     "pass": "123", 
//     "secondname": "asfasdfsdf"
//     },
//   headers: {
//     'Content-Type':'application/json'
//   }
// }



// console.log(regBtn.signUpForm);
// console.log(regBtn.signUpForm.classList.contains('show'));
// regBtn.sendBtn.forEach(btn => btn.addEventListener('click', handleSubmit));
regBtn.signBtn.forEach(btn => btn.addEventListener('click', handleToggle));
// regBtn.sendBtn.forEach(btn => btn.addEventListener('submit', handleSubmit));
mainForm.addEventListener('submit', handleSubmit)
// regBtn.signUpBtn.addEventListener('click', handleShowSignUp);
// regBtn.signInBtn.addEventListener('click', handleShowSignIn);


// function handleShowSignUp(){
//   if(regBtn.signUpForm.contains('show')){
//     regBtn.signUpForm.remove('show');
//   }
// }


// function handleShowSignIn(){
//   if(regBtn.signInForm.contains('show')) return
// }

function JSONtoObj(json){
  return JSON.parse(json).form
}


function handleSubmit(evt){
 
  event.preventDefault();

    var request = new XMLHttpRequest();
    // POST to httpbin which returns the POST data as JSON
    request.open('POST', 'https://httpbin.org/post', /* async = */ false);

    var formData = new FormData(mainForm);

    // formData.append('appended1', 'appended value');

    request.send(formData);

    //console.log(JSON.parse(request.response).form);
    // console.log(request.response);

    getValid(JSONtoObj(request.response))
    .then(response => log(response.json));
    // .then(data => log(data.json()));
}


function handleToggle(event){
  // event.preventDefault()
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



function getValid(data){
// log(data)
getEncode(JSON.stringify(data))
log(formBody)
  return fetch('http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration', {
    method: 'POST',
  body: formBody,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  })
}

// getValid().then(data => log(data))















