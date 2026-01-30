import { useEffect, useState } from 'react';
import './App.css'
function App() {
  // const [xCoord,setXCoord] = useState<number>(0)
  // const [yCoord,setYCoord] = useState<number>(0)
  const [darkMode,setDarkMode] = useState<boolean>(false)
  const [location,setLocation] = useState()
  const [condOFDay,setCondOFDay] = useState()
  const [forecastThatDay,setForecastThatDay] = useState([])
  
  const getLocation = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success)
    }
  }
  
  const success = async (position: GeolocationPosition)=>{
    const fetchURL: Response = await fetch(`https://weatherify-backend.vercel.app/?city=${position.coords.latitude},${position.coords.longitude}`);
    const fetchJson = await fetchURL.json();
    setLocation(fetchJson.location)
    setCondOFDay(fetchJson.conditionOfDay)
    setForecastThatDay(fetchJson.forecastThatDay)
    // setXCoord(position.coords.latitude)
    // setYCoord(position.coords.longitude)
  }

  useEffect(()=>{
    getLocation()
  },[])
  
  const searchLocation = async ()=>{
    const searchCity : HTMLInputElement = document.getElementById('searchCity') as HTMLInputElement;
    if(!searchCity.value){
      return null;
    }
    const fetchURL = await fetch(`https://weatherify-backend.vercel.app/?city=${searchCity.value}`)
    const fetchJson = await fetchURL.json();
    setLocation(fetchJson.location)
    setCondOFDay(fetchJson.conditionOfDay)
    setForecastThatDay(fetchJson.forecastThatDay)
  }

  if(!location){
   return (
        <div className={`${darkMode ? "dark" : ""} dark:bg-gray-900 h-screen transition duration-200 ease-in-out`}> 
   <nav className='w-full bg-gray-400 dark:bg-gray-800 shadow-xl text-lg items-center justify-between px-2 py-4 zalandosans font-semibold tracking-wider text-gray-900 flex dark:text-gray-100 tb:text-2xl tb:px-4'><h1>WEATHER APP</h1><div id='lightanddarkmode' className='relative w-18 h-8 text-sm'><input type="checkbox" name="toggle" id="toggle" className='w-0 h-0 opacity-0 peer' onChange={():void=>{setDarkMode(darkMode=>!darkMode)}} /><span className='absolute top-0 bottom-0 left-0 right-0 rounded-2xl duration-100 ease-in-out bg-white before:absolute before:content-[""] before:w-8 before:h-8 before:bottom-0 px-1 before:left-0 before:bg-gray-600 peer-checked:bg-blue-500 before:duration-200 before:ease-in-out peer-checked:before:translate-x-10 before:rounded-[50%] peer-checked:before:bg-blue-500 before:border-2'><label htmlFor='toggle' className='flex items-center justify-between h-8 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#efefef"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1e1e1e"><path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z"/></svg></label></span></div></nav>
   <div className='my-4 flex items-center justify-center text-2xl font-bold dmsans dark:text-gray-100'><p>No Location Specified</p></div>
   <div id='SearchField' className='flex items-center my-4 justify-center gap-x-2'>
        <input type='text' id='searchCity' name='searchCity' placeholder='Search City' className='my-4 outline-2 py-1 px-2 rounded-md mm:w-60 dmsans tb:w-100 tb:h-12 tb:text-xl dark:bg-gray-600 dark:text-gray-100' onKeyDown={(e)=>{
          if(e.key=='Enter'){
            searchLocation()
          }
        }} />
        <span className=' w-10 h-10 tb:h-14 tb:w-14 bg-amber-300 rounded-[50%] flex justify-center items-center text-gray-900 dark:bg-gray-600 cursor-pointer' onClick={searchLocation}><svg className='w-4 h-4 tb:w-6 tb:h-6 dark:fill-gray-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg></span>
      </div>
   </div>
   )
  }
  return (
    <div className={`${darkMode ? "dark" : ""} dark:bg-gray-900 h-screen transition duration-200 ease-in-out`}>
      <nav className='w-full bg-gray-400 dark:bg-gray-800 shadow-xl text-lg items-center justify-between px-2 py-4 zalandosans font-bold tracking-wider text-gray-900 flex dark:text-gray-100 tb:text-2xl tb:px-4'><h1>WEATHER APP</h1><div id='lightanddarkmode' className='relative w-18 h-8 text-sm'><input type="checkbox" name="toggle" id="toggle" className='w-0 h-0 opacity-0 peer' onChange={():void=>{setDarkMode(darkMode=>!darkMode)}} /><span className='absolute top-0 bottom-0 left-0 right-0 rounded-2xl duration-100 ease-in-out bg-white before:absolute before:content-[""] before:w-8 before:h-8 before:bottom-0 px-1 before:left-0 before:bg-gray-600 peer-checked:bg-blue-500 before:duration-200 before:ease-in-out peer-checked:before:translate-x-10 before:rounded-[50%] peer-checked:before:bg-blue-500 before:border-2'><label htmlFor='toggle' className='flex items-center justify-between h-8 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#efefef"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1e1e1e"><path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z"/></svg></label></span></div></nav>
      <div id='SearchField' className='flex items-center my-4 justify-center gap-x-2'>
        <input type='text' id='searchCity' name='searchCity' placeholder='Search City' className='my-4 outline-2 py-1 px-2 rounded-md mm:w-60 dmsans tb:w-100 tb:h-12 tb:text-xl dark:bg-gray-600 dark:text-gray-100' onKeyDown={(e)=>{
          if(e.key=='Enter'){
            searchLocation()
          }
        }} />
        <span className=' w-10 h-10 tb:h-14 tb:w-14 bg-amber-300 rounded-[50%] flex justify-center items-center text-gray-900 dark:bg-gray-600 cursor-pointer' onClick={searchLocation}><svg className='w-4 h-4 tb:w-6 tb:h-6 dark:fill-gray-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg></span>
      </div>
      <div className='flex flex-col tb:flex-row tb:flex-wrap'>
      <div id='currentLocationSection' className=' w-9/10 h-50  bg-radial-[at_50%_100%] from-red-100 to-red-300 mx-auto my-4 rounded-2xl flex  text-xl shadow-2xl justify-center items-center text-gray-900 font-bold tb:w-18/40 lp:text-2xl dark:from-red-600 dark:to-red-800 dark:text-gray-200'>
        <div className='w-29/30 h-44 bg-white/20  px-2 py-1 flex flex-col justify-center rounded-2xl backdrop-blur-3xl space-y-4 dmsans'>
          <div className='flex items-center justify-between'><p>{location['city']} , {location['country']}</p><p className='text-base tb:text-lg'>{location['date']}</p></div>
          <div className='flex items-center space-x-4'><span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-thermometer" viewBox="0 0 16 16">
            <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
          </svg></span><p className='text-2xl'> {location['temp_c']}&deg;C</p><p>/</p><p className='text-2xl'> {location['temp_f']}&deg;F</p></div>
          <div className='flex items-center space-x-4'><span className="material-symbols-outlined">{location['icon']}</span><p>{location['condition']}</p></div>
        </div></div>
      <div id='currentDetailSection' className='w-9/10 h-69 bg-radial-[at_50%_100%] from-emerald-200 to-emerald-300 mx-auto my-4 rounded-2xl flex items-center justify-center  shadow-2xl tb:w-18/40 dark:from-emerald-600 dark:to-emerald-800 dark:text-gray-200 text-gray-900'>
        <div className='w-29/30 bg-white/20  flex flex-wrap h-66 justify-center backdrop-blur-3xl rounded-2xl  space-x-4 space-y-1 py-3 px-2 text-xl dmsans font-semibold lp:text-2xl ll:space-x-8'>
          <div className='flex flex-col justify-center items-center h-20'>
            <div className='flex items-center space-x-1'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Z" /></svg><p>Humidity</p></div><p>{condOFDay?.['humidity']}%</p>
          </div>
          <div className='flex flex-col justify-center items-center h-20'>
            <div className='flex items-center space-x-1'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M750-614q-27 27-62 41t-70 14q-35 0-69-13.5T488-614l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-689l-75 75-57-57 75-75q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-746l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-671l75-75 57 57-75 75Zm0 200q-27 27-61.5 40.5T619-360q-35 0-69.5-13.5T488-414l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-489l-75 75-57-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-546l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-471l75-75 57 57-75 75Zm-1 200q-27 27-61 40.5T619-160q-35 0-69.5-13.5T488-214l-76-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T266-289l-75 75-56-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-346l75 75q16 16 35.5 23.5T619-240q20 0 39-7.5t35-23.5l75-75 56 57-75 75Z" /></svg><p>Wind</p></div><p>{condOFDay?.['wind']} km/hr</p>
          </div>
          <div className='flex flex-col justify-center items-center h-20'>
            <div className='flex items-center space-x-1'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720ZM480-220q-120 0-217.5-71T120-480q45-118 142.5-189T480-740q120 0 217.5 71T840-480q-45 118-142.5 189T480-220Zm0-80q88 0 161-48t112-132q-39-84-112-132t-161-48q-88 0-161 48T207-480q39 84 112 132t161 48Zm0-40q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-80q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40Zm800 0v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80ZM480-480Z" /></svg><p>Visibilty</p></div><p>{condOFDay?.['visibility']} km</p>
          </div>
          <div className='flex flex-col justify-center items-center h-20'>
            <div className='flex items-center space-x-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-thermometer" viewBox="0 0 16 16">
              <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
            </svg><p>Min Temp</p></div><p>{condOFDay?.['min_temp']}&deg;C</p>
          </div>
          <div className='flex flex-col justify-center items-center h-20'>
            <div className='flex items-center space-x-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-thermometer" viewBox="0 0 16 16">
              <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
              <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
            </svg><p>Max Temp</p></div><p>{condOFDay?.['max_temp']}&deg;C</p>
          </div>
          <div className='flex flex-col justify-center items-center h-20'>
            <div className='flex items-center space-x-1'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Z"/></svg><p>Cloud</p></div><p>{condOFDay?.['cloud']}%</p>
          </div>
        </div>
      </div>
      <div className='w-9/10 bg-radial from-indigo-100 to-indigo-300 mx-auto py-2 rounded-2xl flex flex-col items-center justify-center my-4 shadow-2xl dark:from-indigo-600 dark:to-indigo-800 dark:text-gray-200 text-gray-900'>
        <div className='w-29/30 rounded-2xl space-y-2 flex flex-col lm:flex-row lm:space-x-2 flex-wrap justify-center items-center backdrop-blur-4xl' >
        {forecastThatDay.map((element,index)=>{
          return (
          <div key={index} className='w-full lm:w-18/40 lp:w-3/10 text-lg mm:text-xl lp:text-2xl rounded-2xl bg-white/20 flex flex-col py-1 items-center justify-between dmsans font-semibold ll:w-4/25 backdrop-blur-3xl hover:scale-105 duration-100 ease-in'>
            <p>{element['time']}</p><span className="material-symbols-outlined">{element['conditionIcon']}</span><p className='text-center'>{element['condition']}</p><p>{element['temp_c']}&deg;C</p>
          </div>
          )
        })}
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
