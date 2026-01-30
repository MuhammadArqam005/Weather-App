import express, { Request, response, Response } from 'express'
import dotenv from "dotenv";
import cors from "cors"
dotenv.config()
const app = express()
app.use(cors())

interface Location {
  city: string,
  country: string,
  date: string,
  temp_c: number
  temp_f: number,
  is_day: boolean,
  condition: string,
  icon: string
}

interface conditionOfDay {
  humidity: number,
  wind: number,
  visibility: number,
  min_temp: number,
  max_temp: number,
  cloud: number
}

interface conditionOfTime {
  time: string,
  conditionIcon: string,
  condition: string
  temp_c: number
}

interface data {
  location: Location,
  conditionOfDay: conditionOfDay,
  forecastThatDay: conditionOfTime[]
}




const conditionChecker = (code: number): string => {

  const PARTLY_CLOUD : number[] = [1003];
  const CLOUDY : number[] = [1006];
  const BAD_WEATHER : number[] = [1009,1030];
  const LITTLE_RAIN_POSSIBLE : number[] = [1063,1066,1069,1072,1180];
  const WORST_WEATHER : number[]=[1087,1114,1117,1135,1147];
  const MODERATE_RAIN_POSSIBLE : number[] = [1150,1153,1183,1186,1189];
  const HEAVY_RAIN_POSSIBLE : number[] = [1192,1195];
  const LITTLE_FREEZE_RAIN_POSSIBLE : number[] = [1168,1198,1204];
  const MODERATE_FREEZE_RAIN_POSSIBLE : number[] = [1201,1207];
  const HEAVY_FREEZE_RAIN_POSSIBLE : number[] = [1171];
  const LITTLE_SNOW_POSSIBLE : number[] = [1213,1216];
  const MODERATE_SNOW_POSSIBLE : number[]= [1219,1222];
  const HEAVY_SNOW_POSSIBLE : number[] = [1225];
  const LITTLE_SHOWER_POSSIBLE : number[] = [1237,1240,1255,1261]
  const MODERATE_SHOWER_POSSIBLE : number[] = [1243,1246,1249,1258,1264]
  const HEAVY_SHOWER_POSSIBLE : number[] = [1252];
  const LITTLE_THUNDER : number[]= [1273,1279];
  const MODERATE_THUNDER : number[]= [1276];
  const HEAVY_THUNDER : number[]= [1282];


  const CLOUDY_CODES = [];
  if (HEAVY_THUNDER.includes(code)) {
    return `Severe Thunderstorm Warning`
  }
  else if (MODERATE_THUNDER.includes(code)) {
    return `Thunderstorms Likely`
  }
  else if (LITTLE_THUNDER.includes(code)) {
      return `Isolated Thunderstorms`
    }
    else if(HEAVY_SHOWER_POSSIBLE.includes(code)){
      return 'Intense Rain Showers'
    }
    else if(MODERATE_SHOWER_POSSIBLE.includes(code)){
      return 'Scattered Showers'
    }
    else if(LITTLE_SHOWER_POSSIBLE.includes(code)){
      return `Light Showers`
    }
    else if(HEAVY_SNOW_POSSIBLE.includes(code)){
      return `Heavy Snow Warning`
    }
    else if(MODERATE_SNOW_POSSIBLE.includes(code)){
      return 'Snowfall Expected'
    }
    else if(LITTLE_SNOW_POSSIBLE.includes(code)){
      return 'Light Snowfall'
    }
    else if(HEAVY_FREEZE_RAIN_POSSIBLE.includes(code)){
      return `Severe Freezing Rain Alert`
    }
    else if(MODERATE_FREEZE_RAIN_POSSIBLE.includes(code)){
      return `Freezing Rain Advisory`
    }
    else if(LITTLE_FREEZE_RAIN_POSSIBLE.includes(code)){
      return `Light Freezing Rain`
    }
    else if(HEAVY_RAIN_POSSIBLE.includes(code)){
      return `Heavy Rain Warning`
    }
    else if(MODERATE_RAIN_POSSIBLE.includes(code)){
      return `Rain Expected`
    }
    else if(WORST_WEATHER.includes(code)){
      return `Fog`
    }
    else if(LITTLE_RAIN_POSSIBLE.includes(code)){
      return `Light Rain Possible`
    }
    else if(BAD_WEATHER.includes(code)){
      return `Mist`
    }
    else if(CLOUDY.includes(code)){
      return `Cloudy`
    }
    else if(PARTLY_CLOUD.includes(code)){
      return `Partly Cloudly`
    }
    else {
        return 'Clear'
      }
}

const conditionIcon = (code: number): string => {
  const PARTLY_CLOUD : number[] = [1003];
  const CLOUDY : number[] = [1006];
  const BAD_WEATHER : number[] = [1009,1030];
  const LITTLE_RAIN_POSSIBLE : number[] = [1063,1066,1069,1072,1180];
  const WORST_WEATHER : number[]=[1087,1114,1117,1135,1147];
  const MODERATE_RAIN_POSSIBLE : number[] = [1150,1153,1183,1186,1189];
  const HEAVY_RAIN_POSSIBLE : number[] = [1192,1195];
  const LITTLE_FREEZE_RAIN_POSSIBLE : number[] = [1168,1198,1204];
  const MODERATE_FREEZE_RAIN_POSSIBLE : number[] = [1201,1207];
  const HEAVY_FREEZE_RAIN_POSSIBLE : number[] = [1171];
  const LITTLE_SNOW_POSSIBLE : number[] = [1213,1216];
  const MODERATE_SNOW_POSSIBLE : number[]= [1219,1222];
  const HEAVY_SNOW_POSSIBLE : number[] = [1225];
  const LITTLE_SHOWER_POSSIBLE : number[] = [1237,1240,1255,1261]
  const MODERATE_SHOWER_POSSIBLE : number[] = [1243,1246,1249,1258,1264]
  const HEAVY_SHOWER_POSSIBLE : number[] = [1252];
  const LITTLE_THUNDER : number[]= [1273,1279];
  const MODERATE_THUNDER : number[]= [1276];
  const HEAVY_THUNDER : number[]= [1282];


  const CLOUDY_CODES = [];
  if (HEAVY_THUNDER.includes(code)) {
    return `thunderstorm`
  }
  else if (MODERATE_THUNDER.includes(code)) {
    return `weather_hail`
  }
  else if (LITTLE_THUNDER.includes(code)) {
      return `weather_mix`
    }
    else if(HEAVY_SHOWER_POSSIBLE.includes(code)){
      return 'shower'
    }
    else if(MODERATE_SHOWER_POSSIBLE.includes(code)){
      return 'shower'
    }
    else if(LITTLE_SHOWER_POSSIBLE.includes(code)){
      return `water_do`
    }
    else if(HEAVY_SNOW_POSSIBLE.includes(code)){
      return `snowing_heavy`
    }
    else if(MODERATE_SNOW_POSSIBLE.includes(code)){
      return 'snowing'
    }
    else if(LITTLE_SNOW_POSSIBLE.includes(code)){
      return 'weather_snowy'
    }
    else if(HEAVY_FREEZE_RAIN_POSSIBLE.includes(code)){
      return `rainy_snow`
    }
    else if(MODERATE_FREEZE_RAIN_POSSIBLE.includes(code)){
      return `rainy_snow`
    }
    else if(LITTLE_FREEZE_RAIN_POSSIBLE.includes(code)){
      return `rainy_snow`
    }
    else if(HEAVY_RAIN_POSSIBLE.includes(code)){
      return `rainy_heavy`
    }
    else if(MODERATE_RAIN_POSSIBLE.includes(code)){
      return `rainy_light`
    }
    else if(WORST_WEATHER.includes(code)){
      return `foggy`
    }
    else if(LITTLE_RAIN_POSSIBLE.includes(code)){
      return `rainy`
    }
    else if(BAD_WEATHER.includes(code)){
      return `mist`
    }
    else if(CLOUDY.includes(code)){
      return `cloud`
    }
    else if(PARTLY_CLOUD.includes(code)){
      return `partly_cloudy_day`
    }
    else {
        return 'sunny'
      }
    }
    
    async function getWeather(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
      let city: string = req.query.city as string;
      const fetchURL= await fetch(`https://api.weatherapi.com/v1/current.json/forecast.json?key=${process.env.API_KEY}&q=${city}`);
      const fetchData = await fetchURL.json();
      if(fetchURL.status==400){
        return res.json({
          error: "Enter Valid Location" 
        })
      }
  const data: data = {
    location: {
      city: fetchData.location.name,
      country: fetchData.location.country,
      date: fetchData.forecast.forecastday[0].date,
      temp_c: fetchData.current.temp_c,
      temp_f: fetchData.current.temp_f,
      is_day: fetchData.current.is_day == 1,
      condition: conditionChecker(fetchData.current.condition.code),
      icon: conditionIcon(fetchData.current.condition.code)
    },
    conditionOfDay: {
      humidity: fetchData.current.humidity,
      wind: fetchData.current.wind_kph,
      visibility: fetchData.current.vis_km,
      min_temp: fetchData.forecast.forecastday[0].day.mintemp_c,
      max_temp: fetchData.forecast.forecastday[0].day.maxtemp_c,
      cloud: fetchData.current.cloud
    },
    forecastThatDay: [
      {
        time: "12:00 AM",
        conditionIcon: conditionIcon(fetchData.forecast.forecastday[0].hour[0].condition.code),
        condition : conditionChecker(fetchData.forecast.forecastday[0].hour[0].condition.code),
        temp_c: fetchData.forecast.forecastday[0].hour[0].temp_c
      },
      {
        time: "09:00 AM",
        conditionIcon: conditionIcon(fetchData.forecast.forecastday[0].hour[9].condition.code),
        condition : conditionChecker(fetchData.forecast.forecastday[0].hour[9].condition.code),
        temp_c: fetchData.forecast.forecastday[0].hour[9].temp_c
      },
      {
        time: "12:00 PM",
        conditionIcon: conditionIcon(fetchData.forecast.forecastday[0].hour[12].condition.code),
        condition : conditionChecker(fetchData.forecast.forecastday[0].hour[12].condition.code),
        temp_c: fetchData.forecast.forecastday[0].hour[12].temp_c
      },
      {
        time: "03:00 PM",
        conditionIcon: conditionIcon(fetchData.forecast.forecastday[0].hour[15].condition.code),
        condition : conditionChecker(fetchData.forecast.forecastday[0].hour[15].condition.code),
        temp_c: fetchData.forecast.forecastday[0].hour[15].temp_c
      },
      {
        time: "06:00 PM",
        conditionIcon: conditionIcon(fetchData.forecast.forecastday[0].hour[18].condition.code),
        condition : conditionChecker(fetchData.forecast.forecastday[0].hour[18].condition.code),
        temp_c: fetchData.forecast.forecastday[0].hour[18].temp_c
      },
      {
        time: "09:00 PM",
        conditionIcon: conditionIcon(fetchData.forecast.forecastday[0].hour[21].condition.code),
        condition : conditionChecker(fetchData.forecast.forecastday[0].hour[21].condition.code),
        temp_c: fetchData.forecast.forecastday[0].hour[21].temp_c
      }
    ]
  }
  return res.json(data)
}


app.get('/', getWeather)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})