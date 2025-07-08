import React from "react";
import GlobalStyles from "./styles/globalStyles.jsx";
import AppRouter from "./AppRouter.jsx";
import { AppProvider } from "./context/AppContext.jsx";

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

// function App() {
//   return (
//     <div style={{ color: "red", fontSize: "2rem" }}>
//       Hello, this is a minimal test!
//     </div>
//   );
// }

// export default App;
