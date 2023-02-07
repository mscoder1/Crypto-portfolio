import { IFullCoinInfo } from '../../../Models/IFullCoinInfo';

interface ChartsProps {
  coin: IFullCoinInfo;
}

interface IChartData {
  prices: number[];
  market_caps: number[];
}

export const defaultLineChartSettings = (
  props: ChartsProps,
  isMrktCap: boolean,
  chartData: IChartData,
) => {
  return {
    chart: {
      backgroundColor: '#FDFDF6',
    },
    title: {
      text: `${props.coin?.name} ${isMrktCap ? 'Market Cap' : 'Price'}`,
      dateFormat: '%Y-%m-%d %H:%M:%S',
      color: 'white',
      style: {
        color: 'black',
      },
    },
    xAxis: {
      labels: {
        style: {
          color: 'black',
        },
      },
      style: {
        color: 'black',
      },
    },
    yAxis: {
      labels: {
        style: {
          color: 'black',
        },
      },
      style: {
        color: 'black',
      },
    },
    series: [
      {
        name: 'Price $',
        data: chartData.prices,
      },
    ],
    legend: {
      itemStyle: {
        color: 'black',
      },
    },
  };
};
