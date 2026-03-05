import React from "react";
import "./App.css";
import Auth from "./screens/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import BrowseCars from "./screens/Store";
import useUserStore from "./Store/useUserStore";
import useSocketStore from "./Store/useSocket";
import LandingPage from "./screens/LandingPage";
function App() {
  const { user } = useUserStore();
  const { connectSocket, listenToBookings } = useSocketStore();

  React.useEffect(() => {
    if (user && user.id) {
      connectSocket(user.id);
      listenToBookings();
    }
  }, [user, connectSocket, listenToBookings]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store" element={<BrowseCars />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
