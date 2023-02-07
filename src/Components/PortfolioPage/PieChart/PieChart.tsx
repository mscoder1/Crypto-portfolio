import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { memo, useEffect } from 'react';
import { IFullCoinInfo } from '../../../Models/IFullCoinInfo';
import { PieChartSettings } from './PieChartSettings';

interface PieChartProps {
  coins: IFullCoinInfo[];
  balance: number;
}

const PieChart = memo((data: PieChartProps) => {
  const getPieData = () => {
    return data.coins?.map((element) => {
      return {
        name: element.name,
        y: Number(
          element.quantity
            && (
              (element.quantity * element.current_price)
              / (data.balance / 100)
            ).toFixed(2),
        ),
        sliced: true,
      };
    });
  };

  const options = {
    ...PieChartSettings,
    series: [
      {
        name: 'PieChart',
        colorByPoint: true,
        data: getPieData(),
      },
    ],
  };

  useEffect(() => {
    getPieData();
  }, [data]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { height: '100%', width: '530px' } }}
      />
    </div>
  );
});

export default PieChart;
