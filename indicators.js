const indicatorsChart = echarts.init(document.getElementById('indicatorsChart'));

function createIndData() {
    let dataArray = [];
    let categoriesValue = ['0-9', '10-19','20-29','30-39','40-49','50-59','60-69','70-79','80-89','90+'];
  
    for(let index = 0; index <categoriesValue.length; index++) {
        let dataRow=[];
        let man = Math.random() * 10;
        let woman = -(Math.random() * 10);
        dataRow.push(categoriesValue[index],man, woman);
        dataArray.push(dataRow);
    }
    return dataArray;
}

function defineIndicatorsOption (dataArray){
    let optionIndicators = {
        title: [{
            left:75,
            top:35,
            textAlign:'right',
            text:'קבוצת גיל',
            textStyle:{ fontStyle: 'normal',
                        fontFamily:'Open Sans',
                        fontWeight:'normal',
                        fontSize:15
                        },
        }],
        color: ["#50cbfd", "#b6ca51",],
        tooltip: {
            trigger: 'axis',
            valueFormatter: ((val)=> {
                return (    Math.abs(parseFloat(val).toFixed(1)) + "%" +" ("+ (parseInt(Math.random()*1000)) + ")");
            })
        },
        grid: {
            left: '8%',
            right: '4%',
            bottom: '5%',
            containLabel: true,
        },
        legend: {show:false},
        xAxis: [
            {
                type: 'value',
                name: '% סה"כ',
                nameLocation: 'center',
                nameTextStyle: {
                    fontStyle: 'normal',
                    fontFamily:'Open Sans',
                    fontWeight:'normal',
                    verticalAlign:'top',
                    padding:[5, 0, 0, 0],
                    fontSize:15,
                },
                splitLine: {
                    lineStyle: {
                        color: '#ededed'
                    }
                },
                min: -30,
                max: 30,
                axisLabel: {
                    formatter: ((val)=>{
                        return Math.abs(parseFloat(val))
                    }),
                },
            }
        ],
        yAxis: [
            {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ededed'
                    }
                },
                axisTick: {
                    show: false
                },
                // nameGap: 5,
                data:dataArray.map((line) => line[0])
            }
        ],
        series: [
            {
                name: 'גברים',
                type: 'bar',
                barWidth: '40%',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'right',
                    formatter: ((val)=>{
                        return ((Math.abs(parseFloat(val.value).toFixed(1)))+ "%")
                    }),
                },
                data:dataArray.map((line) => line[1])
            },
            {
                name: 'נשים',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'left',
                    formatter: ((val)=>{
                        return ((Math.abs(parseFloat(val.value).toFixed(1)))+"%")
                    }),
                    
                },
                data:dataArray.map((line) => line[2])
            }
        ]
    };
    return optionIndicators;
}
const showChart = indicatorsChart.setOption(defineIndicatorsOption(createIndData()));
showChart;


//opening menu and filtering
document.getElementById('indicatorsMenu').addEventListener('click', (event)=> {
    document.getElementById('indicatorsAngle').classList.toggle('fa-angle-up');
    document.getElementById('indicatorsAngle').classList.toggle('fa-angle-down');
    document.getElementById('indicatorsChartSort').classList.toggle('not_visible');
});
//buttons accept and cancel
document.getElementById('indicatorsChartAccept').addEventListener('click',(event) =>{
    document.getElementById('indicatorsAngle').classList.toggle('fa-angle-up');
    document.getElementById('indicatorsAngle').classList.toggle('fa-angle-down');
    document.getElementById('indicatorsChartSort').classList.toggle('not_visible');
    indicatorsChart.setOption(defineIndicatorsOption(createIndData()));});

document.getElementById('indicatorsChartCancel').addEventListener('click',(event) =>{
    document.getElementById('indicatorsAngle').classList.toggle('fa-angle-up');
    document.getElementById('indicatorsAngle').classList.toggle('fa-angle-down');
    document.getElementById('indicatorsChartSort').classList.toggle('not_visible');
    showChart;
});
