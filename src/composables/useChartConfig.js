import { useTheme } from './useTheme'

export function useChartConfig() {
  const { colors } = useTheme()

  function baseOpt() {
    const t = colors()
    return {
      backgroundColor: 'transparent',
      textStyle: { color: t.text, fontSize: 11 },
      grid: { left: 40, right: 16, top: 30, bottom: 28, containLabel: false },
      tooltip: { trigger: 'axis', backgroundColor: t.tooltipBg, borderColor: t.tooltipBorder, textStyle: { color: t.tooltipText, fontSize: 12 } }
    }
  }

  return { baseOpt, colors }
}
