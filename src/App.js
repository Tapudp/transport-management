import React from "react";
import GlobalStyles from "./styles/globalStyles";
import AppRouter from "./AppRouter";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <>
      <AppProvider>
        <GlobalStyles />
        <AppRouter />
      </AppProvider>
    </>
  );
}

export default App;
