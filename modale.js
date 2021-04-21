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
  const submitBtn = document.querySelectorAll(".btn-submit");


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

  ///////////MESSAGE ERROR OR SUCCESS MODALE//////////////////

  // please fill all the fields
  // please enter correct information 
  // your participation has been sent

  /////////END MESSAGE ERROR OR SUCCESS MODALE////////////////


  ////////////////////CHECK USER INPUT///////////////////////

  //(OK)has the user filled in all required fields?
  //(OK)has the user entered valid text without numbers
  //(OK)is the birth date complete ?
  // check BDay regex
  //(OK)check end of the email input /w ok btn to exit the modal

  submitBtn.forEach((btn) => btn.addEventListener("click", checkUserInput));

  function checkUserInput(event){
    //USER INPUT VALUES
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const userEmail = document.getElementById('email').value;
    const userBDay = document.getElementById('birthdate').value;
    const userParticipation = document.getElementById('quantity').value;
    const checkboxRequired = document.getElementById('checkbox1');

    //CHECK USER INPUT /W REGEX 
    const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
    const REGEX_MAIL =/^[a-z][a-z0-9-_]+@[a-z]+.[a-z]+$/;
    const REGEX_BDAY = /^[0-9]{2}[\/.-][0-9]{2}[\/.-][1-2][0-9]{3}$/;
      
    if ((firstName === "") || (lastName === "")){
        event.preventDefault();
        alert("empty");
    } else if ((REGEX_NAMES.test(firstName) === false) || (REGEX_NAMES.test(lastName) === false)){
      alert("nop");

    } else {
        checkEmail(event);
    }

    function checkEmail(event){
      event.preventDefault();
      if (userEmail === "") {
        alert("mail empty");
      } else if (REGEX_MAIL.test(userEmail) === false){
        alert("nop email");
      } else {        
        checkParticpation(event);
      }
    }


    //REVOIR REGEX MAIL APPAREMENT

    // function checkBDay(event){
    //   if (userBDay === "") {
    //     event.preventDefault();
    //     console.log("non birthday")
    //   } else if (REGEX_BDAY.test(userBDay) === false){
    //     console.log("non regex birthday")
    //   } else {
    //     checkParticpation(event);
    //   }
    // }

    function checkParticpation(event){
      event.preventDefault();
      if (userParticipation == "") {
        alert("inserer nombre participation meme zero")
      } else if (userParticipation < 0 || userParticipation > 10) {
        alert("impossible ! reessayer")
      } else {
        checkCheckboxes(event);
      }
    }

    function checkCheckboxes(event){
      event.preventDefault();
      if (checkboxRequired.checked === false) {
        alert("merci de cocher la case obligatoire");
      } else {
        event.preventDefault();
        event.returnValue = true
      }
    }


  }

    //////////////////END CHECK USER INPUT///////////////////////

}
main();
