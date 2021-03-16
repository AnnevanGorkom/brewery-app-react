import React from "react";

import Search from "./components/Search";
import Breweries from "./components/Breweries";
import './App.css';

function App() {

    return (
    <div className="App">
      <h1>Beers from around the world</h1>
      <Search />
      <Breweries data />
      <footer>Created by Anne van Gorkom: <a href="https://github.com/AnnevanGorkom/brewery-app-react">Github</a></footer>
    </div>
  );
}

export default App;
