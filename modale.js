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


  //prevent enter key from closing the modal element and send the form
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
  //is the birth date complete ?
  //is the user over 18 to compete ?
  //(OK)check end of the email input /w ok btn to exit the modal

  submitBtn.forEach((btn) => btn.addEventListener("click", checkUserInput));

  function checkUserInput(event){
    //USER INPUT VALUES
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const userEmail = document.getElementById('email').value;

    //CHECK USER INPUT /W REGEX 
    const REGEX_NAMES =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;
    const REGEX_MAIL =/^[a-z][a-z0-9-_]+@[a-z]+.[a-z]+$/;
      
    if ((firstName === "") || (lastName === "")){
        event.preventDefault();
        console.log("empty");
    } else if ((REGEX_NAMES.test(firstName) === false) || (REGEX_NAMES.test(lastName) === false)){
        event.preventDefault();
        console.log("nop");

    } else {
        event.preventDefault();
        checkEmail(event);
    }
    function checkEmail(event){
      if (userEmail === "") {
        event.preventDefault();
        console.log("mail empty");
      } else if (REGEX_MAIL.test(userEmail) === false){
        event.preventDefault();
        console.log("nop email");
      } else {
        console.log("okaaaay")
      }
    }
  }

    //////////////////END CHECK USER INPUT///////////////////////

}
main();
