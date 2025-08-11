import { queryAllCheck, queryCheck } from "./ts/queryHelper";
import { fromEvent } from 'rxjs';

const root= document.documentElement;
const headerH1 = queryCheck<HTMLHeadElement>("header h1");
const haederLogo = queryCheck<HTMLHeadElement>("header #logo");
const header = queryCheck<HTMLHeadElement>("header");
const navBar = queryCheck<HTMLElement>("header nav");

//#region observer
const observer = new IntersectionObserver((entries, observer) => {
   entries.forEach(entry => {
     let target: Element= entry.target;
     if (entry.isIntersecting) {
      if(target.classList.contains("animationScroll")){
      
        entry.target.classList.add('animationHowWorks2');
        
      }
      if(target.classList.contains("animationAppear")){
      
        entry.target.classList.add('animationAppearing');
        
      }
      if(target.classList.contains("animationAppearSlide")){
      
        entry.target.classList.add('animationAppearingSlide');
        
      }
      if(target.classList.contains("animationH")){
      
        entry.target.classList.add('animationAppear');
      }
    if(target.classList.contains("sliderTopAnimation")){
      
        entry.target.classList.add('animationSlide');
      }
  if(target.classList.contains("animationFormSlide")){
      
        entry.target.classList.add('animationSlideForm');
      }
      if(target.classList.contains("animationScale")){
        entry.target.classList.add('animationScaling');
      }
    observer.unobserve(entry.target);
    }
  });
});



const animationAppear = queryAllCheck<HTMLElement>(".animationAppear");

animationAppear.forEach(element=>{  
  observer.observe(element);
});

const animationAppearSlide = queryCheck<HTMLElement>(".animationAppearSlide"); 

  observer.observe(animationAppearSlide);

const contentEditTimer=queryCheck<HTMLElement>("#contentEditTimer");

  observer.observe(contentEditTimer);

  document.querySelectorAll('.sliderTopAnimation').forEach(element => {
  observer.observe(element);
});
  document.querySelectorAll('.animationFormSlide').forEach(element => {
  observer.observe(element);
});

 document.querySelectorAll('.animationScale').forEach(element => {
  observer.observe(element);
});
//#endregion observer

const mediaQueryScroll = window.matchMedia("(max-width: 800px)");
handleResize(mediaQueryScroll);

mediaQueryScroll.addEventListener("change", handleResize);
function handleResize(e: {matches: boolean}) {
  if (e.matches) {
    scroll();
    } 
  else
    unscroll();
}


const mediaQueryObserver = window.matchMedia("(min-width: 800px)");
observerHandle(mediaQueryObserver);

mediaQueryObserver.addEventListener("change", observerHandle);
function observerHandle(e: {matches: boolean}) {
  if (e.matches) {
    document.querySelectorAll('.animationScroll').forEach(element => {
    observer.observe(element);
    });
  } 
  }
  const burgerMenuIcon = queryCheck<HTMLLabelElement>("#labelBurgerMenu");
function onScrollDown() {

  if (window.scrollY >= 10) {
    burgerMenuIcon.classList.remove("hidden");
    root.style.setProperty("--positionBurgerMenu", "10px");
    root.style.setProperty("--burgerMenuHeight", "0px");
    headerH1.classList.add("scaleSmaller");
    haederLogo.classList.add("scaleSmaller");
    header.classList.add("scaleSmallerHeight");
    navBar.style.marginTop = "10px";
  }
}

function onScrollUp() {

  if (window.scrollY <= 10) {
    burgerMenuIcon.classList.add("hidden");
    root.style.setProperty("--positionBurgerMenu", "-30px");
    root.style.setProperty("--burgerMenuHeight", "180px");
    headerH1.classList.remove("scaleSmaller");
    haederLogo.classList.remove("scaleSmaller");
    navBar.style.marginTop = "40px";
  }
}

function scroll() {
  window.addEventListener("scroll", onScrollDown);
  window.addEventListener("scroll", onScrollUp);
}

function unscroll(){
    const burgerMenuIcon = queryCheck<HTMLLabelElement>("#labelBurgerMenu");
  window.removeEventListener("scroll", onScrollDown);
  window.removeEventListener("scroll", onScrollUp);
  headerH1.classList.remove("scaleSmaller");
  haederLogo.classList.remove("scaleSmaller");
  burgerMenuIcon.classList.add("hidden");
    root.style.setProperty("--positionBurgerMenu", "-30px");
    root.style.setProperty("--burgerMenuHeight", "180px");
}
const howWorksButtons = queryCheck<HTMLElement>("#howWorks");

howWorksButtons.addEventListener("click",(event)=>{
  let elememtTarget = event.target as HTMLElement;
  let subTimerButton= queryCheck<HTMLParagraphElement>("#howWorks div:first-of-type p:nth-of-type(2)");
  let editTimerButton= queryCheck<HTMLParagraphElement>("#howWorks div:first-of-type p:nth-of-type(1)");

  let contentEdittimer= queryCheck<HTMLElement>("#contentEditTimer")
  let contentSubtimer= queryCheck<HTMLElement>("#contentSubTimer")
  if(contentEdittimer.classList.contains("animationAppearing"))
    contentEditTimer.classList.remove("animationAppearing")

  if(elememtTarget.textContent=="Sub Timer"){
    subTimerButton.classList.add("selected");
    editTimerButton.classList.remove("selected");
    
    root.style.setProperty("--opacityEditTimer","0");
    setTimeout(()=>{
     root.style.setProperty("--opacitySubTimer","1");
    },150)
   
    setTimeout(()=>{
      contentEdittimer.classList.add("hidden");
      contentSubtimer.classList.remove("hidden");
    },100)
  }


   if(elememtTarget.textContent=="Edit Timer"){
    subTimerButton.classList.remove("selected");
    editTimerButton.classList.add("selected");


    root.style.setProperty("--opacitySubTimer","0");
    setTimeout(()=>{
     root.style.setProperty("--opacityEditTimer","1");
    },150)
     root.style.setProperty("--opacityEditTimer","0");
    setTimeout(()=>{
      contentSubtimer.classList.add("hidden");
       contentEdittimer.classList.remove("hidden");
    },100)
  }
});

//#region form
let form = queryCheck<HTMLFormElement>("#formNewsLetter");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex =/^(\p{L}+\s?)+$/us;

let emailValue = queryCheck<HTMLInputElement>("#emailField");
let nameValue = queryCheck<HTMLInputElement>("#nameField");

let messageInvalidEmail = queryCheck<HTMLSpanElement>("#messageInvalidEmail");
let messageInvalidName = queryCheck<HTMLSpanElement>("#messageInvalidName");

form.addEventListener("submit", (event)=>{event.preventDefault(); 
  if(emailRegex.test(emailValue.value)){
    if(nameRegex.test(nameValue.value)){
      form.submit();
    }
    else
       invalidField(nameValue,messageInvalidName)
  }
  else
    invalidField(emailValue,messageInvalidEmail);

  if(!emailRegex.test(emailValue.value) && !nameRegex.test(nameValue.value)){
    invalidField(nameValue,messageInvalidName);
    invalidField(emailValue,messageInvalidEmail);
  
  }
});

function invalidField(field: HTMLInputElement,error:HTMLSpanElement){
  error.classList.remove("hidden");
  field.classList.add("invalidInput");
}
function removeInvalidfield(field: HTMLInputElement,error:HTMLSpanElement){
    error.classList.add("hidden");
  field.classList.remove("invalidInput");
}


fromEvent(emailValue, 'keydown').subscribe(() => {
  if(!messageInvalidEmail.classList.contains("hidden")){
    removeInvalidfield(emailValue,messageInvalidEmail);
  }
});
fromEvent(nameValue, 'keydown').subscribe(() => {
  if(!messageInvalidName.classList.contains("hidden")){
    removeInvalidfield(nameValue,messageInvalidName);
  }
});



//#endregion form


