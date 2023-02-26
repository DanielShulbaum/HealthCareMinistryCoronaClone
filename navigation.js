let header_nav = document.getElementsByClassName('secondary_header__title');
let arrOfTitles = document.querySelectorAll('.secondary_header__title')
let body_headers = document.getElementsByClassName('section1__top_title');
let current = header_nav[0];    //unused
let currentView = body_headers[0];  //unused
let mainScroll = document.getElementsByClassName('body_all');
let window_center = window.innerHeight/2;
let body = document.querySelector('.body_all');
let navBar = document.getElementsByClassName('secondary_header');
let tempSpan = document.getElementById('tempLink');
//console.log(header_nav);
//console.log(body_headers);
//console.log(body);
//console.log('pos of navbar' + navBar.offsetLeft);
// document.querySelector("#button").disabled = true;
function ya(){
    console.log('pressed');
}



header_nav[0].classList.add('gray_background');
body.addEventListener('scroll', ()=> {
        for (let i=0; i<body_headers.length; i++) {
            if(isVisible(body_headers[i])) {
                let elLoc = body_headers[i].getBoundingClientRect();
                //console.log(elLoc);
                if (elLoc.top <= window_center) {
                    currentView = body_headers[i];
                    removeClass();
                    header_nav[i].classList.add('gray_background');
                    navBar[0].scrollBy((i*-87),0);
                    break;
                }
                else if (elLoc.top > window_center) {
                    currentView = body_headers[i-1];
                    removeClass();
                    header_nav[i-1].classList.add('gray_background');
                    navBar[0].scrollBy(((i-1)*-87),0);
                    break;
                }
            }
        }
    });

function removeClass() {
    for(let k = 0; k < header_nav.length; k++) {
        if(header_nav[k].classList.contains('gray_background')){
            header_nav[k].classList.remove('gray_background');
        }
    }
}

function isVisible(el) {
    const {top, bottom} = el.getBoundingClientRect();
    const ViewPortHeight = (window.innerHeight);
    return ( ( top > 0 || bottom > 0) && top < ViewPortHeight);
}

/*const moveWindow = function () {
    console.log("moved");
    mainScroll[0].scrollBy(0,500);

}*/
//following is uncomplete function to direct window after moving to apropriate part in html
/*arrOfTitles.forEach(title => title.addEventListener('click',(e)=> {
    // e.preventDefault();
    //mainScroll[0].scrollBy(0,200)
    console.log("moved");
    setTimeout(()=>mainScroll[0].scrollBy(0,50), 2000);   
} ));*/
//console.log(navBar[0].scrollbar.getBoundingClientRect());
//setTimeout(moveWindow, 2000)*/