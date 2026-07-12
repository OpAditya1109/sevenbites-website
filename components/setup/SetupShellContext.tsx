"use client";

import { createContext, useContext } from "react";

export const SetupShellContext = createContext<{ openMobileMenu: () => void }>({
  openMobileMenu: () => {},
});

export function useSetupShell() {
  return useContext(SetupShellContext);
}