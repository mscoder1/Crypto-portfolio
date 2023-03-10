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
      size: '75%',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          fontSize: '10px',
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
