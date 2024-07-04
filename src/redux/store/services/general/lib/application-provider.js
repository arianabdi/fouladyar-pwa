import React from 'react';
import { ApplicationContext } from './index';

export default function ApplicationProvider({ Linking, Storage, Analytics, settings, children }) {
  const applicationContextValue = {
    Linking,
    Storage,
    Analytics,
    settings,
  };

  return (
    <ApplicationContext.Provider value={applicationContextValue}>
      {children}
    </ApplicationContext.Provider>
  );
}
