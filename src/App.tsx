import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import AdminDashboard from "./components/AdminDashboard.tsx";
import AdminLogin from "./components/AdminLogin.tsx";
import AdminSignup from "./components/AdminSignup.tsx";
import BuyerDashboard from "./components/BuyerDashboard.tsx";
import BuyerLogin from "./components/BuyerLogin.tsx";
import BuyerSignup from "./components/BuyerSignup.tsx";
import CreatePropertyForm from "./components/CreatePropertyForm.tsx";
import EditPropertyForm from "./components/EditPropertyForm.tsx";
import Favorites from "./components/Favourites.tsx";
import LandingPage from "./components/LandingPage.tsx";
import MortgageCalculator from "./components/MortgageCalculator.tsx";
import PropertyDetail from "./components/PropertyDetail.tsx";
import PropertySearch from "./components/PropertySearch.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import SellerDashboard from "./components/SellerDashboard.tsx";
import SellerLogin from "./components/SellerLogin.tsx";
import SellerSignup from "./components/SellerSignup.tsx";
import UserProfile from "./components/UserProfile.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/buyer-login" element={<BuyerLogin />} />
          <Route path="/buyer-signup" element={<BuyerSignup />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/properties" element={<PropertySearch />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route
            path="/buyer-dashboard"
            element={
              <ProtectedRoute roles={["BUYER"]}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              <ProtectedRoute roles={["SELLER"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-property"
            element={
              <ProtectedRoute roles={["SELLER"]}>
                <CreatePropertyForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-property/:id"
            element={
              <ProtectedRoute roles={["SELLER"]}>
                <EditPropertyForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["BUYER", "SELLER", "ADMIN"]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute roles={["BUYER"]}>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
