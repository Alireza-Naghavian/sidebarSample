"use client"
import { ChildrenProps } from '@/_types/global';
import { createContext, useState } from 'react';
export type initialContext = {
  isOpen: boolean;
  toggle: VoidFunction;
  open: VoidFunction;
  close: VoidFunction;
} | null;

const initialContext: initialContext = {
  isOpen: true,
  toggle: () => {},
  open: () => {},
  close: () => {},
};

// context
export const LeftSidebarContext = createContext<initialContext>(initialContext);


const LeftSidebarProvider = ({ children }: ChildrenProps) => {
  const [leftOpen, setLeftOpen] = useState(true);

  const leftSideBar: initialContext = {
    isOpen: leftOpen,
    toggle: () => setLeftOpen((prev: boolean) => !prev),
    open: () => setLeftOpen(true),
    close: () => setLeftOpen(false),
  };

  return <LeftSidebarContext.Provider value={leftSideBar}>{children}</LeftSidebarContext.Provider>
};

export default LeftSidebarProvider;
