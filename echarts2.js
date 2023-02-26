const citizensDataArray = [];
const citizensDataArrayAnswered = [];
const existingSickRelativeDataArray = [
    ["5-11",47.8,0,76],
    ["12-15",46.3,95.2,62.1],
    ["16-19",37.3,47.3,58.3],
    ["20-29",79.5,89.9,70.2],
    ["30-39",113.5,89.9,107],
    ["40-49",115.6,77.6,131.6],
    ["50-59",172.6,69.9,141.7],
    ["60-69",212.8,145.7,267.2],
    [ "70-79",432.1,197.2,366.5],
    ["80+",428.1,282.4,357.2]
];
const existingSickAbsoluteDataArray = [

    ["5-11",442,0,217],
    ["12-15",121,88,217],
    ["16-19",48,52,219],
    ["20-29",141,86,668],
    ["30-39",146,147,974],
    ["40-49",118,92,1166],
    ["50-59",108,54,1036],
    ["60-69",126,56,1725],
    [ "70-79",118,37,1737],
    ["80+",78,38,884]

];
const existingHardSickRelativeDataArray = [

    ["5-11",0,0,0],
    ["12-15",0.4,0,0],
    ["16-19",0,0,0],
    ["20-29",0.6,0,0.1],
    ["30-39",0.8,0,0],
    ["40-49",2,0.8,0],
    ["50-59",4.8,1.3,0.1],
    ["60-69",3.4,5.2,1.9],
    [ "70-79",22,10.7,4.2],
    ["80+",22,7.4,8.5]

];
const existingHardSickAbsoluteDataArray = [
    ["5-11",0,0,0],
    ["12-15",1,0,0],
    ["16-19",0,0,0],
    ["20-29",1,0,1],
    ["30-39",1,0,0],
    ["40-49",2,1,0],
    ["50-59",3,1,1],
    ["60-69",2,2,12],
    [ "70-79",6,2,20],
    ["80+",4,1,21]
];
const deadDataArray =[];
const finalDate = 1652939155452;
const startDay = 1652939155452 - 86400000 * 365;   //startDay
const day = 86400000;
const colors = ["#50cbfd", "#b6ca51", "#1c7d7e"];
const sickArray = [];
// graph titles
const graphTitles = ['מספר\nמאושפזים','תושבים\nנכנסים','מספר\nנפטרים'];
const seriesOptions = [
    {type: 'line',
    stack: 'Total',
    areaStyle: {},
    emphasis: { focus: 'series'}},
    {type: 'line',},
    [{type:'bar'},{type:'line'}]
]
const categoryNames = [
    ['קשה','בינוני','קל'],
    ['לא מחוסנים', 'מחוסנים ללא תוקף', 'מחוסנים'],
    ['נפטרים', 'ממוצע נע נפטרים',]

];

let sortSickArray = [];
const sickTimeChoice = [document.getElementById('hospitalizedButtonTillNow'),document.getElementById('hospitalizedButtonYear'),document.getElementById('hospitalizedButtonHalfYear'),document.getElementById('hospitalizedButtonThreeMonthes'),document.getElementById('hospitalizedButtonLastMonth')];
const sickCategoryChoice = [document.getElementById('hospitalized_chart_hard'),document.getElementById('hospitalized_chart_mediate'),document.getElementById('hospitalized_chart_easy')];
const citizensCategoryChoice = [document.getElementById('citizensInto'),document.getElementById('citizensDiagnozed')];
const citizensTimeChoice = [document.getElementById('citizensButtonTillNow'),document.getElementById('citizensButtonYear'),document.getElementById('citizensButtonHalfYear'),document.getElementById('citizensButtonThreeMonthes'),document.getElementById('citizensButtonLastMonth')];
const deadCategoryChoice = [];
const deadTimeChoice = [document.getElementById('deadButtonTillNow'),document.getElementById('deadButtonYear'),document.getElementById('deadButtonHalfYear'),document.getElementById('deadButtonThreeMonthes'),document.getElementById('deadButtonLastMonth')]

function defineSeriesArray(dataArray, categoryChoiceArray, categoryNames, seriesOpt){
    if(categoryChoiceArray.length === 0){
        let seriesArray = [
            {
                ...seriesOpt[0],
                name:categoryNames[0],
                data: dataArray.map((line)=>line[1])
            },
            {
                ...seriesOpt[1],
                name:categoryNames[1],
                data: dataArray.map((line)=>line[2])
            }
        ]
        return seriesArray;
    }
    let seriesArray =
    [
        {
            ...seriesOpt,
            name: categoryNames[0],//'קשה',
            data: dataArray.map((line)=>line[1])
        },
        {
            ...seriesOpt,
            name: categoryNames[1],
            data: dataArray.map((line)=>line[2])
        },
        {   
            ...seriesOpt,
            name: categoryNames[2],
            data: dataArray.map((line)=>line[3])  
        }
    ];
    let filteredCategoryArray = [];
    if(categoryChoiceArray.length ===3){
        if(!categoryChoiceArray[0].checked && !categoryChoiceArray[1].checked && !categoryChoiceArray[2].checked){
            return seriesArray;
        } else {

            if(categoryChoiceArray[0].checked) {
                filteredCategoryArray.push(seriesArray[0]);
            }
            if(categoryChoiceArray[1].checked) {
                filteredCategoryArray.push(seriesArray[1]);
            }
            if(categoryChoiceArray[2].checked){
                filteredCategoryArray.push(seriesArray[2]);
            }
        }
        return (filteredCategoryArray);
    }
    if(categoryChoiceArray.length ===2) {
        return (seriesArray);
    }
}

const timeToDayMonth= (da)=>{
    let dat = new Date(parseInt(da));
    let day = (dat.getDate() > 9) ? dat.getDate() : "0" + dat.getDate();
    let month = (dat.getMonth()+1 > 9) ? dat.getMonth()+1 : "0"+(dat.getMonth()+1);
    return (day +"."+ month);
};

const timeToDayMonthWeekYear = (da)=>{
    let dayWeek = "";
    let dat = new Date(parseInt(da.value));
    let day = (dat.getDate()>9) ? dat.getDate() : "0" + dat.getDate();
    let month = (dat.getMonth()+1 > 9) ? dat.getMonth()+1 : "0"+(dat.getMonth()+1);
    let year = (dat.getFullYear().toString().slice(-2));
    switch (dat.getDay()) {
        case 0: dayWeek = "יום א'";        
            break;
        case 1: dayWeek = "יום ב'";        
            break;
        case 2: dayWeek = "יום ג'";        
            break;
        case 3: dayWeek = "יום ד'";        
            break;
        case 4: dayWeek = "יום ה'";        
            break;
        case 5: dayWeek = "יום ו'";        
            break;
        case 6: dayWeek = "יום ש'";        
            break;
        default: dayWeek = "יום א'";
    }
    return (dayWeek +" "+ day +"."+ month + "."+year);
}

function defineOption(title, colors, dataArray, categoryChoiceArray, categoryNames, seriesOpt){

    let option = {
            title: [{
                left:60,
                textAlign:'right',
                text:title,//'מספר\nמאושפזים',
                textStyle:{ fontStyle: 'normal',
                            fontFamily:'Open Sans',
                            fontWeight:'normal',
                            fontSize:15
                            },
            }],
            color: colors, //["#50cbfd", "#b6ca51", "#1c7d7e"],
            tooltip:{
                trigger:'axis',
                axisPointer:{
                    label:{
                        formatter: timeToDayMonthWeekYear
                    }
                },
                showContent:true
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            legend: {show:false},           
            xAxis: [{
                type: 'category',
                name: 'תאריך',
                nameLocation: 'center',
                nameTextStyle: {
                    fontStyle: 'normal',
                    fontFamily:'Open Sans',
                    fontWeight:'normal',
                    verticalAlign:'top',
                    padding:[15, 0, 0, 0],
                    fontSize:15,
                },
                axisLine:{show : false},
                axisTick:{show : false},
                boundaryGap:true,
                axisLabel: {
                    formatter: timeToDayMonth
                },
                data:dataArray.map((line)=>line[0])
                
            }],
            yAxis: 
            [{
                type: 'value',
                axisPointer:{
                    lineStyle: {join:"round"}
                    }}],
         series: defineSeriesArray(dataArray, categoryChoiceArray, categoryNames, seriesOpt)
    }
    return(option);
}

function createData(startingDate, finalDate){
    let arrayReturned = [];
    for(let index = startingDate; index <finalDate; index+=day){
        let dataRow=[];
        let dataRowCitizens = [];
        let dataRowCitizensAnswered = [];
        let dataRowDead = [];
        //graph1
        let mid = Math.floor(Math.random() * (200 -25) + 25);
        let easy = Math.floor(Math.random() * (400 - mid) + mid);
        let heavy = Math.floor(Math.random() * (400 - mid) + mid);
        //graph2
        let vaccinated = Math.floor(Math.random() * (10000) + 7500);
        let vaccinatedOutd = Math.floor(Math.random() *(100) + 250 );
        let notVaccinated = Math.floor(Math.random() * (1000) + 1000);
        let vaccinatedAnswered = Math.floor(Math.random() * (200) + 50);
        let vaccinatedOutdAnswered = Math.floor(Math.random() *(50) + 10 );
        let notVaccinatedAnswered = Math.floor(Math.random() * (40) + 5);
        let deadDaily = Math.floor(Math.random() * (30) + 10);
        let deadDailyMean = Math.floor(Math.random() * (30) + 4);
        dataRowCitizensAnswered.push(index,notVaccinatedAnswered,vaccinatedOutdAnswered,vaccinatedAnswered);
        dataRow.push(index,heavy,mid,easy);
        dataRowCitizens.push(index,notVaccinated,vaccinatedOutd,vaccinated);
        dataRowDead.push(index, deadDaily, deadDailyMean);
        citizensDataArray.push(dataRowCitizens);
        citizensDataArrayAnswered.push(dataRowCitizensAnswered)
        sickArray.push(dataRow);
        deadDataArray.push(dataRowDead);
    }
    return (arrayReturned);
}

function timeSpanChoice(buttonsArray) {
    for (let index = 0; index < buttonsArray.length; index++) {
        if(buttonsArray[index].checked){
            return index;
        }
    }
}

function defineTimeSpan (buttonsArray){
     let sortDay;
    switch(timeSpanChoice(buttonsArray)){
        case 0: sortDay=1652939155452;
        break;
        case 1: sortDay=1652939155452;
        break;
        case 2: sortDay=1652939155452 - (86400000 * 182);
        break;
        case 3: sortDay=1652939155452 - (86400000 * 90);
        break;
        case 4: sortDay=1652939155452 - (86400000 * 31);
        break;
        default: sortDay=1652939155452 ;
    }
    return (sortDay);
}

function filterArray (sortDay,dataArray) {
    let sortArray = [];
    let newStart = (sortDay - startDay)/day;
    if(newStart === 365) {
        dataArray.forEach(array => {
            sortArray.push(array);
        });
    } else {
        for(let index = newStart; index < dataArray.length; index++){
            let row = [];
            for (let indexIntern = 0; indexIntern <4; indexIntern++) {
                row.push(dataArray[index][indexIntern]);
            }
            sortArray.push(row);
        }
    }
    return sortArray;
}
function validCategory (categoryArray) {
    let filteredColorsArray = []
    if(!categoryArray[0].checked && !categoryArray[1].checked && !categoryArray[2].checked){  
        filteredColorsArray =["#50cbfd", "#b6ca51", "#1c7d7e"];
        return(filteredColorsArray);
    } else {
    
        if(categoryArray[0].checked) {
            filteredColorsArray.push("#50cbfd");
        }
        if(categoryArray[1].checked) {
            filteredColorsArray.push("#b6ca51");
        }
        if(categoryArray[2].checked){

            filteredColorsArray.push("#1c7d7e");
        }
    }
    return(filteredColorsArray);
}
//////////
createData(startDay,finalDate);
const chartHospitalized = echarts.init(document.getElementById('hospitalizedChart'));

chartHospitalized.setOption(defineOption(graphTitles[0], colors, sickArray, sickCategoryChoice, categoryNames[0], seriesOptions[0]));

//////////////


//opening menu and filtering
document.getElementById('hospitalizedChartOMenu').addEventListener('click', (event)=> {
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-up');
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-down');
    document.getElementById('hospitalizedChartSort').classList.toggle('not_visible');
});

//buttons accept 
document.getElementById("hospitalizedChartAccept").addEventListener('click', (event)=>  {
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-up');
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-down');
    document.getElementById('hospitalizedChartSort').classList.toggle('not_visible');
    chartHospitalized.clear();
    chartHospitalized.setOption(defineOption(graphTitles[0], validCategory(sickCategoryChoice), filterArray(defineTimeSpan(sickTimeChoice),sickArray), sickCategoryChoice, categoryNames[0], seriesOptions[0] ));

});

// button cancel
document.getElementById("hospitalizedChartCancel").addEventListener('click', (event)=>  {
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-up');
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-down');
    document.getElementById('hospitalizedChartSort').classList.toggle('not_visible');
    chartHospitalized.setOption(defineOption(graphTitles[0],colors, sickArray, sickCategoryChoice, categoryNames[0], seriesOptions[0]));
});



document.getElementById('modeSwitch').addEventListener('click',()=>{
document.getElementById('body').classList.toggle('dark');
    }
)

window.addEventListener('resize', ()=> {
    document.location.reload(true);
})