<template>
  <div class="tab-content">
    <KpiRow :items="marketingKpis" />
    <div class="cards-grid">
      <ChartCard title="Traffic Sources Breakdown" :option="trafficSource" />
      <ChartCard title="Web Traffic Trend" :option="trafficTrend" />
    </div>
    <div class="cards-grid">
      <ChartCard title="Conversion Funnel" :option="funnel" tall />
      <ChartCard title="Launch Impact on Traffic" :option="launchImpact" tall />
    </div>
  </div>
</template>

<script setup>
import KpiRow from '../KpiRow.vue'
import ChartCard from '../ChartCard.vue'
import { useChartConfig } from '../../composables/useChartConfig'
import { useTheme } from '../../composables/useTheme'
import { marketingKpis, MONTHS } from '../../data/mockData'

const { baseOpt, colors } = useChartConfig()
const { isDark } = useTheme()

const trafficSource = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},legend:{bottom:0,textStyle:{color:t.text,fontSize:10},itemWidth:10,itemHeight:10},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','42%'],label:{show:false},
      data:[{value:76.3,name:'Organic Search',itemStyle:{color:t.primary}},{value:17.9,name:'Direct',itemStyle:{color:t.secondary}},
        {value:3.1,name:'Paid Search',itemStyle:{color:t.orange}},{value:1.6,name:'Social',itemStyle:{color:t.pink}},
        {value:1.1,name:'Referral',itemStyle:{color:t.green}}]}]}
}

const trafficTrend = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:MONTHS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>(v/1e6).toFixed(1)+'M'}},
    series:[{data:[3.3e6,4.1e6,5.2e6,6.8e6,7.1e6,7.4e6],type:'bar',itemStyle:{color:t.primary,borderRadius:[4,4,0,0]},barWidth:24,
      markPoint:{data:[{name:'3a Launch',coord:[2,5.2e6],symbol:'pin',symbolSize:36,itemStyle:{color:t.orange},label:{show:true,formatter:'3a\nLaunch',fontSize:8,color:'#fff'}}]}}]}
}
const funnel = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item',formatter:p=>p.name+': '+p.value.toLocaleString()},
    series:[{type:'funnel',left:'10%',width:'80%',top:20,bottom:20,min:0,max:100,gap:3,
      label:{position:'inside',color:isDark.value?'#000':'#fff',fontSize:11,formatter:p=>p.name+'\n'+p.value.toLocaleString()},
      data:[{value:7400000,name:'Visits',itemStyle:{color:t.primary}},{value:2960000,name:'Product Views',itemStyle:{color:t.funnelLight}},
        {value:592000,name:'Add to Cart',itemStyle:{color:t.secondary}},{value:266400,name:'Checkout',itemStyle:{color:t.green}},
        {value:236800,name:'Purchase',itemStyle:{color:t.orange}}]}]}
}

const launchImpact = () => {
  const t = colors()
  const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8']
  return { ...baseOpt(), xAxis:{type:'category',data:weeks,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>(v/1e3)+'K'}},
    legend:{top:0,textStyle:{color:t.text,fontSize:10}},
    series:[{name:'Traffic',type:'line',smooth:true,data:[180e3,210e3,520e3,680e3,450e3,320e3,280e3,260e3],lineStyle:{color:t.primary,width:2},itemStyle:{color:t.primary}},
      {name:'Orders',type:'line',smooth:true,data:[8e3,12e3,38e3,52e3,28e3,18e3,14e3,12e3],lineStyle:{color:t.green,width:2},itemStyle:{color:t.green}}],
    markLine:{data:[{xAxis:2,label:{formatter:'Launch',color:t.text,fontSize:10},lineStyle:{color:t.orange,type:'dashed'}}]}}
}
</script>
