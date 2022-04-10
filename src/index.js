import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { FavortiesProvider } from "./contexts/favorites";
import App from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CSSReset />
        <FavortiesProvider>
          <App />
        </FavortiesProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
