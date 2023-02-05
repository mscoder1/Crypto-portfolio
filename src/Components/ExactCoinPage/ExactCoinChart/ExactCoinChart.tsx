import { useState, useEffect, memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { IFullCoinInfo } from "../../../Models/IFullCoinInfo";
import { coinAPI } from "../../../Services/CoinsService";
import styles from "./Charts.module.css";
import { defaultLineChartSettings } from "../ExactChartSettings/ExactChartSettings";

interface chartsProps {
  coin: IFullCoinInfo;
}

const Charts = memo((props: chartsProps) => {
  const [isMrktCap, setIsMrktCap] = useState(false);
  const [chartParams, setChartParams] = useState({
    id: `${props.coin?.id}`,
    time: "1",
    currency: "usd",
  });

  const { data: chartData = {}, isFetching } = coinAPI.useFetchExactCoinChartQuery(chartParams);

  const setTime = (time: string) => {
    setChartParams((chartParams) => ({ ...chartParams, time: time }));
  };

  const [chartOption, setChartOptions] = useState(
    defaultLineChartSettings(props, isMrktCap, chartData)
  );
  useEffect(() => {
    setChartOptions((chartOption) => ({
      ...chartOption,
      title: {
        text: `${props.coin?.name} ${isMrktCap ? "Market Cap" : "Price"}`,
        dateFormat: "%Y-%m-%d %H:%M:%S",
        color: "white",
        style: {
          color: "black",
        },
      },
      series: [
        {
          color: isMrktCap ? "#410002" : "#171E0E",
          name: isMrktCap ? "Market Cap" : "Price",
          data: isMrktCap ? chartData.market_caps : chartData.prices,
        },
      ],
    }));
  }, [chartData, isMrktCap]);

  const buttonTimeSettings: string[] = [
    "1",
    "7",
    "14",
    "30",
    "90",
    "180",
    "365",
    "max",
  ];

  return (
    <div className={styles.chartMainWrap}>
      <div className={styles.chartButtonBlock}>
        <div className={styles.lBlock}>
          <button
            className={
              isMrktCap
                ? styles.chartButtonLeftNotActive
                : styles.chartButtonLeft
            }
            onClick={() => setIsMrktCap(false)}
          >
            Price
          </button>
          <button
            className={
              isMrktCap
                ? styles.chartButtonLeft
                : styles.chartButtonLeftNotActive
            }
            onClick={() => setIsMrktCap(true)}
          >
            Market Cap
          </button>
        </div>
        <div className={styles.rBlock}>
          {buttonTimeSettings.map((element) => (
            <button
              key={element}
              onClick={(e) => setTime(element)}
              className={styles.chartButton}
            >
              {element}
              {element === "max" ? "" : "d"}
            </button>
          ))}
        </div>
      </div>
      <div
        className={
          isFetching ? styles.chartLoading : styles.chartLoadingDisabled
        }
      >
        Data is loading...
      </div>
      <HighchartsReact
        containerProps={{ style: { height: "90%", width: "100%" } }}
        highcharts={Highcharts}
        options={chartOption}
        immutable={true}
      />
    </div>
  );
});

export default Charts;
