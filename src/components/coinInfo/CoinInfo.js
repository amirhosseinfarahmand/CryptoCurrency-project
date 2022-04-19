import React, { useState, useEffect } from "react";
import { useCrypto } from "../../providers/CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../../config/api";
import {
  createTheme,
  ThemeProvider,
  CircularProgress,
  circularProgressClasses,
  LinearProgress,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  registerables,
} from "chart.js";
import TimeButton from "../timeButton/TimeButton";
import { chartDays } from "../../config/timeData";

Chart.register(...registerables);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const { currency } = useCrypto();

  const fetchChart = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
    setLoading(false);
  };

  useEffect(() => {
    fetchChart();
  }, [currency, days]);

  const darkThem = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });
  console.log(historicalData);
  console.log(new Date(1647713001989));

  return (
    <ThemeProvider theme={darkThem}>
      <div style={{ width: "100%", marginTop: "10px", padding: "10px" }}>
        {loading ? (
          <CircularProgress size={250} sx={{ color: "gold" }} />
        ) : (
          <>
            {
              <Line
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicalData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            }
          </>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {chartDays.map((state) => (
            <TimeButton
              state={state}
              setDays={setDays}
              days={days}
              key={state.value}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
