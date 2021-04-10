function editNav() {
  let topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const exitBtn = document.querySelectorAll(".close");
//focus modal elements for the focus trap
const modalElts = document.querySelectorAll(".text-control, .checkbox-input, .checkbox-label, .checkbox2-label, .btn-submit")
const firstModalEl = modalElts[0];
const lastModalEl = modalElts[modalElts.length - 1];



/////////MODAL ELEMENT////////
//(OK)modal must contain click and "echap" conditions to exit the window
//(OK) modal navigable /w tab key
//must prevent enter key from closing the modal

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
})

//prevent enter key from closing the modal element
document.addEventListener('keydown', function(eventkey){
  if (eventkey.key === 'Enter'){
    eventkey.preventDefault();
  }
})


