import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import DataProvider from "./context/authContext";
import UserForm from "./components/adminDashboard/UserForm";
import CreateDepartment from "./components/adminDashboard/CreateDepartment";
import Users from "./components/adminDashboard/Users";
import InitiatorPage from "./pages/InitiatorDashboard/InitiatorPage";
import SingleRequest from "./components/singleRequest/SingleRequest";
import ChangePasswordPage from "./pages/Passwords/ChangePasswordPage";
import ForgotPasswordPage from "./pages/Passwords/ForgotPasswordPage";
import LoginPage from "./pages/login/LoginPage";
import VerifyOTPPage from "./pages/Passwords/VerifyOTPPage";
import ResetPasswordPage from "./pages/Passwords/ResetPasswordPage";
import SuperAdminPage from "./pages/Dashboards/SuperAdminPage";
import AdminPage from "./pages/Dashboards/AdminPage";
import SearchResultsPage from "./components/searchComponent/SearchResultPage";
import CheckerPage from "./pages/CheckerPage/CheckerPage";
import PrivateRoute from "./privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/change-password/:id"
              element={<ChangePasswordPage />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/super-admin"
              element={
                <PrivateRoute>
                  <SuperAdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/userForm"
              element={
                <PrivateRoute>
                  <UserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/createDepartment"
              element={
                <PrivateRoute>
                  <CreateDepartment />
                </PrivateRoute>
              }
            />
            <Route
              path="/initiatorDashboard"
              element={
                <PrivateRoute>
                  <InitiatorPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkerDashboard"
              element={
                <PrivateRoute>
                  <CheckerPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/singleRequest/:_id"
              element={
                <PrivateRoute>
                  <SingleRequest />
                </PrivateRoute>
              }
            />
            <Route
              path="/search-results"
              element={
                <PrivateRoute>
                  <SearchResultsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
