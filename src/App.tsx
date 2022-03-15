import React, { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import { Main } from "./containers";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Main />
    </Suspense>
  );
}

export default App;
