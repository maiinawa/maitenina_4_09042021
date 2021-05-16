function main(){

  //////////////// DOM Elements //////////////
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const exitBtn = document.querySelectorAll("#close");
  const formData = document.querySelectorAll(".formData");
  const burger = document.querySelector(".icon");
  const form = document.getElementById('form');
  const modalContainer = document.querySelector(".content");
  const btnGo = document.createElement('button');
  const radios = document.getElementsByName('location');
  const labelsRadio = document.getElementsByClassName('checkbox-label')
  const successModal = document.createElement('div');

// STYLING DOM ELEMENTS

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

  function sendForm(){
    form.submit()
  }

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
  //(OK)modal must contain click and "echap" conditions to exit the window
  //(OK)modal navigable /w tab key
  //(OK)must prevent enter key from closing the modal
  //(OK)focus in checkbox, a voir

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }
  function displaySucessModal(){
    // form.style.display= "none";
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


///////////// FOCUS TRAP //////////

  //modal elements for the focus trap
  const modalElts = document.querySelectorAll(".text-control, .checkbox-input, .checkbox-label, .checkbox2-label, .btn-submit")
  const firstModalEl = modalElts[0];
  const lastModalEl = modalElts[modalElts.length - 1];

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

  /////////////CHECK USER INPUT//////////////

  //(OK)has the user filled in all required fields?
  //(OK)has the user entered valid text without numbers
  //(OK)is the birth date complete ?
  // check BDay regex
  //(OK)check end of the email input /w ok btn to exit the modal

  form.onsubmit = (function(event){

  const inputs = document.forms["reserve"];

  //CHECK USER INPUT /W REGEX
    const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
    const REGEX_MAIL =/^[a-z][a-z0-9-_]+@[a-z]+.[a-z]+$/;
    const REGEX_BDAY = /^[1-2][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/;


  // MSG ERROR
    let msg;
    let focusedInput;

    let erreur = {};
    erreur.empty = "Veuillez renseigner ce champ.";
    erreur.incorrect = "Veuillez renseigner correctement le champ.";
    erreur.ville = "Veuillez choisir une ville.";
    erreur.radio = "Veuillez accepter les conditions générales.";

    

    event.preventDefault();


    if (REGEX_NAMES.test(inputs["first"].value) === false){
      inputs["first"].style.border = "red 2px solid";
      msg = erreur.incorrect;
      focusedInput = formData[0];
      formData[0].setAttribute('data-error',msg)
      formData[0].setAttribute('data-error-visible','true')
      }
      else{
        inputs["first"].style.border = "unset";
        formData[0].removeAttribute('data-error');
        formData[0].removeAttribute('data-error-visible');
      }

    if (REGEX_NAMES.test(inputs["last"].value) === false) {
      inputs["last"].style.border = "red 2px solid";
      msg = erreur.incorrect;
      formData[1].setAttribute('data-error',msg)
      formData[1].setAttribute('data-error-visible','true')
    }
    else{
      inputs["last"].style.border = "unset";
      formData[1].removeAttribute('data-error');
      formData[1].removeAttribute('data-error-visible');
    }

    if (REGEX_MAIL.test(inputs["email"].value) === false){
      inputs["email"].style.border = "red 2px solid";
      msg = erreur.incorrect;
      formData[2].setAttribute('data-error',msg)
      formData[2].setAttribute('data-error-visible','true')
      }
      else{
        inputs["email"].style.border = "unset";
        formData[2].removeAttribute('data-error');
        formData[2].removeAttribute('data-error-visible');
      }

      if (REGEX_BDAY.test(inputs["birthdate"].value) === false){
        inputs["birthdate"].style.border = "red 2px solid";
        msg = erreur.incorrect;
        formData[3].setAttribute('data-error',msg)
        formData[3].setAttribute('data-error-visible','true')
      }
      else{
        inputs["birthdate"].style.border = "unset";
        formData[3].removeAttribute('data-error');
        formData[3].removeAttribute('data-error-visible');
      }

      if (inputs["checkbox1"].checked === false) {
        msg = erreur.radio
        formData[6].setAttribute('data-error',msg)
        formData[6].setAttribute('data-error-visible','true')
      }
      else{
        inputs["checkbox1"].style.border = "unset";
        formData[6].removeAttribute('data-error');
        formData[6].removeAttribute('data-error-visible');
      }

      if(inputs["quantity"].value === 0){
        console.log('red')
        radios.setAttribute('disabled');
        labelsRadio.setAttribute('disabled')
      }

      if (inputs["quantity"].value > 0) {
        let checkRadio = false;
        inputs[4].style.border = "transparent 1px solid";
        formData[4].removeAttribute('data-error');
        formData[4].removeAttribute('data-error-visible');


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
        //!checkradio -> checkradio=false
        if (!checkRadio){
          msg = erreur.ville;
          formData[5].setAttribute('data-error',msg)
          formData[5].setAttribute('data-error-visible','true')
        }
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
        return false;
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
