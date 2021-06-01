function main(){

  //////////////// DOM Elements //////////////
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const exitBtn = document.querySelectorAll("#close");
  const formData = document.querySelectorAll(".formData");
  const burger = document.querySelector(".icon");
  const form = document.getElementById('form');
  const modalContainer = document.querySelector(".content");
  const radios = document.getElementsByName('location');

  const successModal = document.createElement('div');
  const btnGo = document.createElement('button');
  const inputs = document.forms["reserve"];

  const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
  const REGEX_MAIL =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const REGEX_BDAY = /^[1-2][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;

  //modal elements for the focus trap
  const modalElts = document.querySelectorAll(".text-control, .checkbox-input, .checkbox-label, .checkbox2-label, .btn-submit")
  const firstModalEl = modalElts[0];
  const lastModalEl = modalElts[modalElts.length - 1];
  

  /////////////// STYLING DOM ELEMENTS //////////////
  // sucess modal
  successModal.classList.add('modal-body');
  successModal.setAttribute('id','sucessModal');
  successModal.style.display="none";
  successModal.style.position="absolute";
  successModal.style.top=0;
  successModal.style.transform= "translate(40px, 200px)";
  successModal.innerHTML ="Merci pour votre participation !";
  modalContainer.appendChild(successModal);

  // sucess modal send form
  successModal.appendChild(btnGo);
  btnGo.innerHTML ='GO';
  btnGo.classList.add('btn-go');
  btnGo.setAttribute('type','button');
  btnGo.style.transform= "translate(10px, 400px)";
  btnGo.addEventListener('click', sendForm)

  /////////MENU RESPONSIVE////////
  burger.onclick = function editNav() {
    let topNav = document.getElementById("myTopnav");
    if (topNav.className === "topnav") {
      topNav.className += " responsive";
    } else {
      topNav.className = "topnav";
    }
  }
  /////FIN MENU RESPONSIVE////////

  /////////MODAL ELEMENT////////
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }
  function displaySucessModal(){
    successModal.style.display = "block";
    form.style.opacity=0;
  }

  //close modal event /w exitbtn or escape key
  exitBtn.forEach((span) => span.addEventListener("click",closeModal));
  document.addEventListener('keydown', escapeEvt);

  //close modal form /w btn
  function closeModal(){
    modalbg.style.display = "none";
  }

  //close modal form /w escape key
  function escapeEvt(eventkey){
    if(eventkey.key === "Escape"){
      modalbg.style.display = "none";
    }
  }
  //prevent enter key from closing modal element and send the form
  document.addEventListener('keydown', function(eventkey){
    if (eventkey.key === 'Enter'){
      eventkey.preventDefault();
    }
  })
  ///////// FIN MODAL ELEMENT////////

  ///////////// FOCUS TRAP //////////accessibility
  //navigate through form with tab key (focustrap), enferme le focus tant que la modale est ouverte
  document.addEventListener('keydown', function(eventkey){
    if (eventkey.key === 'Tab') {
      if (eventkey.shiftKey){
        if (document.activeElement === firstModalEl) {//quand la premiere valeur de la chaine est active, le focus est mis sur la derniere
          lastModalEl.focus();
          eventkey.preventDefault();
        }
      } else /*if tab is pressed */{
        if (document.activeElement === lastModalEl){ //quand la derniere valeur de la chaine est active, le focus est mis sur le premier element
          firstModalEl.focus();
          eventkey.preventDefault();
        }
      }
    }
  })
  /////////////END FOCUS TRAP ////////////////


  ////////////// FORM ERROR SETTINGS //////////////
  let msg;
  const erreur = {
    empty : "Veuillez renseigner ce champ.",
    incorrect : "Veuillez renseigner correctement le champ.",
    ville : "Veuillez choisir une ville.",
    radio : "Veuillez accepter les conditions générales.",
    test : "test",
    };

  ////////////// CHECK USER INPUTS WHILE TYPING //////////////

  inputs["first"].addEventListener('keyup',verifyFirstName);
  inputs["last"].addEventListener('keyup',verifyLastName);
  inputs["email"].addEventListener('keyup',verifyEmail);
  inputs["birthdate"].addEventListener('change',verifyBirthdate);
  inputs["quantity"].addEventListener('keyup',verifyQuantity);
  document.getElementById("location1").addEventListener('click', verifyCity)
  document.getElementById("location2").addEventListener('click', verifyCity)
  document.getElementById("location3").addEventListener('click', verifyCity)
  document.getElementById("location4").addEventListener('click', verifyCity)
  document.getElementById("location5").addEventListener('click', verifyCity)
  document.getElementById("location6").addEventListener('click', verifyCity)

  form.onsubmit = onSubmit;

  function sendForm(){
    form.submit()
  }

  function verifyFirstName(){
    if (!inputs["first"].value){
      msg = erreur.empty
      inputs["first"].style.border = "red 2px solid";
      formData[0].setAttribute('data-error',msg)
      formData[0].setAttribute('data-error-visible','true')
      return false
    } else if (REGEX_NAMES.test(inputs["first"].value) === false){
      msg = erreur.incorrect;
      inputs["first"].style.border = "red 2px solid";
      formData[0].setAttribute('data-error',msg)
      formData[0].setAttribute('data-error-visible','true')
      return false
    } else {
      inputs["first"].style.border = "transparent 2px solid";
      formData[0].removeAttribute('data-error');
      formData[0].removeAttribute('data-error-visible');  
      return true
    }
  }

  function verifyLastName(){
    if (!inputs["last"].value){
      msg = erreur.empty
      inputs["last"].style.border = "red 2px solid";
      formData[1].setAttribute('data-error',msg)
      formData[1].setAttribute('data-error-visible','true')
      return false
    } else if (REGEX_NAMES.test(inputs["last"].value) === false){
      msg = erreur.incorrect;
      inputs["last"].style.border = "red 2px solid";
      formData[1].setAttribute('data-error',msg)
      formData[1].setAttribute('data-error-visible','true')
      return false
    } else {
      inputs["last"].style.border = "transparent 2px solid";
      formData[1].removeAttribute('data-error');
      formData[1].removeAttribute('data-error-visible');  
      return true
    }
  }

  function verifyBirthdate(){
    if (!inputs["birthdate"].value){
      msg = erreur.empty
      inputs["birthdate"].style.border = "red 2px solid";
      formData[3].setAttribute('data-error',msg)
      formData[3].setAttribute('data-error-visible','true')
      return false
    } else if (REGEX_BDAY.test(inputs["birthdate"].value) === false){
      msg = erreur.incorrect;
      inputs["birthdate"].style.border = "red 2px solid";
      formData[3].setAttribute('data-error',msg)
      formData[3].setAttribute('data-error-visible','true')
      return false
    } else {
      inputs["birthdate"].style.border = "transparent 2px solid";
      formData[3].removeAttribute('data-error');
      formData[3].removeAttribute('data-error-visible');  
      return true
    }
  }

  function verifyEmail(){
    if (!inputs["email"].value){
      msg = erreur.empty
      inputs["email"].style.border = "red 2px solid";
      formData[2].setAttribute('data-error',msg)
      formData[2].setAttribute('data-error-visible','true')
      return false
    } else if (REGEX_MAIL.test(inputs["email"].value) === false){
      msg = erreur.incorrect;
      inputs["email"].style.border = "red 2px solid";
      formData[2].setAttribute('data-error',msg)
      formData[2].setAttribute('data-error-visible','true')
      return false
    } else {
      inputs["email"].style.border = "transparent 2px solid";
      formData[2].removeAttribute('data-error');
      formData[2].removeAttribute('data-error-visible');  
      return true
    }
  }
  function verifyQuantity(){
    if (!inputs["quantity"].value){
      msg = erreur.empty
      inputs["quantity"].style.border = "red 2px solid";
      formData[4].setAttribute('data-error',msg)
      formData[4].setAttribute('data-error-visible','true')
      return false

    } else if (inputs["quantity"].value === "0"){
      inputs["quantity"].style.border = "transparent 2px solid";
      formData[4].removeAttribute('data-error');
      formData[4].removeAttribute('data-error-visible');
      for (var g = 0; g < radios.length; g++) {
        radios[g].disabled = true;
        if (radios[g].checked === true){
          radios[g].checked = false;
        }
      }
      return true

    } else if (inputs["quantity"].value > 0){
      inputs["quantity"].style.border = "transparent 2px solid";
        formData[4].removeAttribute('data-error');
        formData[4].removeAttribute('data-error-visible');
        for (let a = 0; a < radios.length; a++){
          if (radios[a].disabled === true){
            radios[a].disabled = false
          }
        }
        verifyCity();
        return true
      }
  }

  function verifyCity(){
    let checkRadio = false;
    if(inputs["quantity"].value > 0){
      for (let i = 0; i < radios.length; i++){
        if (checkRadio === false){
          if (radios[i].checked === true) {
            checkRadio = true;
            formData[5].removeAttribute('data-error');
            formData[5].removeAttribute('data-error-visible');
            return true
          }
        }
      }
      if (!checkRadio){
        msg = erreur.ville;
        formData[5].setAttribute('data-error',msg)
        formData[5].setAttribute('data-error-visible','true')
        return false
      }
    }
    else {
      return true
    }

  }

  function verifiyConditions(){
    if (!inputs["checkbox1"].checked) {
      msg = erreur.radio
      formData[6].setAttribute('data-error',msg)
      formData[6].setAttribute('data-error-visible','true')
      return false
    }
    else{
      formData[6].removeAttribute('data-error');
      formData[6].removeAttribute('data-error-visible');
      return true;
    }
  }

function onSubmit(e){
  e.preventDefault();
  verifiyConditions();
  let okFirstName = verifyFirstName();
  let okLastName = verifyLastName();
  let okEmail = verifyEmail();
  let okQuantity = verifyQuantity();
  let okBirthdate = verifyBirthdate();
  let okConditions = verifiyConditions();
  let okCity = verifyCity();


  let formulaireValide = okFirstName &&
  okLastName &&
  okEmail &&
  okQuantity &&
  okBirthdate &&
  okConditions&&
  okCity;
  
  if (formulaireValide){

    displaySucessModal();
  }
}


///////////END CHECK USER INPUT////////////

}
main();
