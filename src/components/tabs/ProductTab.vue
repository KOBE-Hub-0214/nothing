<template>
  <div class="tab-content">
    <KpiRow :items="productKpis" />
    <div class="cards-grid">
      <ChartCard title="Nothing OS Version Distribution" :option="osDistribution" />
      <ChartCard title="AI Feature Adoption" :option="aiAdoption" />
    </div>
    <ChartCard title="Nothing X App Usage (DAU)" :option="appUsage" />
    <div class="card">
      <div class="card-title">Product Quality Metrics</div>
      <table class="mini-table">
        <tr><th>Metric</th><th class="num">Value</th><th>Status</th></tr>
        <tr><td>OTA Update Success Rate</td><td class="num">99.2%</td><td><span class="badge green">Excellent</span></td></tr>
        <tr><td>Crash-Free Sessions</td><td class="num">99.6%</td><td><span class="badge green">Excellent</span></td></tr>
        <tr><td>Avg App Store Rating</td><td class="num">4.3</td><td><span class="badge green">Good</span></td></tr>
        <tr><td>Return Rate (Phone)</td><td class="num">2.1%</td><td><span class="badge green">Low</span></td></tr>
        <tr><td>Support Tickets / 1K Users</td><td class="num">12.4</td><td><span class="badge blue">Normal</span></td></tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import KpiRow from '../KpiRow.vue'
import ChartCard from '../ChartCard.vue'
import { useChartConfig } from '../../composables/useChartConfig'
import { productKpis, MONTHS } from '../../data/mockData'

const { baseOpt, colors } = useChartConfig()

const osDistribution = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','45%'],
      label:{formatter:'{b}\n{d}%',color:t.text,fontSize:10},
      data:[{value:74,name:'Nothing OS 3.0',itemStyle:{color:t.primary}},
        {value:18,name:'Nothing OS 2.6',itemStyle:{color:t.secondary}},
        {value:5,name:'Nothing OS 2.5',itemStyle:{color:t.orange}},
        {value:3,name:'Older',itemStyle:{color:t.purple}}]}]}
}

const aiAdoption = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'value',max:100,axisLine:{lineStyle:{color:t.grid}},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>v+'%'}},
    yAxis:{type:'category',data:['Rock Paper Scissors','News Digest','Smart Drawer','Photo Enhance','ChatGPT Widget'],axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,fontSize:10}},
    series:[{type:'bar',data:[{value:8,itemStyle:{color:t.cyan}},{value:14,itemStyle:{color:t.purple}},{value:19,itemStyle:{color:t.orange}},
      {value:21,itemStyle:{color:t.green}},{value:23,itemStyle:{color:t.primary}}],
      barWidth:14,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',color:t.text,fontSize:10,formatter:v=>v.value+'%'}}]}
}

const appUsage = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:MONTHS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>(v/1e6).toFixed(1)+'M'}},
    legend:{top:0,textStyle:{color:t.text,fontSize:10}},
    series:[{name:'Nothing X',type:'line',smooth:true,data:[1.1e6,1.2e6,1.35e6,1.5e6,1.65e6,1.8e6],lineStyle:{color:t.primary,width:2},itemStyle:{color:t.primary},
      areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:t.areaStart},{offset:1,color:t.areaEnd}])}},
      {name:'Glyph Composer',type:'line',smooth:true,data:[3.2e5,3.8e5,4.5e5,5.1e5,5.6e5,6.2e5],lineStyle:{color:t.secondary,width:2},itemStyle:{color:t.secondary}},
      {name:'Nothing Gallery',type:'line',smooth:true,data:[6.8e5,7.5e5,8.2e5,9.0e5,9.8e5,1.05e6],lineStyle:{color:t.green,width:2},itemStyle:{color:t.green}}]}
}
</script>
