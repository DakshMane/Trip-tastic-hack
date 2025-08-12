// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string ) => Promise<void>;
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
//     // Check for stored user data
//     const storedUser = localStorage.getItem('globetrotter_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockUser: User = {
//         id: '1',
//         name: 'Alex Johnson',
//         email: email,
//         avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150'
//       };
//       setUser(mockUser);
//       localStorage.setItem('globetrotter_user', JSON.stringify(mockUser));
//     } catch (error) {
//       throw new Error('Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockUser: User = {
//         id: '1',
//         name: name,
//         email: email,
//         avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150'
//       };
//       setUser(mockUser);
//       localStorage.setItem('globetrotter_user', JSON.stringify(mockUser));
//     } catch (error) {
//       throw new Error('Signup failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('globetrotter_user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// // import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// // import { User } from '../types';

// // interface AuthContextType {
// //   user: User | null;
// //   login: (email: string, password: string) => Promise<void>;
// //   signup: (name: string, email: string, password: string) => Promise<void>;
// //   logout: () => void;
// //   isLoading: boolean;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };

// // interface AuthProviderProps {
// //   children: ReactNode;
// // }

// // export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('globetrotter_user');
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //     setIsLoading(false);
// //   }, []);

// //   const login = async (email: string, password: string) => {
// //     setIsLoading(true);
// //     try {
// //       const res = await fetch('http://localhost:5000/api/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //         credentials: 'include', // important for cookies/sessions
// //       });

// //       if (!res.ok) {
// //         throw new Error('Invalid email or password');
// //       }

// //       const data = await res.json();
// //       setUser(data.user);
// //       localStorage.setItem('globetrotter_user', JSON.stringify(data.user));
// //     } catch (error) {
// //       console.error(error);
// //       throw error;
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const signup = async (name: string, email: string, password: string) => {
// //     setIsLoading(true);
// //     try {
// //       const res = await fetch('http://localhost:5000/api/auth/signup', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ name, email, password }),
// //         credentials: 'include',
// //       });

// //       if (!res.ok) {
// //         throw new Error('Signup failed');
// //       }

// //       const data = await res.json();
// //       setUser(data.user);
// //       localStorage.setItem('globetrotter_user', JSON.stringify(data.user));
// //     } catch (error) {
// //       console.error(error);
// //       throw error;
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       await fetch('http://localhost:5000/api/auth/logout', {
// //         method: 'POST',
// //         credentials: 'include',
// //       });
// //     } catch (error) {
// //       console.error('Logout request failed', error);
// //     }
// //     setUser(null);
// //     localStorage.removeItem('globetrotter_user');
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
// src/contexts/AuthContext.tsx
// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import {
//   User as FirebaseUser,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../components/auth/firebase"; // FIX: import your actual Firebase auth instance here
// import { User } from "../types";

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string, avatar?: string) => Promise<void>;
//   logout: () => Promise<void>;
//   updateUserProfile: (updates: { name?: string; avatar?: string }) => Promise<void>;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         setUser({
//           id: firebaseUser.uid,
//           name: firebaseUser.displayName || "",
//           email: firebaseUser.email || "",
//           avatar: firebaseUser.photoURL || "",
//         });
//       } else {
//         setUser(null);
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signup = async (name: string, email: string, password: string, avatar?: string) => {
//     setIsLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       if (auth.currentUser) {
//         await updateProfile(auth.currentUser, {
//           displayName: name,
//           photoURL:
//             avatar ||
//             `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
//         });

//         // Update local user state after profile update
//         setUser({
//           id: auth.currentUser.uid,
//           name: name,
//           email: auth.currentUser.email || "",
//           avatar: auth.currentUser.photoURL || "",
//         });
//       }
//     } catch (error) {
//       // Optionally handle error here
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // onAuthStateChanged will update the user state
//     } catch (error) {
//       // Optionally handle error here
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     await signOut(auth);
//     setUser(null); // Clear user state on logout
//   };

//   const updateUserProfile = async (updates: { name?: string; avatar?: string }) => {
//     if (auth.currentUser) {
//       await updateProfile(auth.currentUser, {
//         displayName: updates.name ?? auth.currentUser.displayName ?? "",
//         photoURL: updates.avatar ?? auth.currentUser.photoURL ?? "",
//       });
//       // Update local user state after profile update
//       setUser((prevUser) => ({
//         id: auth.currentUser!.uid,
//         name: updates.name || prevUser?.name || "",
//         email: prevUser?.email || "",
//         avatar: updates.avatar || prevUser?.avatar || "",
//       }));
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, signup, logout, updateUserProfile, isLoading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { auth } from '../components/auth/firebase';

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Watch for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, displayName: string): Promise<void> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
        setUser({ ...userCredential.user });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null);
  };

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    signup,
    login,
    logout,
    signInWithGoogle,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
};
