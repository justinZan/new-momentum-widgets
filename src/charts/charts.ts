import { ChartContainer, ChartData, ChartOptions, ChartType } from '../types';
import { Chart } from './.internal';
import { AreaChart } from './area';
import { BarChart } from './bar';
import { ColumnChart } from './column';
import { DonutChart } from './donut';
import { GaugeChart } from './gauge';
import { LineChart } from './line';
import { PieChart } from './pie';
import { RangeChart } from './range';

export const SUPPORTED_CHARTS = new Map<ChartType, typeof Chart<ChartData, ChartOptions>>([
  [ChartType.Bar, BarChart],
  [ChartType.Column, ColumnChart],
  [ChartType.Line, LineChart],
  [ChartType.Area, AreaChart],
  [ChartType.Range, RangeChart],
  [ChartType.Pie, PieChart],
  [ChartType.Donut, DonutChart],
  [ChartType.Gauge, GaugeChart],
]);

export function createChart(
  chartContainer: ChartContainer,
  chartType: ChartType,
  chartData: ChartData,
  chartOptions?: ChartOptions,
): Chart<ChartData, ChartOptions> {
  // eslint-disable-next-line
  const ctor = SUPPORTED_CHARTS.get(chartType) as any;

  if (ctor) {
    return new ctor(chartContainer, chartData, chartOptions);
  }

  throw new Error(`Invalid chart type ${chartType}.`);
}
