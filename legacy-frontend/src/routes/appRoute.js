import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import CheckInterval from "../pages/checkInterval";
import Form from "../pages/form";
import SelectTokens from "../pages/selectTokens";
import SuccessMessage from "../pages/successMsg";
import LegacyHome from "../pages/legacy-home";
import LegacyDemo from "../pages/legacy-demo";
import UserProfile from "../pages/user-profile";

const AppRoute = () => {

    const legacy = localStorage.getItem('has_legacy');
    
  return render(
    <BrowserRouter>
     <ChakraProvider theme={theme} resetCSS>
      <Routes>
        <Route index path="/" element={<LegacyHome />} />
        <Route path="/demo" element={legacy ? <CheckInterval /> : <LegacyDemo />} />
        <Route path="/get-started" element={<Form />} />
        <Route path="/select-token" element={<SelectTokens />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/profile" element={<CheckInterval />} />
        <Route path="/success" element={<SuccessMessage />} />
      </Routes>
     </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;
