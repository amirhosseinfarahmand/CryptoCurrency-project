import React, { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../../config/api";
import { useCrypto } from "../../providers/CryptoContext";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setsearch] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = useCrypto();
  const navigate = useNavigate();

  const darkThem = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    };

    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  console.log(coins.filter((state) => state.name.toLowerCase().includes("")));
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log(coins.filter((state) => state));
  return (
    <ThemeProvider theme={darkThem}>
      <Container
        style={{
          textAlign: "center",
          backgroundColor: "black",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h4"
          className="title"
          style={{
            backgroundColor: "#171717",
            boxShadow: "5px 5px 10px #44403C",
            fontFamily: "monserat",
            display: "flex",
            padding: "10px",
            justifyContent: "center",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        >
          Crypto Currency prices by markey cap
        </Typography>
        <TextField
          label="search for a crypto currency..."
          style={{ width: "100%", marginTop: "20px", marginBottom: "10px" }}
          onChange={(e) => setsearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map(
                    (state) => (
                      <TableCell
                        sx={{
                          backgroundColor: "#EAB308",
                          color: "black",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {state}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((state) => {
                    let profit = state?.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/coins/${state.id}`)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={state.image}
                            alt={state.name}
                            style={{ height: "50px" }}
                          />
                          <div>
                            <p
                              style={{
                                textTransform: "uppercase",
                                fontSize: "20px",
                              }}
                            >
                              {state.symbol}
                            </p>
                            <p style={{ opacity: "0.5" }}>{state.name}</p>
                          </div>
                        </TableCell>

                        <TableCell>
                          {symbol}&nbsp;
                          {numberWithCommas(state.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          sx={{ paddingLeft: "30px" }}
                          style={
                            profit
                              ? { color: "rgb(14, 203, 129)" }
                              : { color: "red" }
                          }
                        >
                          {profit && "+"}
                          {state.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell>
                          {symbol}&nbsp;
                          {numberWithCommas(state.market_cap).slice(0, 7)}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => setPage(value)}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;
