// REDUX
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//  AXIOS
import axios from "axios";

export const fetchWeather = createAsyncThunk("MyThinkFunction", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=55.7&lon=37.6&appid=84bb79a4819e4fffbac801ab142cdcd9"
  );
  const responseTemp = Math.round(response.data.main.temp - 273.15);
  const minTemp = Math.round(response.data.main.temp_min - 273.15);
  const maxTemp = Math.round(response.data.main.temp_max - 273.15);
  const descriptionTemp = response.data.weather[0].description;
  const iconTemp = response.data.weather[0].icon;

  return {
    responseTemp,
    minTemp,
    maxTemp,
    descriptionTemp,
    iconTemp: `https://openweathermap.org/img/wn/${iconTemp}@2x.png`,
  };
});

export const myWeather = createSlice({
  name: "apiRequst",
  initialState: {
    weather: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = myWeather.actions;
export default myWeather.reducer;
