export const PieChartSettings = {
  chart: {
    type: 'pie',
    backgroundColor: '#FDFDF6',
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
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        style: {
          fontSize: '13.5px',
          with: '20%',
          heigth: '20%',
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
