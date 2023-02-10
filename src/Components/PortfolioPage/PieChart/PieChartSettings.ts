const countSize = () => {
  console.log(window.innerWidth);
  return window.innerWidth < 500 ? 20 : (500 / (window.innerWidth / 100)).toFixed();
};

export const PieChartSettings = {
  chart: {
    type: 'pie',
    backgroundColor: '#FDFDF6',
    height: '80%',
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size: `${countSize()}%`,
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          fontSize: '12px',
        },
      },
    },
  },
  series: [
    {
      name: 'PieChart',
      colorByPoint: true,
      data: null,
    },
  ],
};
