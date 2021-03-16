import React, { useState } from "react";
import axios from "axios";

import Brewery from "./Brewery";
import '../style/Breweries.css';

export default function Breweries() {
  const [breweryData, setBreweryData] = useState([]);
  const [once, setOnce] = useState(false);

  // iterates through the API results to make objects of the breweries and adds them to an array
  function handleResponse(response) {
    const breweries = [];

    for (let i = 0; i < response.data.totalResults; i++) {
      // gives a value to undefined properties
      response.data.data[i].description = (typeof response.data.data[i].description !== "undefined") ? response.data.data[i].description: "no description available";
      response.data.data[i].images = (typeof response.data.data[i].images !== "undefined") ? response.data.data[i].images: "No logo available";
      response.data.data[i].locations = (typeof response.data.data[i].locations !== "undefined") ? response.data.data[i].locations: "No country available";
      
      // creates brewery object, more properties can be added
      let brewery = {
        name: response.data.data[i].name,
        images: response.data.data[i].images,
        description: response.data.data[i].description
        // locations: response.data.data[i].locations
      };
      
      breweries.push(brewery);
    }
    setBreweryData(breweries);
  }

  // calls the API
  function getBreweries() {
    setOnce(true);
    let apiKey = "659d5c6b8f3d2447f090119e48202fdb";
    let breweryParameter = "breweries";
    let locationParameter = "withLocations=Y";
    let apiUrl = `https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/${breweryParameter}/?key=${apiKey}&${locationParameter}`;
    try {
      axios.get(apiUrl).then(handleResponse);
    } catch (error) {
      console.error(error);
    }
  }

  if (! once) {
    getBreweries();
  }

  return (
    <div className="Breweries">
      <ul>
        {/* needs to be changed to a function that iterates through the Brewery component */}
        {breweryData.map((data, index) => <Brewery key={index} data={data} />)}
      </ul>
    </div>
  );
}