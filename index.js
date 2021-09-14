const sliderContainer=document.querySelector('.slider-container');
const slideRight=document.querySelector('.right-slide');
const slideLeft=document.querySelector('.left-slide');
const upButton=document.querySelector('.up-button');
const downButton=document.querySelector('.down-button');
const sliderLength=slideLeft.querySelectorAll('div').length;

let activeSlideIndex=0;

slideLeft.style.top=`-${(sliderLength-1)*100}vh`;

upButton.addEventListener('click',(e)=> changeSlide('up',e),false);
downButton.addEventListener('click',(e)=> changeSlide('down',e),false);

const changeSlide=(direction,e)=>{
  const sliderHeight=sliderContainer.clientHeight;
  if(direction==='up'){
    activeSlideIndex++;
    if(activeSlideIndex>sliderLength-1){
      activeSlideIndex=0;
    }
  }
  else if(direction==='down'){
    activeSlideIndex--;
    if(activeSlideIndex<0){
      activeSlideIndex=sliderLength-1;
    }
  }
  slideRight.style.transform=`translateY(-${activeSlideIndex*sliderHeight}px)`;
  slideLeft.style.transform=`translateY(${activeSlideIndex*sliderHeight}px)`;
}

sliderContainer.addEventListener('wheel', (e)=>{
  if(e.deltaY<0) changeSlide('up');
  else changeSlide('down');
});

let y1=null;
sliderContainer.addEventListener('touchstart', handleTouchStart,false);
sliderContainer.addEventListener('touchmove', handleTouchMove,false);

function handleTouchStart(e){
  const firstTouch=e.touches[0];
  y1=firstTouch.clientY;
}

function handleTouchMove(e){
  if(!y1) return false;
  let y2=e.touches[0].clientY;
  if ((y2-y1)<0) changeSlide('up');
  else changeSlide('down');
}
let startY=0;
sliderContainer.addEventListener('mousedown',handleMouseDown,false);
sliderContainer.addEventListener('mouseup',handleMouseUp,false);

function handleMouseDown(e){
  startY=e.clientY;
}

function handleMouseUp(e){
  if(!startY) return false;
  if((e.clientY-startY)<0) changeSlide('up');
  else changeSlide('down');
}
