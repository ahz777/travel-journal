import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainNavigation from "./components/Navigation/MainNavigation";
import Users from "./pages/Users";
import NewPlace from "./pages/NewPlace";
import UserPlaces from "./pages/UserPlaces";
import UpdatePlace from "./pages/UpdatePlace";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Users />}
            />
            <Route
              path="/places/new"
              element={<NewPlace />}
            />
            <Route
              path="/:userId/places"
              element={<UserPlaces />}
            />
            <Route
              path="/places/:placeId"
              element={<UpdatePlace />}
            />{" "}
            <Route
              path="/auth"
              element={<Auth />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
