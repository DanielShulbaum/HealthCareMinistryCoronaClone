const deadChart = echarts.init(document.getElementById('deadChart'));
const colorsDead = ["#237d7d","#ff7d67"];

deadTimeChoice[4].checked = true;
deadChart.setOption(defineOption(graphTitles[2], colorsDead, filterArray(defineTimeSpan(deadTimeChoice),deadDataArray), deadCategoryChoice, categoryNames[2], seriesOptions[2] ));

//opening menu and filtering
document.getElementById('deadMenu').addEventListener('click', (event)=> {
    document.getElementById('deadAngle').classList.toggle('fa-angle-up');
    document.getElementById('deadAngle').classList.toggle('fa-angle-down');
    document.getElementById('deadChartSort').classList.toggle('not_visible');
});

//buttons accept 
document.getElementById("deadChartAccept").addEventListener('click', (event)=>  {
    document.getElementById('deadAngle').classList.toggle('fa-angle-up');
    document.getElementById('deadAngle').classList.toggle('fa-angle-down');
    document.getElementById('deadChartSort').classList.toggle('not_visible');
    deadChart.clear();
    deadChart.setOption(defineOption(graphTitles[2], colorsDead, filterArray(defineTimeSpan(deadTimeChoice),deadDataArray), deadCategoryChoice, categoryNames[2], seriesOptions[2] ));

});

// button cancel
document.getElementById("deadChartCancel").addEventListener('click', (event)=>  {
    document.getElementById('deadAngle').classList.toggle('fa-angle-up');
    document.getElementById('deadAngle').classList.toggle('fa-angle-down');
    document.getElementById('deadChartSort').classList.toggle('not_visible');
    deadTimeChoice[4].checked = true;
deadChart.setOption(defineOption(graphTitles[2], colorsDead, filterArray(defineTimeSpan(deadTimeChoice),deadDataArray), deadCategoryChoice, categoryNames[2], seriesOptions[2] ));
});