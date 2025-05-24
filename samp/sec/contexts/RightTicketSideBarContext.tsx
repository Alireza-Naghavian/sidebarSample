'use client';
import { ChildrenProps } from '@/_types/global';
import { createContext, useState } from 'react';
import { initialContext } from './LeftTicketSideBarContext';

const initialSideBarContext: initialContext = {
  isOpen: true,
  toggle: () => {},
  open: () => {},
  close: () => {},
};

// contextes & hooks
export const RightSidebarContext = createContext<initialContext>(initialSideBarContext);

const RightSidebarProvider = ({ children }: ChildrenProps) => {
  const [rightOpen, setRightOpen] = useState(true);

  const rightSideBar: initialContext = {
    isOpen: rightOpen,
    toggle: () => setRightOpen((prev: boolean) => !prev),
    open: () => setRightOpen(true),
    close: () => setRightOpen(false),
  };

  return (
    <RightSidebarContext.Provider value={rightSideBar}>{children}</RightSidebarContext.Provider>
  );
};

export default RightSidebarProvider;
