"use client";

import React, { createContext, useContext, useState } from 'react';

interface ProfileContextType {
  isProfileHidden: boolean;
  setIsProfileHidden: (value: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isProfileHidden, setIsProfileHidden] = useState(false);

  return (
    <ProfileContext.Provider value={{ isProfileHidden, setIsProfileHidden }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
} 