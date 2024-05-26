import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
//  MATERIAL UI COMPONENT
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// MOMENT
import moment from "moment";
// I18NEXT TRANSLATE
import { useTranslation } from "react-i18next";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./ApiSlice";

// let cancelAxios = null;
function App() {
  // Redux
  const isLoading = useSelector((state) => {
    return state.x.isLoading;
  });
  const temp = useSelector((state) => {
    return state.x.weather;
  });
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [time, setTime] = useState("");

  // Event Handler
  const [local, setLocal] = useState("en");
  function handleChangeLang() {
    if (local == "en") {
      setLocal("ru");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocal("en");
      i18n.changeLanguage("ru");
      moment.locale("en");
    }
    setTime(moment().format("MMM Do YY"));
  }

  // useEffect

  useEffect(() => {
    dispatch(fetchWeather());
    i18n.changeLanguage("ru");
  }, []);
  useEffect(() => {
    setTime(moment().format("MMM Do YY"));
  }, []);

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* CARD */}
          <div
            style={{
              backgroundColor: "#5d4037",
              color: "#fff",
              borderRadius: "15px",
              boxShadow: "0px 11px 1px rgpa(0,0,0,0.05)",
              width: "100%",
            }}
          >
            {/* content */}
            <div>
              {/* CITY & TIME */}
              <div
                style={{
                  display: "flex",
                  fontFamily: "TAMIMI",
                  alignItems: "end",
                }}
              >
                <Typography
                  variant="h1"
                  style={{ marginLeft: "10px", fontFamily: "TAMIMI" }}
                >
                  {t("Moscow")}
                </Typography>
                <Typography
                  variant="h5"
                  style={{ marginLeft: "15px", marginRight: "12px" }}
                >
                  {time}
                </Typography>
              </div>
              {/*== CITY & TIME ==*/}
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                {/* DEGREE & DESCRIPTION */}
                {/* TEMP */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress style={{ color: "#fff" }} />
                  ) : (
                    ""
                  )}
                  <Typography variant="h1" style={{ marginLeft: "10px" }}>
                    {temp.responseTemp}
                  </Typography>
                  {/* TODO: TEMP IMAGE */}
                  <img src={temp.iconTemp} alt="img" />
                </div>
                {/*== TEMP ==*/}
                <Typography variant="h6" style={{ marginLeft: "40px" }}>
                  {t(temp.descriptionTemp)}
                </Typography>
                {/* MIN & MAX */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <h4>
                    {" "}
                    {t("min")} : {temp.minTemp}
                  </h4>
                  <h4> | </h4>
                  <h4>
                    {" "}
                    {t("max")} : {temp.maxTemp}
                  </h4>
                </div>
                {/*== MIN & MAX ==*/}
              </div>
              {/*== DEGREE & DESCRIPTION ==*/}
              <CloudIcon style={{ fontSize: "200px" }} />
            </div>
            {/*== content ==*/}
          </div>
          {/*== CARD ==*/}
          <Button
            variant="text"
            style={{ color: "black", fontFamily: "tamimi" }}
            onClick={handleChangeLang}
          >
            {local == "en" ? "ENGLISH" : "РУССКИЙ"}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default App;
