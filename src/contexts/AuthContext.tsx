import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('globetrotter_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        name: 'Alex Johnson',
        email: email,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150'
      };
      setUser(mockUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150'
      };
      setUser(mockUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('globetrotter_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('globetrotter_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include', // important for cookies/sessions
//       });

//       if (!res.ok) {
//         throw new Error('Invalid email or password');
//       }

//       const data = await res.json();
//       setUser(data.user);
//       localStorage.setItem('globetrotter_user', JSON.stringify(data.user));
//     } catch (error) {
//       console.error(error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//         credentials: 'include',
//       });

//       if (!res.ok) {
//         throw new Error('Signup failed');
//       }

//       const data = await res.json();
//       setUser(data.user);
//       localStorage.setItem('globetrotter_user', JSON.stringify(data.user));
//     } catch (error) {
//       console.error(error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await fetch('http://localhost:5000/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });
//     } catch (error) {
//       console.error('Logout request failed', error);
//     }
//     setUser(null);
//     localStorage.removeItem('globetrotter_user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
