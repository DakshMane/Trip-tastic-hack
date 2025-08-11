// import React, { useState } from 'react';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { TripProvider } from './contexts/TripContext';
// import Layout from './components/Layout';
// import LoginForm from './components/auth/LoginForm';
// import SignupForm from './components/auth/SignupForm';
// import Dashboard from './components/dashboard/Dashboard';
// import TripList from './components/trips/TripList';
// import CreateTripForm from './components/trips/CreateTripForm';

// const AppContent: React.FC = () => {
//   const { user } = useAuth();
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);

//   // Handle navigation
//   React.useEffect(() => {
//     const handleHashChange = () => {
//       const hash = window.location.hash.substring(1);
//       setCurrentView(hash || 'dashboard');
//     };

//     window.addEventListener('hashchange', handleHashChange);
//     handleHashChange(); // Handle initial hash

//     return () => window.removeEventListener('hashchange', handleHashChange);
//   }, []);

//   if (!user) {
//     return isLoginForm ? (
//       <LoginForm onToggleForm={() => setIsLoginForm(false)} />
//     ) : (
//       <SignupForm onToggleForm={() => setIsLoginForm(true)} />
//     );
//   }

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case 'trips':
//         return <TripList />;
//       case 'explore':
//         return <Dashboard />; // Placeholder - would be explore component
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <Layout>
//       {renderCurrentView()}
//       <CreateTripForm 
//         isOpen={isCreateTripOpen} 
//         onClose={() => setIsCreateTripOpen(false)} 
//       />
//     </Layout>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <TripProvider>
//         <AppContent />
//       </TripProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";

import Layout from "./components/Layout";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Dashboard from "./components/dashboard/Dashboard";
import TripList from "./components/trips/TripList";
import CreateTripForm from "./components/trips/CreateTripForm";
import UserProfile from "./components/dashboard/UserProfile";
import EditProfile from "./components/dashboard/EditProfile";
import PopularDestinations from "./components/dashboard/PopularDestinations";

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
            </Layout>
          </AuthGate>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;
