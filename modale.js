function main(){
  function editNav() {
    let topNav = document.getElementById("myTopnav");
    if (topNav.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  //////////////// DOM Elements //////////////
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const exitBtn = document.querySelectorAll(".close");
  // const submitBtn = document.querySelectorAll(".btn-submit");

  // const inputLine = document.querySelectorAll(".formData");  
  // const errData = document.createElement('span');

  // inputLine.forEach(inputLine.appendChild(errData))







  /////////MODAL ELEMENT////////
  //(OK)modal must contain click and "echap" conditions to exit the window
  //(OK)modal navigable /w tab key
  //(OK)must prevent enter key from closing the modal
  //focus in checkbox, a voir

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
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



////////////////// FOCUS TRAP ///////////////////

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
//////////////END FOCUS TRAP ///////////////////


  //prevent enter key from closing modal element and send the form
  document.addEventListener('keydown', function(eventkey){
    if (eventkey.key === 'Enter'){
      eventkey.preventDefault();
    }
  })

  ////////////////////CHECK USER INPUT///////////////////////

  //(OK)has the user filled in all required fields?
  //(OK)has the user entered valid text without numbers
  //(OK)is the birth date complete ?
  // check BDay regex
  //(OK)check end of the email input /w ok btn to exit the modal

  // document.getElementById('inscription').addEventListener('submit', validate);


  document.forms["reserve"].addEventListener('submit',validate)

  function validate(event){


  //   //CHECK USER INPUT /W REGEX
    const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
    const REGEX_MAIL =/^[a-z][a-z0-9-_]+@[a-z]+.[a-z]+$/;
  //   const REGEX_BDAY = /^[0-9]{2}[\/.-][0-9]{2}[\/.-][1-2][0-9]{3}$/;


  //this = document.forms[reserve]
    let inputs = this;
    let erreurMsg;

    if (REGEX_NAMES.test(inputs["first"].value) === false) {
      inputs["first"].style.border = "blue 3px solid";
      erreurMsg = "Veuillez renseigner correctement ce champ.";
    }
    if (REGEX_NAMES.test(inputs["last"].value) === false) {
      inputs["last"].style.border = "green 3px solid";
      erreurMsg = "Veuillez renseigner correctement ce champ.";
    }

    if (REGEX_MAIL.test(inputs["email"].value) === false){
      inputs["email"].style.border = "pink 3px solid";
      erreurMsg = "Veuillez renseigner correctement ce champ.";
    }

    if (inputs["quantity"].value > 0) {
        let radios = document.getElementsByName('location');
        let checkRadio = false;
        for (let a = 0; a < radios.length; a++){
          if (checkRadio == false){
            if (radios[a].checked === true) {
              checkRadio = true;
              break;
            }
          }
        }
        if (!checkRadio){
          event.preventDefault();
          erreurMsg = "Veuillez renseignez ville.";
          alert('non radio');
        }
      }

      if (inputs["checkbox1"].checked === false) {
        inputs["first"].style.border = "yellow 3px solid";
        erreurMsg = "Veuillez renseigner correctement ce champ.";
      }

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        inputs[i].style.border = "red 2px solid";
        erreurMsg = "Veuillez renseigner ce champ.";
      }
    }

    if (erreurMsg){
      event.preventDefault();
      return false;
    } else {
      alert('FORMuLAIRE VALIDEE')
    }
  }

  //   //////////////////END CHECK USER INPUT///////////////////////



  // //   ////////////////////CHECK USER INPUT///////////////////////

  // // //(OK)has the user filled in all required fields?
  // // //(OK)has the user entered valid text without numbers
  // // //(OK)is the birth date complete ?
  // // // check BDay regex
  // // //(OK)check end of the email input /w ok btn to exit the modal

  // // document.getElementById('inscription').addEventListener('submit', validate);

  // // function validate(event){
  // //   //USER INPUT VALUES
  // //   const firstName = document.getElementById('first');
  // //   const lastName = document.getElementById('last');
  // //   const userEmail = document.getElementById('email');
  // //   const userBDay = document.getElementById('birthdate');
  // //   const userParticipation = document.getElementById('quantity');
  // //   const checkboxRequired = document.getElementById('checkbox1');

  // //   //CHECK USER INPUT /W REGEX
  // //   const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
  // //   const REGEX_MAIL =/^[a-z][a-z0-9-_]+@[a-z]+.[a-z]+$/;
  // //   const REGEX_BDAY = /^[0-9]{2}[\/.-][0-9]{2}[\/.-][1-2][0-9]{3}$/;

  // //   if ((firstName.value === "") || (lastName.value === "")){
  // //     let erreur;

  // //       event.preventDefault();
  // //       erreur = "Veuillez renseignez ce champ";
  // //       firstName.style.border = "red 2px solid";

  // //     } else if ((REGEX_NAMES.test(firstName.value) === false) || (REGEX_NAMES.test(lastName.value) === false)){
  // //       event.preventDefault();

  // //   } else {
  // //       checkEmail(event);
  // //   }

  // //   function checkEmail(event){
  // //     let erreur;
  // //     if (userEmail.value === "") {
  // //       event.preventDefault();
  // //       erreur = "Veuillez renseignez ce champ";

  // //     } else if (REGEX_MAIL.test(userEmail.value) === false){
  // //       event.preventDefault();
  // //       alert("nop email");
  // //     } else {
  // //       checkBDay(event);
  // //     }
  // //   }

  // //   // REVOIR REGEX BDAY APPAREMENT


  // //   function checkBDay(event){
  // //     if (userBDay.value === "") {
  // //       event.preventDefault();
  // //       alert("empty birthday")
  // //     // } else if (REGEX_BDAY.test(userBDay) === false){
  // //     //   alert("non regex birthday")
  // //     } else {
  // //       checkParticpation(event);
  // //     }
  // //   }

  // //   function checkParticpation(event){
  // //     if (userParticipation.value == "") {
  // //       event.preventDefault();
  // //       alert("inserer nombre participation meme zero")
  // //     } else if (userParticipation.value < 0 || userParticipation.values > 10) {
  // //       event.preventDefault();
  // //       alert("impossible ! reessayer")
  // //     } else {
  // //       checkCheckboxes(event);
  // //     }
  // //   }

  // //   function checkCheckboxes(event){
  // //     if (checkboxRequired.checked === false) {
  // //       event.preventDefault();
  // //       alert("merci de cocher la case obligatoire");
  // //     } else {
  // //       alert('great');
  // //     }
  // //   }

  // // }

  // //   //////////////////END CHECK USER INPUT///////////////////////

}
main();
