<template>
  <div class="tab-content">
    <KpiRow :items="supplyKpis" />
    <div class="cards-grid">
      <ChartCard title="Manufacturing Split (India vs China)" :option="mfgSplit" />
      <ChartCard title="Supplier Concentration" :option="supplier" />
    </div>
    <ChartCard title="Inventory Turnover by Category" :option="inventory" />
    <div class="card">
      <div class="card-title">Key Supplier Dependencies</div>
      <table class="mini-table">
        <tr><th>Supplier</th><th>Component</th><th class="num">Share</th><th>Risk</th></tr>
        <tr><td>Qualcomm</td><td>SoC (Flagship)</td><td class="num">100%</td><td><span class="badge red">High</span></td></tr>
        <tr><td>MediaTek</td><td>SoC (Mid/Entry)</td><td class="num">100%</td><td><span class="badge red">High</span></td></tr>
        <tr><td>Sony</td><td>Camera Sensors</td><td class="num">85%</td><td><span class="badge red">High</span></td></tr>
        <tr><td>Samsung SDI</td><td>Battery Cells</td><td class="num">60%</td><td><span class="badge blue">Medium</span></td></tr>
        <tr><td>BOE</td><td>OLED Panels</td><td class="num">70%</td><td><span class="badge blue">Medium</span></td></tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import KpiRow from '../KpiRow.vue'
import ChartCard from '../ChartCard.vue'
import { useChartConfig } from '../../composables/useChartConfig'
import { supplyKpis, QUARTERS } from '../../data/mockData'

const { baseOpt, colors } = useChartConfig()

const mfgSplit = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:QUARTERS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',max:100,axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>v+'%'}},
    legend:{top:0,textStyle:{color:t.text,fontSize:10}},
    series:[{name:'India',type:'bar',stack:'t',data:[38,42,48,54,58],itemStyle:{color:t.orange},barWidth:24},
      {name:'China',type:'bar',stack:'t',data:[62,58,52,46,42],itemStyle:{color:t.secondary},barWidth:24}]}
}

const inventory = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'value',axisLine:{lineStyle:{color:t.grid}},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>v+'d'}},
    yAxis:{type:'category',data:['Accessories','Wearables','Audio (CMF)','Audio (Nothing)','Phones (CMF)','Phones (Nothing)'],axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,fontSize:10}},
    series:[{type:'bar',data:[{value:22,itemStyle:{color:t.cyan}},{value:35,itemStyle:{color:t.purple}},{value:28,itemStyle:{color:t.orange}},
      {value:38,itemStyle:{color:t.green}},{value:45,itemStyle:{color:t.secondary}},{value:52,itemStyle:{color:t.primary}}],
      barWidth:14,itemStyle:{borderRadius:[0,4,4,0]},label:{show:true,position:'right',color:t.text,fontSize:10,formatter:v=>v.value+'d'}}]}
}
const supplier = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','45%'],label:{formatter:'{b}\n{d}%',color:t.text,fontSize:10},
      data:[{value:30,name:'Qualcomm',itemStyle:{color:t.primary}},{value:25,name:'MediaTek',itemStyle:{color:t.secondary}},
        {value:18,name:'Sony',itemStyle:{color:t.orange}},{value:12,name:'Samsung SDI',itemStyle:{color:t.green}},
        {value:10,name:'BOE',itemStyle:{color:t.purple}},{value:5,name:'Others',itemStyle:{color:t.cyan}}]}]}
}
</script>
