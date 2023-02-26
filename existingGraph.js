const existingSickChart = echarts.init(document.getElementById('existingChart'));
const titleExistingGraph = ['שיעור\nחולים\nפעילים','מספר\nחולים\nפעילים' ,'מספר\nחולים\nקשה' ,'שיעור\nחולים\nקשה'];
const existingSickChoice = [document.getElementById('existingSick'),document.getElementById('existingHardSick')];
const existingSickDataView = [document.getElementById('existingAbsoluteNumber'),document.getElementById('existingRelativeNumber')];

function defineExistingSickOption (title/*var of title */,colors,dataArray) {
    let optionExistingSick= {
        title: [{
            left:60,
            textAlign:'right',
            text:title,
            textStyle:{ fontStyle: 'normal',
                        fontFamily:'Open Sans',
                        fontWeight:'normal',
                        fontSize:15
                        },
        }],
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: 'קבוצת גיל',
            nameLocation: 'center',
            nameTextStyle: {
                fontStyle: 'normal',
                        fontFamily:'Open Sans',
                        fontWeight:'normal',
                        verticalAlign:'top',
                        padding:[15, 0, 0, 0],
                        fontSize:15,
            },
            axisLabel: {
                rotate: 45
            },
            boundaryGap: true,
            data: dataArray.map((line)=>line[0])
            //['5-11', '12-15', '16-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'לא מחוסנים',
                type: 'bar',
                data: dataArray.map((line)=>line[1])
            },
            {
                name: 'מחוסנים ללא תוקף',
                type: 'bar',
                data: dataArray.map((line)=>line[2])
            },
            {
                name: 'מחוסנים',
                type: 'bar',
                data: dataArray.map((line)=>line[3])
            }
        ]
    }
    return optionExistingSick;
}

existingSickChart.setOption(defineExistingSickOption(titleExistingGraph[0],colors,existingSickRelativeDataArray));
//opening menu and filtering
document.getElementById('existingSickMenu').addEventListener('click', (event)=> {
    document.getElementById('existingAngle').classList.toggle('fa-angle-up');
    document.getElementById('existingAngle').classList.toggle('fa-angle-down');
    document.getElementById('existingChartSort').classList.toggle('not_visible');
    existingSickChoice[0].checked = true;
    existingSickDataView[1].checked = true;
});

document.getElementById('existingChartAccept').addEventListener('click',(event) =>{
    document.getElementById('existingAngle').classList.toggle('fa-angle-up');
    document.getElementById('existingAngle').classList.toggle('fa-angle-down');
    document.getElementById('existingChartSort').classList.toggle('not_visible');
    if(existingSickChoice[0].checked && existingSickDataView[1].checked ){
        existingSickChart.setOption(defineExistingSickOption(titleExistingGraph[0],colors,existingSickRelativeDataArray));
    }
    if(existingSickChoice[0].checked && existingSickDataView[0].checked) {
        existingSickChart.setOption(defineExistingSickOption(titleExistingGraph[1],colors,existingSickAbsoluteDataArray));
    }
    if(existingSickChoice[1].checked && existingSickDataView[0].checked) {
        existingSickChart.setOption(defineExistingSickOption(titleExistingGraph[2],colors,existingHardSickAbsoluteDataArray));
    }
    if(existingSickChoice[1].checked && existingSickDataView[1].checked) {
        existingSickChart.setOption(defineExistingSickOption(titleExistingGraph[3],colors,existingHardSickRelativeDataArray));
    }
    
});

document.getElementById('existingChartCancel').addEventListener('click',(event) =>{
    document.getElementById('existingAngle').classList.toggle('fa-angle-up');
    document.getElementById('existingAngle').classList.toggle('fa-angle-down');
    document.getElementById('existingChartSort').classList.toggle('not_visible');
    existingSickChoice[0].checked = true;
    existingSickDataView[1].checked = true;
    existingSickChart.setOption(defineExistingSickOption(titleExistingGraph[0],colors,existingSickRelativeDataArray));
});