import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import { UserProvider, useUser } from "./components/dashboard/UserContext";
import Layout from "./components/Layout";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Dashboard from "./components/dashboard/Dashboard";
import TripList from "./components/trips/TripList";
import CreateTripForm from "./components/trips/CreateTripForm";
import UserProfile from "./components/dashboard/UserProfile";
import EditProfile from "./components/dashboard/EditProfile";
import PopularDestinations from "./components/dashboard/PopularDestinations";

  // Import here

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);

  if (!user) {
    return isLoginForm ? (
      <LoginForm onToggleForm={() => setIsLoginForm(false)} />
    ) : (
      <SignupForm onToggleForm={() => setIsLoginForm(true)} />
    );
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
      <TripProvider>
        <Router>
          <AuthGate>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trips" element={<TripList />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/popular" element={<PopularDestinations />} />
                <Route
                  path="/trips/create"
                  element={
                    <CreateTripForm
                      isOpen={true}
                      onClose={() => window.history.back()}
                    />
                   
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
                   
              {/* Add chatbot here */}
              
            </Layout>
          </AuthGate>
        </Router>
      </TripProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
