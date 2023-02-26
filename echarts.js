let citizensData = [];

//1 graph
let arrayOfSick = [];
const d = new Date();
const day = 86400000;
const finalDate = 1652939155452;
const startDay = 1652939155452 - 86400000 * 365;   //startDay
let sortDate = 1652939155452 - 86400000 * 365;
const timeChoice = [];
const categoryChoice=[];
const yearTillNowChoice = document.getElementById('hospitalizedButtonTillNow');
const yearAgoChoice = document.getElementById('hospitalizedButtonYear');
const halfYearChoice = document.getElementById('hospitalizedButtonHalfYear');
const threeMonthChoice = document.getElementById('hospitalizedButtonThreeMonthes');
const lastMonthChoice = document.getElementById('hospitalizedButtonLastMonth');
const heavySickChoice = document.getElementById('hospitalized_chart_hard');
const midSickChoice = document.getElementById('hospitalized_chart_mediate');
const easySickChoice = document.getElementById('hospitalized_chart_easy');
const graphSickTitle = document.getElementById('graphSickTitle');
let sortTimeArr=[];
let sortEasySickArr =[];
let sortMidSickArr =[];
let sortHeavySickArr =[];
timeChoice.push(yearTillNowChoice,yearAgoChoice,halfYearChoice,threeMonthChoice,lastMonthChoice);//array of Dom to get choice
categoryChoice.push(heavySickChoice,midSickChoice,easySickChoice);
let timeArr = [];
let easySickArr = [];
let midSickArr = [];
let heavySickArr = [];
let colors =["#50cbfd", "#b6ca51", "#1c7d7e"];
let seriesCheck = ['קשה','בינוני','קל'];
//creating default series
let seriesArray=[
    {
        name: 'קשה',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series'},
        data: heavySickArr
    },
    {
        name: 'בינוני',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series'},
        data: midSickArr
    },
    {   
        name: 'קל',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {focus: 'series'},
        data: easySickArr   
    }
];
let sortedDataArray = 
    [
        {
            name: 'קשה',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: { focus: 'series'},
            data: sortEasySickArr
        },
        {
            name: 'בינוני',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: { focus: 'series'},
            data: sortMidSickArr
        },
        {   
            name: 'קל',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {focus: 'series'},
            data:sortEasySickArr   
        }
    ];

const seriesBuild = ()=>{ 
    let resultArray=[]
    validCategory();
    sortedDataArray.forEach(obj => {
    for(let index = 0; index < seriesCheck.length; index++){
        if(obj.name ===seriesCheck[index]){
            resultArray.push(obj);
        }
        }
    })
    return(resultArray);
}

//function to transform raw time to day and month
const timeToDayMonth= (da)=>{
    // let day = "";
    // let month = "";
    let dat = new Date(parseInt(da));
    let day = (dat.getDate() > 9) ? dat.getDate() : "0" + dat.getDate();
    let month = (dat.getMonth()+1 > 9) ? dat.getMonth()+1 : "0"+(dat.getMonth()+1);
    return (day +"."+ month);
};

// stage 2 sorting

function timeIntervalChoice() {
    for (let index = 0; index < timeChoice.length; index++) {
        if(timeChoice[index].checked){
            return index;
        }
    }
}

const chartHospitalized = echarts.init(document.getElementById('hospitalizedChart'));

function defineTimeSpan (){
    switch(timeIntervalChoice()){
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
}

//creating array of sick people in categories
function createRowDate(startDay,finalDate){
   //let citizensTitlesRow = ['date', 'notVaccinated', 'vaccinatedOutDated', 'vaccinated'];
   //     citizensData.push(citizensTitlesRow);
    for(let index = startDay; index < finalDate ; index +=day){
        let newObj = {};
        let dataRow = [];   //array to contain data line - from graph2 and on
        let vaccinated = Math.floor(Math.random() * (10000) + 7500);
        let vaccinatedOutd = Math.floor(Math.random() *(100) + 250 );
        let notVaccinated = Math.floor(Math.random() * (1000) + 1000);
        dataRow.push(index,notVaccinated,vaccinatedOutd,vaccinated);
        citizensData.push(dataRow);

        newObj.midSick = Math.floor(Math.random() * (200 -25) + 25);
        newObj.easySick = Math.floor(Math.random() * (400 - newObj.midSick) + newObj.midSick);
        newObj.heavySick = Math.floor(Math.random() * (400 - newObj.midSick) + newObj.midSick);
        newObj.time = index;
        arrayOfSick.push(newObj);
        easySickArr.push(newObj.easySick);
        midSickArr.push(newObj.midSick);
        heavySickArr.push(newObj.heavySick);
        timeArr.push(newObj.time);
    }
    return (arrayOfSick);
}

function sortArray() {
    let newStart = (sortDay - startDay)/day;
    if(newStart === 365) {
        sortTimeArr = timeArr;
    }
    for(index = newStart; index < timeArr.length; index++){
        sortTimeArr.push(timeArr[index]);
        sortEasySickArr.push(easySickArr[index]);
        sortMidSickArr.push(midSickArr[index]);
        sortHeavySickArr.push(heavySickArr[index]);
    }
}   

//creating arrays of sick people and times

function clearArraysData(){
    //clear existing arrays
        sortEasySickArr=[];
        sortMidSickArr= [];
        sortHeavySickArr=[];
        sortTimeArr=[];
}

//creating default object of color

function createSeriesArray(){
    let newSeriesArray=[
        {
            name: 'קשה',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: { focus: 'series'},
            data: sortHeavySickArr
        },
        {
            name: 'בינוני',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: { focus: 'series'},
            data: sortMidSickArr
        },
        {   
            name: 'קל',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {focus: 'series'},
            data: sortEasySickArr   
        }
    ]
    return (newSeriesArray);
}

function validCategory () {
    if(!heavySickChoice.checked && !midSickChoice.checked && !easySickChoice.checked){
        seriesCheck = ['קשה','בינוני','קל'];
        colors =["#50cbfd", "#b6ca51", "#1c7d7e"];
    } else {
    
     seriesCheck=[];
     colors = [];
    if(heavySickChoice.checked) {
        seriesCheck.push('קשה');
        colors.push("#50cbfd");
    }
    if(midSickChoice.checked) {
        seriesCheck.push('בינוני');
        colors.push("#b6ca51");
    }
    if(easySickChoice.checked){
        seriesCheck.push('קל');
        colors.push("#1c7d7e");
    }
    }
}
function defineOption (colors, timeArr){
    let option = {
        title: [{
            left:60,
            textAlign:'right',
            text:'מספר\nמאושפזים',
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
                    formatter: ((da)=>{
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
                    })
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
            data:timeArr
        }],
        yAxis: 
        [{
            type: 'value',
            axisPointer:{
                lineStyle: {join:"round"}
                }}],
        series: seriesBuild()
    };
    console.log(option);
    return option
} 

arrayOfSick = createRowDate(startDay,finalDate);
// console.log('sick is ',arrayOfSick);
// console.log('timeArr ',timeArr);
console.log(colors);
chartHospitalized.setOption(defineOption(colors,timeArr));

//opening menu and sorting
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
    defineTimeSpan();
    clearArraysData();
    sortArray();
    chartHospitalized.clear();
    validCategory()
    chartHospitalized.setOption(defineOption(colors,sortTimeArr));

});
// button cancel
document.getElementById("hospitalizedChartCancel").addEventListener('click', (event)=>  {
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-up');
    document.getElementById('hospitalizedAngle').classList.toggle('fa-angle-down');
    document.getElementById('hospitalizedChartSort').classList.toggle('not_visible');
    seriesCheck = ['קשה','בינוני','קל'];
    colors =["#50cbfd", "#b6ca51", "#1c7d7e"];
    categoryChoice.forEach(option =>{
        option.checked=true;
    })
    chartHospitalized.setOption(defineOption(colors,timeArr));
});


