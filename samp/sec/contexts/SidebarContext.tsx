'use client';

import { ReactNode, createContext, useState } from 'react';

// ----------------------------------------------------------------------

const initialState = {
  toggleSidebar: false,
  handleToggleSidebar: (toggle: boolean) => {},
};

const SidebarContext = createContext(initialState);

type Props = {
  children: ReactNode;
};

function SidebarProvider({ children }: Props) {
  //states
  const [toggleSidebar, setToggleSidebar] = useState(false);

  //handlers
  const handleToggleSidebar = (toggle: boolean) => {
    setToggleSidebar(toggle);
  };

  return (
    <SidebarContext
      value={{
        handleToggleSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext>
  );
}

export { SidebarProvider, SidebarContext };
