<template>
  <div class="tab-content">
    <KpiRow :items="salesKpis" />
    <div class="cards-grid">
      <ChartCard title="Monthly Revenue Trend" :option="revenueTrend" />
      <ChartCard title="Revenue by Product Line" :option="revenueProduct" />
      <ChartCard title="Nothing vs CMF Revenue Split" :option="brandSplit" />
      <ChartCard title="Revenue by Channel" :option="channelRevenue" />
    </div>
    <div class="card">
      <div class="card-title">Top SKUs by Revenue</div>
      <table class="mini-table">
        <tr><th>Product</th><th class="num">Units</th><th class="num">Revenue</th><th class="num">ASP</th></tr>
        <tr><td>Phone (3)</td><td class="num">98K</td><td class="num">$78.3M</td><td class="num">$799</td></tr>
        <tr><td>Phone (4a) Pro</td><td class="num">62K</td><td class="num">$33.5M</td><td class="num">$541</td></tr>
        <tr><td>Phone (2a) Plus</td><td class="num">85K</td><td class="num">$33.9M</td><td class="num">$399</td></tr>
        <tr><td>Ear (3)</td><td class="num">210K</td><td class="num">$37.6M</td><td class="num">$179</td></tr>
        <tr><td>CMF Phone 2 Pro</td><td class="num">320K</td><td class="num">$70.4M</td><td class="num">$220</td></tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import KpiRow from '../KpiRow.vue'
import ChartCard from '../ChartCard.vue'
import { useChartConfig } from '../../composables/useChartConfig'
import { salesKpis, MONTHS } from '../../data/mockData'

const { baseOpt, colors } = useChartConfig()

const revenueTrend = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:MONTHS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>'$'+v+'M'}},
    series:[{data:[18,20,24,26,28,26],type:'line',smooth:true,lineStyle:{color:t.primary,width:2},
      areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:t.areaStart},{offset:1,color:t.areaEnd}])},
      itemStyle:{color:t.primary},symbol:'circle',symbolSize:6}]}
}

const revenueProduct = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},legend:{bottom:0,textStyle:{color:t.text,fontSize:10},itemWidth:10,itemHeight:10},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','45%'],label:{show:false},
      data:[{value:78.3,name:'Phones (Nothing)',itemStyle:{color:t.primary}},{value:70.4,name:'Phones (CMF)',itemStyle:{color:t.secondary}},
        {value:37.6,name:'Audio (Nothing)',itemStyle:{color:t.green}},{value:15.2,name:'Audio (CMF)',itemStyle:{color:t.orange}},
        {value:8.5,name:'Wearables',itemStyle:{color:t.purple}},{value:4.2,name:'Accessories',itemStyle:{color:t.cyan}}]}]}
}

const brandSplit = () => {
  const t = colors()
  return { ...baseOpt(), xAxis:{type:'category',data:MONTHS,axisLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text}},
    yAxis:{type:'value',axisLine:{show:false},splitLine:{lineStyle:{color:t.grid}},axisLabel:{color:t.text,formatter:v=>'$'+v+'M'}},
    legend:{top:0,textStyle:{color:t.text,fontSize:10}},
    series:[{name:'Nothing',type:'bar',stack:'total',data:[10,12,14,15,16,15],itemStyle:{color:t.primary,borderRadius:[4,4,0,0]}},
      {name:'CMF',type:'bar',stack:'total',data:[8,8,10,11,12,11],itemStyle:{color:t.secondary,borderRadius:[4,4,0,0]}}]}
}

const channelRevenue = () => {
  const t = colors()
  return { ...baseOpt(), tooltip:{trigger:'item'},
    series:[{type:'pie',radius:['40%','70%'],center:['50%','45%'],label:{formatter:'{b}\n{d}%',color:t.text,fontSize:10},
      data:[{value:35,name:'DTC (nothing.tech)',itemStyle:{color:t.primary}},{value:28,name:'Amazon',itemStyle:{color:t.orange}},
        {value:22,name:'Flipkart',itemStyle:{color:t.secondary}},{value:15,name:'Offline Retail',itemStyle:{color:t.green}}]}]}
}
</script>
