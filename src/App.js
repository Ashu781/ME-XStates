import React, {useEffect, useState} from 'react';
import axios from "axios";


function App() {

  let [country, setCountry] = useState("");
  let [state, setState] = useState("");
  let [city, setCity] = useState("");
  let [display, setDisplay] = useState(false);

  let [countryList,setCountryList] = useState([]);
  let [stateList,setStateList] = useState([]);
  let [cityList,setCityList] = useState([]);
  

    async function getState(country){
      let responseState = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
      setStateList(responseState.data);
    }

    async function getCity(country, state){
      let responseCity = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      setCityList(responseCity.data);
    }


  let handleCountryChange = (e)=>{
         setState("");
         setCity("");
         setCountry(e.target.value);
         getState(e.target.value);
  }

  let handleStateChange = (e)=>{
         setCity("");
         setState(e.target.value);
         getCity(country, e.target.value);
  }

  let handleCityChange = (e)=>{
         setCity(e.target.value);
         setDisplay(true);
  }

  useEffect(()=>{
    
    async function getCountry(){
      let responseCountry = await axios.get("https://crio-location-selector.onrender.com/countries");
      setCountryList(responseCountry.data);
    }

    getCountry();

  },[]);

  return (
   <>
      <select value={country} onChange={handleCountryChange}>
        <option value="" key="">Select Country</option>
        {
          countryList.map((ele)=>(
             <option value={ele} key={ele}>{ele}</option>
          ))
        }
      </select>




      <select value={state} onChange={handleStateChange} disabled={!country}>
        <option value="" key="">Select State</option>
        {
          stateList.map((ele)=>(
             <option value={ele} key={ele}>{ele}</option>
          ))
        }
      </select>




      <select value={city} onChange={handleCityChange} disabled={!state}>
        <option value="" key="">Select City</option>
        {
          cityList.map((ele)=>(
             <option value={ele} key={ele}>{ele}</option>
          ))
        }
      </select>



      {
        display && <h3>You selected {city}, {state}, {country}</h3>
      }

   </>
  );
}

export default App;
