'use client';
import { ChildrenProp } from '@/_types/global.t';
import React, { createContext, useContext, useState } from 'react';

type initialContext = {
  isOpen: boolean;
  toggle: VoidFunction;
  open: VoidFunction;
  close: VoidFunction;
} | null;

// contextes & hooks
const LeftSidebarContext = createContext<initialContext>(null);

export const useLeftSidebar = () => {
  const ctx = useContext(LeftSidebarContext);
  if (!ctx) throw new Error('useLeftSidebar must be used inside of SidebarUIProvider');
  return ctx;
};

const RightSidebarContext = createContext<initialContext>(null);

export const useRightSidebar = () => {
  const ctx = useContext(RightSidebarContext);
  if (!ctx) throw new Error('useRightSidebar must be used inside of SidebarUIProvider');
  return ctx;
};

// nested providers

function TicketSideBarsProvider({ children }: ChildrenProp) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const leftSideBar: initialContext = {
    isOpen: leftOpen,
    toggle: () => setLeftOpen((prev) => !prev),
    open: () => setLeftOpen(true),
    close: () => setLeftOpen(false),
  };

  const rightSideBar: initialContext = {
    isOpen: rightOpen,
    toggle: () => setRightOpen((prev) => !prev),
    open: () => setRightOpen(true),
    close: () => setRightOpen(false),
  };

  return (
    <LeftSidebarContext.Provider value={leftSideBar}>
      <RightSidebarContext.Provider value={rightSideBar}>{children}</RightSidebarContext.Provider>
    </LeftSidebarContext.Provider>
  );
}

export default TicketSideBarsProvider;
