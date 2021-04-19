function main(){
  function editNav() {
    let topNav = document.getElementById("myTopnav");
    if (topNav.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  ///////// DOM Elements ////////
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const exitBtn = document.querySelectorAll(".close");
  const submitBtn = document.querySelectorAll(".btn-submit");


  //focus modal elements for the focus trap
  const modalElts = document.querySelectorAll(".text-control, .checkbox-input, .checkbox-label, .checkbox2-label, .btn-submit")
  const firstModalEl = modalElts[0];
  const lastModalEl = modalElts[modalElts.length - 1];
  //end modal elements for focus trap



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

  //prevent enter key from closing the modal element and send the form
  document.addEventListener('keydown', function(eventkey){
    if (eventkey.key === 'Enter'){
      eventkey.preventDefault();
    }
  })



  ///////CHECK USER INPUT////////
  //has the user filled in all required fields?
  //has the user entered valid text without numbers
  //has the user entered a number when needed
  //check end of the email input



  //USER INPUT VALUES
  let firstName = document.getElementById('first').value;
  let lastName = document.getElementById('last').value;
  let userEmail = document.getElementById('email').value;

  let regexOnlyWords =/^[a-zîïéèêëì]+([-'\s][a-zîïéèêëì][a-zéèêëìîï]+)?$/i;

  submitBtn.forEach((btn) => btn.addEventListener("click", checkUserInput));


  function checkUserInput(event){
    console.log("ok");
    if (firstName === ""){
      event.preventDefault();
      console.log("empty");
    }
    // else if (regexOnlyWords.test(firstName) === false){
    //   event.preventDefault();
    //   console.log("nop");
    // }

    else if (firstName.match(regexOnlyWords)){
      event.preventDefault();
      console.log("nop");

    }
    else {
      event.preventDefault();
      console.log(firstName)
    }
  }
}
main();
