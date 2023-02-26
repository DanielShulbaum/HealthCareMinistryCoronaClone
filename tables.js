const vaccinationTableData = [
    {"settlement": "שוהם", "field1": 91,"field2": 89.93,"field3":74.91,"field4":23.8,"field5":6},
    {"settlement": "כוכב יאיר","field1": 92,"field2": 90.5,"field3":81.94,"field4":29.8,"field5":7.2},
    {"settlement": "ראשון לציון","field1": 78.14,"field2": 74.75,"field3":60.03,"field4":23.6,"field5":5.4},
    {"settlement": "באר שבע","field1": 77.25,"field2": 72.33,"field3":55.72,"field4":37.4,"field5":6.1},
    {"settlement": "ירוחם","field1": 73.42,"field2": 66.82,"field3":48.37,"field4":19.7,"field5":5.6},
    {"settlement": "עספיא","field1": 67.62,"field2": 59.47,"field3":39.78,"field4":12.7,"field5":4.2},
    {"settlement": "בני ברק","field1": 45.32,"field2": 33.42,"field3":19.81,"field4":3.6,"field5":4.3},
    {"settlement": "נצרת","field1": 68.27,"field2": 59.1,"field3":35.98,"field4":10.2,"field5":5.1},
    //scale of daily grade: up to 4.5 inclusive - green, 4.5-6 inclusive - yellow, above 6 - red
];
const ramzorTableData = [
    {"settlement":"תקוע","field1":8.7,"field2":21.5, "field3":16,"field4":-9,"field5":12},
    {"settlement":"עומר","field1":7.9,"field2":55.7, "field3":10,"field4":33,"field5":29},
    {"settlement":"גבע בנימין","field1":6.8,"field2":13.9, "field3":12,"field4":-33,"field5":10},
    {"settlement":"אילת","field1":6.2,"field2":32.2, "field3":5,"field4":7,"field5":150},
    {"settlement":"כפר סבא","field1":6.1,"field2":31.4, "field3":7,"field4":24,"field5":299},
    {"settlement":"כרמיאל","field1":6,"field2":27.3, "field3":8,"field4":11,"field5":104},
    {"settlement":"חצור הגלילית","field1":8.7,"field2":21.5, "field3":16,"field4":-9,"field5":12},
    {"settlement":"עתלית","field1":5.9,"field2":16.5, "field3":6,"field4":0,"field5":19},
    {"settlement":"בית אל","field1":4.9,"field2":3.4, "field3":4,"field4":-37,"field5":9},
    {"settlement":"ברקת","field1":3.6,"field2":14.3, "field3":11,"field4":0,"field5":12},
    //scale of daily grade:up to 4.5 inclusive - green,  4.5-6 inclusive - yellow, above 6 - red
];
const tableOfVaccination = document.getElementById('tableOfVaccination');
const tableRamzor = document.getElementById('ramzorTable');
const header = ["ישוב", "% מתחסנים מנה ראשונה", "% מתחסנים מנה ראשונה","% מתחסנים מנה ראשונה", "חולים פעילים לכל 10,000 נפש","ציון יומי מחושב"];
const headerRamzor = ["ישוב","ציון וצבע יומי","חולים חדשים לכל 10,000 נפש *","% הבדיקות החיוביות *","שיעור שינוי מאומתים *","חולים פעילים"];
const headerRow = document.createElement('div');
const headRowRamzor = document.createElement('div');
headerRow.classList.add('table_of_vaccination_row', 'background_light_blue' );
headRowRamzor.classList.add('table_of_vaccination_row', 'background_light_blue');
tableOfVaccination.appendChild(headerRow);
tableRamzor.appendChild(headRowRamzor);
let tableForDirection = document.createElement('div');
let tableForDirectionRamzor = document.createElement('div');    //try if working not creating a new element but add same element of direction in 2 differen tables
tableForDirection.classList.add("table_of_vaccination_dir");
tableForDirectionRamzor.classList.add("table_of_vaccination_dir");
tableOfVaccination.appendChild(tableForDirection);
tableRamzor.appendChild(tableForDirectionRamzor);
let tableBody = document.createElement('div');
let ramzorTableBody = document.createElement('div');
tableBody.classList.add('table_of_vaccination_body');
ramzorTableBody.classList.add('table_of_vaccination_body');
tableForDirection.appendChild(tableBody);
tableForDirectionRamzor.appendChild(ramzorTableBody);

createHeaders(vaccinationTableData, header, headerRow,true,tableBody);
createHeaders(ramzorTableData,headerRamzor,headRowRamzor, false,ramzorTableBody);
//table of vaccination headers creation
function createHeaders(dataArray,/*data array*/header/*array of header */,headerRow,/*var of header line that get title attached to 
*/isVaccinTable,/*kind of data array maybe as boolean*/tableBody /*place for table attachment */) {
    header.forEach( head =>{
        let titleContainer = document.createElement('div');
        titleContainer.classList.add('table_of_vaccination_cell');
        if(head !== "ישוב") titleContainer.classList.add('text_center');
    /*addition*/
        let title = document.createElement('div');
        titleContainer.appendChild(title);
        title.classList.add('table_of_vaccination_header');
        title.innerText = head;
        let titleTriangle = document.createElement('div');
        titleTriangle.classList.add('fa-solid', 'fa-caret-down', 'table_of_vaccination_sorting_arrow','not_visible');    
        titleTriangle.classList.add('fa-solid', 'fa-caret-down', 'table_of_vaccination_sorting_arrow','not_visible');    
        title.appendChild(titleTriangle);
        headerRow.appendChild(titleContainer); 
        //listener of sorting
        titleContainer.addEventListener('click', event => {
            //first click on header - reset visually if other columns were pressed 
            if(event.target.children[0].classList.contains('not_visible')) {
                let vaccinTableHeaders = document.querySelectorAll(".table_of_vaccination_header");///
                console.log(vaccinTableHeaders);
                vaccinTableHeaders.forEach(header => {
                    if(!(header.children[0].classList.contains('not_visible'))) {
                        header.children[0].classList.add('not_visible');
                        header.style.border = "none";
                    }
                });
            //higlights chosen column
                event.target.children[0].classList.remove('not_visible');
                event.target.style.border = "solid 1.5px";
                createTable (sortTable(dataArray,event.target.innerText,true/*ascending*/,header ),tableBody,isVaccinTable);//should revise to add parameter  
            } else { 
            //second click to change direction of sorting
                if(event.target.children[0].classList.contains('fa-caret-down')) {
                event.target.children[0].classList.toggle('fa-caret-up');
                event.target.children[0].classList.toggle('fa-caret-down');
                createTable (sortTable(dataArray,event.target.innerText,false/*descending*/,header),tableBody,isVaccinTable); //should revise to add parameter
                } 
            //third click to reset visual content
                else if(event.target.children[0].classList.contains('fa-caret-up')) {
                event.target.children[0].classList.toggle('fa-caret-up');
                event.target.children[0].classList.toggle('fa-caret-down');
                event.target.children[0].classList.add('not_visible');
                event.target.style.border = "none";
                }
            }
        })
    });
}

//function to create table, 
const createTable = function (array,/*dataArray*/tableBody, /*element to attach table*/
isVaccinTable/*booleant to change elements in table creation*/  ) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    array.forEach(line => {
        const values = Object.values(line);
        let row = document.createElement('div');
        row.classList.add('table_of_vaccination_row');
        tableBody.appendChild(row);
        let columnCounter = 0;
        for (const value of values) {
            if((columnCounter ===1 || columnCounter===2 || columnCounter===3) /**/&&isVaccinTable ){
                let cell = document.createElement('div');
                cell.classList.add('table_of_vaccination_cell','text_center');
                row.appendChild(cell);
                if(value <90){
                    let barCont = document.createElement('div');
                    barCont.classList.add('table_of_vaccination_bar_container');
                    cell.appendChild(barCont);
                    let bar = document.createElement('div');
                    bar.classList.add('table_of_vaccination_bar');
                    barCont.appendChild(bar);
                    bar.setAttribute("style","width:"+30*value/100+"px");
                    let digit = document.createElement('div');
                    cell.appendChild(digit);
                    digit.innerHTML = value+"%";
                    switch(columnCounter) {
                        case 1:bar.classList.add('background_dark_green');
                            break;
                        case 2:bar.classList.add('background_salade');
                            break;
                        default:bar.classList.add('background_blue_tab');
                    }
                }
                else /*if(value>90)*/{
                    let digit = document.createElement('div');
                    cell.appendChild(digit);
                    digit.innerHTML = "מעל 90%";
                } 
            }   /**/ else if(columnCounter ===2 &&!isVaccinTable ) {
                let cell = document.createElement('div');
                cell.classList.add('table_of_vaccination_cell','text_center');
                row.appendChild(cell);
                let digit = document.createElement('div');
                cell.appendChild(digit);
                digit.innerText = value;
            }   /**/ else if( (columnCounter ===3 || columnCounter ===4) &&!isVaccinTable ) {
                let cell = document.createElement('div');
                cell.classList.add('table_of_vaccination_cell','text_center');
                row.appendChild(cell);
                let digit = document.createElement('div');
                cell.appendChild(digit);
                digit.innerText = value+"%";
            }   /**/ else if( columnCounter ===5 &&!isVaccinTable ) {
                let cell = document.createElement('div');
                cell.classList.add('table_of_vaccination_cell','text_center');
                row.appendChild(cell);
                let digit = document.createElement('div');
                cell.appendChild(digit);
                (value<15) ? digit.innerText ="קטן מ-15" : digit.innerText =value;
            }
                else if  ( ((columnCounter===5)/*added*/&&isVaccinTable) || ((columnCounter===1)&&!isVaccinTable)) {
                    let cell = document.createElement('div');  
                    cell.classList.add('table_of_vaccination_cell','text_center');
                    row.appendChild(cell);
                    let digitBack = document.createElement('div');
                    cell.appendChild(digitBack);
                    digitBack.classList.add('table_of_vaccination_color_container');
                    if(value<=4.5){
                        digitBack.classList.add('background_salade');
                    } else if(value<=6){
                        digitBack.classList.add('background_yellow');
                    } else if(value <= 7.5){ 
                    digitBack.classList.add('background_brown');
                    } else {
                        digitBack.classList.add('background_red')
                    }
                    let digit = document.createElement('div');
                    digitBack.appendChild(digit);
                    digit.innerHTML = value;
                    digitBack.classList.add('text_center');

                }else {
                    let cell = document.createElement('div');  
                    cell.classList.add('table_of_vaccination_cell');
                    if(!isNaN(value)) {
                        cell.classList.add('text_center');
                    }
                    cell.innerHTML = value;     
                    row.appendChild(cell);
                }
            columnCounter++;
        }
    });
}

createTable(vaccinationTableData,tableBody, true);
createTable(ramzorTableData,ramzorTableBody,false);

//vaccination table search bar visible/unvisible
const vaccinTableSearch = document.getElementById('vaccinationTableSearchArea');
const vaccinTableInputArea = document.getElementById('vaccinationSearchInputArea');
const vaccinSearchArrow = document.getElementById('vaccinationTableSearchArrow');
const vaccinTableSearchInput = document.getElementById('vaccinationTableSearch');
vaccinTableSearch.addEventListener('click', (event)=>  {
        vaccinTableInputArea.classList.toggle('not_visible');
        vaccinSearchArrow.classList.toggle('fa-angle-down');
        vaccinSearchArrow.classList.toggle('fa-angle-up');
});
//searching by value at input field based on buttons accept and cancel
const vaccinationInputSearch = document.getElementById('vaccinationTableSearch');
const vaccinationTableSearchAccept = document.getElementById('vaccinationTableSearchAccept');
const vaccinationTableSearchCancel = document.getElementById('vaccinationTableSearchCancel');
const vaccinationTableSearchValues = document.getElementById('vaccinationTableSearchValues');
const ramzorSearchInput = document.getElementById('ramzorSearch');
const ramzorX = document.getElementById('ramzorSearchX');
const ramzorSearchList = document.getElementById('ramzorTableSearchList');
let searchValue = "";

//event for ramzor search
ramzorSearchInput.addEventListener('input', (event)=>{
    ramzorX.classList.remove('not_visible');
    ramzorSearchList.classList.remove('not_visible');
    if(event.target.value.length>1) {
        while (ramzorSearchList.firstChild) {
            ramzorSearchList.removeChild(ramzorSearchList.firstChild);
        } 
        while (ramzorTableBody.firstChild) {
            ramzorTableBody.removeChild(ramzorTableBody.firstChild);
        }
        searched = event.target.value;
        let newarr = [];
        //filterTable(searched,ramzorTableData,ramzorTableBody,false);
        ramzorSearchList.classList.remove('not_visible');
        ramzorTableData.forEach(line => {
            if(line.settlement.includes(event.target.value)) {
                let searchRes = document.createElement('div');
                searchRes.classList.add('ramzor_table_search_value');
                searchRes.innerText = line.settlement;
                ramzorSearchList.appendChild(searchRes);
                newarr.push(line);
                searchRes.addEventListener('click', (e)=> {
                    event.target.value = e.target.innerHTML;
                    searchValue = event.target.value;
                    ramzorSearchList.classList.add('not_visible');
                    filterTable(searchValue,ramzorTableData,ramzorTableBody,false);
                })
            }
        })
        createTable(newarr,ramzorTableBody,false);
    } else if(event.target.value.length ===0) {
        createTable(ramzorTableData,ramzorTableBody,false);
    }
})
ramzorX.addEventListener('click', (e) =>{
    ramzorSearchInput.value = "";
    createTable(ramzorTableData,ramzorTableBody,false);
    ramzorX.classList.add('not_visibible');
    ramzorSearchList.classList.add('not_visible');
} )
//event listener for cancel button
vaccinationTableSearchCancel.addEventListener('click', (event)=> {
    vaccinTableInputArea.classList.toggle('not_visible');
    vaccinSearchArrow.classList.toggle('fa-angle-down');
    vaccinSearchArrow.classList.toggle('fa-angle-up');
    document.getElementById('vaccinationTableSearchX').classList.add('not_visible');
    vaccinationInputSearch.value = "";
    createTable(vaccinationTableData,tableBody,true);
});

//event for input typing inside input field
vaccinationInputSearch.addEventListener('input', (event)=> {
    //remove elements that are search results children 
   while (vaccinationTableSearchValues.firstChild) {
        vaccinationTableSearchValues.removeChild(vaccinationTableSearchValues.firstChild);
    } 
    if(event.target.value !== "") {
        document.getElementById('vaccinationTableSearchX').classList.remove('not_visible');}
    //event to close search input area
    document.getElementById('vaccinationTableSearchX').addEventListener('click', (ev)=> {
        event.target.value = "";
        //ev.target.classList.add('not_visible');
        document.getElementById('vaccinationTableSearchValues').classList.add('not_visible');
        createTable(vaccinationTableData,tableBody,true);
    })
    // show search results
    vaccinationTableSearchValues.classList.remove('not_visible');  
    vaccinationTableData.forEach(line => {
        if(line.settlement.includes(event.target.value)) {
            let searchRes = document.createElement('div');
            searchRes.classList.add('vaccination_table_search_value');
            searchRes.innerHTML = line.settlement;
            vaccinationTableSearchValues.appendChild(searchRes);
            //adding event listener to each search result and changes value of input field accordingly, hides results list
            searchRes.addEventListener('click', (e)=> {
                event.target.value = e.target.innerHTML;
                searchValue = event.target.value;
                vaccinationTableSearchValues.classList.add('not_visible');
            })
        }
    })
});
//event for accept button
vaccinationTableSearchAccept.addEventListener('click',(event) => {
    filterTable(searchValue,vaccinationTableData,tableBody,true);
    vaccinTableInputArea.classList.toggle('not_visible');//3 lines below repeat from cancel button
    vaccinSearchArrow.classList.toggle('fa-angle-down');
    vaccinSearchArrow.classList.toggle('fa-angle-up');
    document.getElementById('vaccinationTableSearchX').classList.add('not_visible');
}) 
//will be changed, instead getting one value will get array with one member and function will be merged with create table
function filterTable (searched,array,tableBody,isVaccinTable) {
    if(searched !== ""){
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
        let arrayForFilter = [];
        array.forEach(line => {
            const values = Object.values(line);
            if(line.settlement === searched){
                arrayForFilter.push(line);
                createTable(arrayForFilter,tableBody,isVaccinTable);
                let row = document.createElement('div');
                row.classList.add('table_of_vaccination_row');
                tableBody.appendChild(row);     
            }
        });
    } else createTable(array,tableBody,isVaccinTable);
}
 function sortTable(array/*dataArray*/,column,ascending, header/*array of headers */) {
    let columnNum = 99;
    let arraySorted = [];
    //getting the right field of object for sort
    for(let index = 0; index<header.length; index++){
        if(header[index] === column) {
            columnNum=index;
            break;
        }
    }
    switch(columnNum) {
        //fieldName= settlement;
        case 0:  ascending
        ? arraySorted = array.sort((a,b)=>{
            let res = 0;
            (a.settlement < b.settlement) ? res= 1 : res = -1;
            return res;
        })
        : arraySorted = array.sort((a,b)=>{
            let res = 0;
            (a.settlement < b.settlement) ? res= -1 : res = 1;
            return res;
        })
        break;
        //fieldName= field1;
        case 1:ascending 
        ? arraySorted = array.sort((a,b)=>{
            return b.field1 - a.field1;
        })
        : arraySorted = array.sort((a,b)=>{
            return a.field1 - b.field1;
        })
        break;
         //fieldName= field2;
        case 2:ascending 
        ? arraySorted = array.sort((a,b)=>{
            return b.field2 - a.field2;
        })
        : arraySorted = array.sort((a,b)=>{
            return a.field2 - b.field2;
        })
        break;
        //fieldName= field3;
        case 3: ascending 
        ? arraySorted = array.sort((a,b)=>{
            return b.field3 - a.field3;
        })
        : arraySorted = array.sort((a,b)=>{
            return a.field3 - b.field3;
        })
        break;
        //fieldName= field4;
        case 4: ascending 
        ? arraySorted = array.sort((a,b)=>{
            return b.field4 - a.field4;
        })
        : arraySorted = array.sort((a,b)=>{
            return a.field4 - b.field4;
        })    
        break;
        //fieldName= field5;
        case 5:ascending 
        ? arraySorted = array.sort((a,b)=>{
            return b.field5 - a.field5;
        })
        : arraySorted = array.sort((a,b)=>{
            return a.field5 - b.field5;
        })         
        break;
        default: arraySorted=[];
    }
return arraySorted;
}


    

