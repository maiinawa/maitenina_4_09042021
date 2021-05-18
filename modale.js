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
  const spanCheckboxes = document.getElementsByClassName('checkbox-icon')

  const successModal = document.createElement('div');
  const btnGo = document.createElement('button');
  const inputs = document.forms["reserve"];

  const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
  const REGEX_MAIL =/^[a-z][a-z0-9-_]+@[a-z]+.[a-z]+$/;
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
  successModal.style.transform= "translate(0px, 200px)";
  successModal.innerHTML ="Merci pour votre participation !";
  modalContainer.appendChild(successModal);

  // sucess modal send form
  successModal.appendChild(btnGo);
  btnGo.innerHTML ='GO';
  btnGo.classList.add('btn-go');
  btnGo.setAttribute('type','button');
  btnGo.style.transform= "translate(10px, 400px)";
  btnGo.addEventListener('click', sendForm)

  ////////////// FORM ERROR SETTINGS //////////////
  let msg;

  let setError = {}
  setError.input ;
  setError.data ;

  let erreur = {};
  erreur.empty = "Veuillez renseigner ce champ.";
  erreur.incorrect = "Veuillez renseigner correctement le champ.";
  erreur.ville = "Veuillez choisir une ville.";
  erreur.radio = "Veuillez accepter les conditions générales.";


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

  function sendForm(){
    form.submit()
  }

  function setErrorStyle(setError){
    setError.input.style.border = "red 2px solid";
    setError.data.setAttribute('data-error',msg)
    setError.data.setAttribute('data-error-visible','true')
  }

  function removeErrorStyle(setError){
    setError.input.style.border = "transparent 2px solid";
    setError.data.removeAttribute('data-error');
    setError.data.removeAttribute('data-error-visible');
    }

  ////////////// CHECK USER INPUTS WHILE TYPING //////////////
  inputs["first"].oninput = function (){
    setError.data = formData[0];
    setError.input = this
    if (REGEX_NAMES.test(this.value) === false){
      msg = erreur.incorrect;
      setErrorStyle(setError);
    }else {
      removeErrorStyle(setError);
    }
  }

  inputs["last"].oninput = function (){
    setError.data = formData[1];
    setError.input = this
    if (REGEX_NAMES.test(this.value) === false){
      msg = erreur.incorrect;
      setErrorStyle(setError);
    }else {
      removeErrorStyle(setError);
    }
  }

  inputs["email"].oninput = function (){
    setError.data = formData[2];
    setError.input = this
    if (REGEX_MAIL.test(this.value) === false){
      msg = erreur.incorrect;
      setErrorStyle(setError);
    }else {
      removeErrorStyle(setError);
    }
  }

  inputs["birthdate"].oninput = function (){
    setError.data = formData[3];
    setError.input = this
    if (REGEX_BDAY.test(this.value) === false){
      msg = erreur.incorrect;
      setErrorStyle(setError);
    }else {
      removeErrorStyle(setError);
    }
  }

  inputs["checkbox1"].oninput = function (){
    setError.data = spanCheckboxes[0];
    setError.input = this
    if (this.checked === false){
      msg = erreur.radio;
      setErrorStyle(setError);
    }else {
      removeErrorStyle(setError);
    }
  }

  inputs["quantity"].oninput = function (){
    if (this.value > 0){
      setError.input = inputs[4];
      setError.data = formData[4];
      let checkRadio = false;
      removeErrorStyle(setError);
    
      for (let a = 0; a < radios.length; a++){
        if (checkRadio === false){
          if (radios[a].checked === true) {
            checkRadio = true;
            formData[5].removeAttribute('data-error');
            formData[5].removeAttribute('data-error-visible');
            break;
          }
        }
      }
      if (!checkRadio){
        msg = erreur.ville;
        formData[5].setAttribute('data-error',msg)
        formData[5].setAttribute('data-error-visible','true')
      }
    }
  }
  ////////////// CHECK USER INPUTS WHILE TYPING END//////////////


  /////////////CHECK USER INPUT AT SUBMISSION//////////////
  form.onsubmit = (function(event){
      if (inputs["checkbox1"].checked === false) {
        msg = erreur.radio
        formData[6].setAttribute('data-error',msg)
        formData[6].setAttribute('data-error-visible','true')
      } else{
        inputs["checkbox1"].style.border = "unset";
        formData[6].removeAttribute('data-error');
        formData[6].removeAttribute('data-error-visible');
      }

      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
          inputs[i].style.border = "red 2px solid";
          msg = erreur.empty
          formData[i].setAttribute('data-error',msg)
          formData[i].setAttribute('data-error-visible','true')
        }
      }
      if (msg){
    event.preventDefault();
  }
      else {
        formData.forEach((div) => div.removeAttribute('data-error'));
        formData.forEach((div) => div.removeAttribute('data-error-visible'));
      }
      displaySucessModal()
  })

///////////END CHECK USER INPUT////////////

}
main();

