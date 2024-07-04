import { createContext, useContext } from 'react';

export const ApplicationContext = createContext({});

export function useApplication() {
  return useContext(ApplicationContext);
}
