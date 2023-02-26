
const chartCitizens = echarts.init(document.getElementById('citizensChart'));
const citizensChartOpening = document.getElementById('citizensIntoCountry');


chartCitizens.setOption(defineOption(graphTitles[1], colors, citizensDataArray, citizensCategoryChoice, categoryNames[1], seriesOptions[1]));


/*let optionCit = {
    title: [{
            left:60,
            textAlign:'right',
            text:'תושבים\nנכנסים',
            textStyle:{ fontStyle: 'normal',
                        fontFamily:'Open Sans',
                        fontWeight:'normal',
                        fontSize:15
                        },
        }],
        color: colors,
      tooltip: {
        trigger: 'axis',
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
                    return (dayWeek + " "+ day +"."+ month + "."+year);
                })
            }
        },
        showContent:true
      },
      legend: {show:false},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      legend: {show : false},
      xAxis: {
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
        boundaryGap: false, //true
        axisLabel: {
            formatter: timeToDayMonth
        },
        //datasetIndex:0
        data: timeArr// ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: [{
        type: 'value',
        axisPointer: {
            lineStyle: {join:"round"}
        }}],
      series: [
        {
          name: 'לא מחוסנים',
          type: 'line',
          data: citizensData.map((element)=>element[1]),
          //datasetIndex: 1
        },
        {
          name: 'מחוסנים ללא תוקף',
          type: 'line',
          data: citizensData.map((element)=>element[2]),
          //datasetIndex: 2
        },
        {
          name: 'מחוסנים',
          type: 'line',
          data: citizensData.map((element)=>element[3]),
          //datasetIndex: 3
        }
      ]
};*/
//console.log(citizensData);
//let res = citizensData.map((element) =>element[0]);
// console.log('res', res);
// chartCitizens.setOption(optionCit);

document.getElementById('citizensIntoCountry').addEventListener('click', (event) =>{
    document.getElementById('citizensAngle').classList.toggle('fa-angle-up');
    document.getElementById('citizensAngle').classList.toggle('fa-angle-down');
    document.getElementById('citizensChartSort').classList.toggle('not_visible');
    
});


document.getElementById('citizensChartAccept').addEventListener('click',(event) =>{
    document.getElementById('citizensAngle').classList.toggle('fa-angle-up');
    document.getElementById('citizensAngle').classList.toggle('fa-angle-down');
    document.getElementById('citizensChartSort').classList.toggle('not_visible');
    if(citizensCategoryChoice[0].checked || (!citizensCategoryChoice[0].checked && !citizensCategoryChoice[1].checked)){
        chartCitizens.setOption(defineOption(graphTitles[1], colors, filterArray(defineTimeSpan(citizensTimeChoice),citizensDataArray), citizensCategoryChoice, categoryNames[1], seriesOptions[1] ));
    } else if (citizensCategoryChoice[1].checked) {
        chartCitizens.setOption(defineOption(graphTitles[1], colors, filterArray(defineTimeSpan(citizensTimeChoice),citizensDataArrayAnswered), citizensCategoryChoice, categoryNames[1], seriesOptions[1] ));
    }
});

// button cancel
document.getElementById("citizensChartCancel").addEventListener('click', (event)=>  {
    document.getElementById('citizensAngle').classList.toggle('fa-angle-up');
    document.getElementById('citizensAngle').classList.toggle('fa-angle-down');
    document.getElementById('citizensChartSort').classList.toggle('not_visible');
    chartCitizens.setOption(defineOption(graphTitles[1],colors, citizensDataArray, citizensCategoryChoice, categoryNames[1], seriesOptions[1]));
});