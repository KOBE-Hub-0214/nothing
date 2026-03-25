<template>
  <div class="tab-content">
    <KpiRow :items="regionKpis" />
    <div class="cards-grid">
      <ChartCard title="Revenue by Region" :option="regionRevenue" />
      <ChartCard title="Regional Growth Rate (YoY)" :option="regionGrowth" />
    </div>
    <ChartCard title="India Offline Expansion" :option="indiaOffline" />
    <div class="card">
      <div class="card-title">Top Markets by Revenue</div>
      <table class="mini-table">
        <tr><th>Market</th><th class="num">Revenue</th><th class="num">Growth</th><th>Trend</th></tr>
        <tr><td>India</td><td class="num">$49.7M</td><td class="num"><span class="badge green">+146%</span></td><td>Hot</td></tr>
        <tr><td>UK</td><td class="num">$18.2M</td><td class="num"><span class="badge green">+22%</span></td><td>Stable</td></tr>
        <tr><td>Germany</td><td class="num">$10.1M</td><td class="num"><span class="badge green">+15%</span></td><td>Stable</td></tr>
        <tr><td>US</td><td class="num">$28.4M</td><td class="num"><span class="badge green">+52%</span></td><td>Growing</td></tr>
        <tr><td>Japan</td><td class="num">$12.8M</td><td class="num"><span class="badge green">+38%</span></td><td>Growing</td></tr>
        <tr><td>Malaysia</td><td class="num">$5.2M</td><td class="num"><span class="badge green">+65%</span></td><td>Hot</td></tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import KpiRow from '../KpiRow.vue'
import ChartCard from '../ChartCard.vue'
import { useChartConfig } from '../../composables/useChartConfig'
import { regionKpis, QUARTERS } from '../../data/mockData'

const { baseOpt, colors } = useChartConfig()

const regionRevenue = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','45%'],
      label:{formatter:'{b}\n${c}M',color:t.text,fontSize:10},
      data:[{value:49.7,name:'India',itemStyle:{color:t.orange}},
        {value:42.6,name:'Europe',itemStyle:{color:t.secondary}},
        {value:28.4,name:'North America',itemStyle:{color:t.primary}},
        {value:12.8,name:'Japan/Korea',itemStyle:{color:t.purple}},
        {value:8.5,name:'SEA',itemStyle:{color:t.green}},
        {value:5.2,name:'Middle East',itemStyle:{color:t.cyan}}]}]}
}
const regionGrowth = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'value',axisLine:{lineStyle:{color:t.grid}},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>v+'%'}},
    yAxis:{type:'category',data:['Middle East','Europe','Japan','US','SEA','India'],axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    series:[{type:'bar',data:[{value:25,itemStyle:{color:t.cyan}},{value:18,itemStyle:{color:t.secondary}},{value:38,itemStyle:{color:t.purple}},
      {value:52,itemStyle:{color:t.primary}},{value:65,itemStyle:{color:t.green}},{value:146,itemStyle:{color:t.orange}}],
      barWidth:16,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',color:t.text,fontSize:10,formatter:v=>v.value+'%'}}]}
}

const indiaOffline = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:QUARTERS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:[{type:'value',name:'Touchpoints',nameTextStyle:{color:t.text,fontSize:10},axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
      {type:'value',name:'Revenue %',nameTextStyle:{color:t.text,fontSize:10},axisLine:{show:false},splitLine:{show:false},axisLabel:{color:t.text,formatter:v=>v+'%'}}],
    legend:{top:0,textStyle:{color:t.text,fontSize:10}},
    series:[{name:'Touchpoints',type:'bar',data:[1200,2100,3200,4100,4800],itemStyle:{color:t.orange,borderRadius:[4,4,0,0]},barWidth:20},
      {name:'Offline Rev %',type:'line',yAxisIndex:1,data:[18,24,32,41,46],lineStyle:{color:t.primary,width:2},itemStyle:{color:t.primary},symbol:'circle',symbolSize:6}]}
}
</script>
