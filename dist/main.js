"use strict";
let prevButton = document.querySelector('#btn-prev');
let nextButton = document.querySelector('#btn-next');
let contentIndicatorList = document.querySelectorAll('.section-indicator');
let sectionContentList = document.querySelectorAll('.section-content');
let headerRefList = document.querySelectorAll('header > a');
let currentSectionId = 0;
let scrollAmount = 0;
let scrollThresh = 3;
function SetSectionContent(sectionId) {
    var prevSection = sectionContentList[currentSectionId];
    var targetSection = sectionContentList[sectionId];
    const hiddenClass = 'hidden';
    if (!prevSection.classList.contains(hiddenClass)) {
        prevSection.classList.add(hiddenClass);
    }
    if (targetSection.classList.contains(hiddenClass)) {
        targetSection.classList.remove(hiddenClass);
    }
    contentIndicatorList[currentSectionId].textContent = 'radio_button_unchecked';
    contentIndicatorList[sectionId].textContent = 'radio_button_checked';
    currentSectionId = sectionId;
}
function NextSectionContent() {
    SetSectionContent((currentSectionId + 1) % sectionContentList.length);
}
function PrevSectionContent() {
    SetSectionContent(currentSectionId - 1 < 0 ? sectionContentList.length - 1 : currentSectionId - 1);
}
prevButton.addEventListener('click', (event) => {
    PrevSectionContent();
});
nextButton.addEventListener('click', (event) => {
    NextSectionContent();
});
document.addEventListener('DOMContentLoaded', (event) => {
    for (let i = 0; i < sectionContentList.length; i++) {
        sectionContentList[i].classList.add('anim-fade-in');
    }
    SetSectionContent(0);
});
headerRefList.forEach((element, i) => {
    element.addEventListener('click', (e) => {
        SetSectionContent(i);
    });
});
// document.addEventListener('wheel', (ev:WheelEvent) => {
//     scrollAmount += ev.deltaY > 0 ? 1 : -1
//     if(Math.abs(scrollAmount) == scrollThresh){
//         scrollAmount > 0 ? NextSectionContent() : PrevSectionContent()
//         scrollAmount = 0
//     }
// })
