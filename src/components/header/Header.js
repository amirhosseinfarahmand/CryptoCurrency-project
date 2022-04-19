import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Toolbar } from "@mui/material";
import { makeStyles } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useCrypto } from "../../providers/CryptoContext";

const Header = () => {
  const { currency, setCurrency } = useCrypto();

  const navigate = useNavigate();

  const darkThem = createTheme({
    palette: {
      primary: { main: "#fff" },
      mode: "dark",
    },
  });

  console.log(currency);
  return (
    <ThemeProvider theme={darkThem}>
      <AppBar
        position="static"
        color="transparent"
        sx={{ backgroundColor: "#18181B" }}
      >
        <Container>
          <Toolbar
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                cursor: "pointer",
                color: "gold",
                padding: "5px",
                ":hover": { backgroundColor: "#262626", borderRadius: "10px" },
              }}
              onClick={() => navigate("/")}
            >
              CryptoCurrency WebSite
            </Typography>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              color="primary"
              sx={{
                width: "150px",
                color: "white",
                height: "40px",
              }}
              variant="outlined"
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
