<template>
  <div class="tab-content">
    <KpiRow :items="userKpis" />
    <div class="cards-grid">
      <ChartCard title="User Growth Trend" :option="userGrowth" />
      <ChartCard title="User Demographics (Age)" :option="userAge" />
    </div>
    <ChartCard title="Cross-Category Purchase Rate" :option="crossPurchase" />
    <div class="card">
      <div class="card-title">Community Health Metrics</div>
      <table class="mini-table">
        <tr><th>Metric</th><th class="num">Value</th><th>Status</th></tr>
        <tr><td>NPS Score</td><td class="num">72</td><td><span class="badge green">Excellent</span></td></tr>
        <tr><td>Monthly Active Posts</td><td class="num">34.2K</td><td><span class="badge green">+28%</span></td></tr>
        <tr><td>Investor Repurchase Rate</td><td class="num">68%</td><td><span class="badge green">High</span></td></tr>
        <tr><td>Referral Conversion</td><td class="num">12.3%</td><td><span class="badge blue">Good</span></td></tr>
        <tr><td>Upgrade Rate (Phone)</td><td class="num">31%</td><td><span class="badge blue">Good</span></td></tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import KpiRow from '../KpiRow.vue'
import ChartCard from '../ChartCard.vue'
import { useChartConfig } from '../../composables/useChartConfig'
import { userKpis, MONTHS } from '../../data/mockData'

const { baseOpt, colors } = useChartConfig()

const userGrowth = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:MONTHS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>(v/1e6).toFixed(1)+'M'}},
    legend:{top:0,textStyle:{color:t.text,fontSize:10}},
    series:[{name:'Active Users',type:'line',smooth:true,data:[2.8e6,3.0e6,3.3e6,3.6e6,3.9e6,4.2e6],lineStyle:{color:t.primary,width:2},itemStyle:{color:t.primary},
      areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:t.areaStart},{offset:1,color:t.areaEnd}])}},
      {name:'Community',type:'line',smooth:true,data:[5.8e5,6.2e5,6.8e5,7.5e5,8.2e5,8.9e5],lineStyle:{color:t.secondary,width:2},itemStyle:{color:t.secondary}}]}
}

const userAge = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','45%'],label:{formatter:'{b}\n{d}%',color:t.text,fontSize:10},
      data:[{value:8,name:'<18',itemStyle:{color:t.yellow}},{value:35,name:'18-24',itemStyle:{color:t.primary}},
        {value:32,name:'25-34',itemStyle:{color:t.secondary}},{value:16,name:'35-44',itemStyle:{color:t.green}},
        {value:9,name:'45+',itemStyle:{color:t.purple}}]}]}
}

const crossPurchase = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'value',max:100,axisLine:{lineStyle:{color:t.grid}},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>v+'%'}},
    yAxis:{type:'category',data:['Phone+Watch','Phone+Ear+Watch','Phone+Ear','Ear Only','Phone Only'],axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,fontSize:10}},
    series:[{type:'bar',data:[{value:8,itemStyle:{color:t.purple}},{value:12,itemStyle:{color:t.cyan}},{value:28,itemStyle:{color:t.secondary}},
      {value:22,itemStyle:{color:t.green}},{value:30,itemStyle:{color:t.primary}}],
      barWidth:16,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',color:t.text,fontSize:10,formatter:v=>v.value+'%'}}]}
}
</script>
