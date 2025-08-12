import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ProfileForm = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profilePic: string;
};

type UserContextType = {
  userProfile: ProfileForm;
  setUserProfile: (profile: ProfileForm) => void;
};

const defaultProfile: ProfileForm = {
  name: "John Doe",
  email: "john@example.com",
  phone: "",
  bio: "",
  profilePic: "https://via.placeholder.com/150",
};

const UserContext = createContext<UserContextType>({
  userProfile: defaultProfile,
  setUserProfile: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<ProfileForm>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
