import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProviderComp } from "./components/ThemeProvider";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import MyProfile from "./pages/MyProfile";
import Landing from './components/Landing';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";

const Home = lazy(() => import("./pages/Home"));
const HotelInfo = lazy(() => import("./pages/HotelInfo"));
const Bookings = lazy(() => import("./components/Bookings"));
const Users = lazy(() => import("./components/Users"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <ThemeProviderComp darkMode={darkMode}>
        <AuthContextProvider setDarkMode={setDarkMode}>
          <Suspense fallback={<LoadingSkeleton />}>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/hotels"
                  element={<PrivateRoute component={Home} />}
                />
                <Route
                  path="/hotels/:slug"
                  element={<PrivateRoute component={HotelInfo} />}
                />
                <Route
                  path="/my-profile"
                  element={<PrivateRoute component={MyProfile} />}
                />
                <Route
                  path="/admin"
                  element={<PrivateRoute component={AdminDashboard} />}
                />
                <Route
                  path="/admin/bookings"
                  element={<PrivateRoute component={Bookings} />}
                />
                <Route
                  path="/admin/users"
                  element={<PrivateRoute component={Users} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </QueryClientProvider>
          </Suspense>
        </AuthContextProvider>
      </ThemeProviderComp>
    </>
  );
}