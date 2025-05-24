import { ChildrenProps, ClassNameType } from '@/_types/global';
import { Drawer, DrawerProps } from '@mui/material';


export type PersistDrawerProps = ChildrenProps &
  ClassNameType & {
    isOpen: boolean;
    handleOpenDrawer?: VoidFunction;
    handleCloseDrawer?: VoidFunction;
    handleToggleDrawer?: VoidFunction;
    anchor: DrawerProps['anchor'];
    containerRef?: React.RefObject<HTMLElement | null>;
    drawerWidth: number | string;
  };



function PersistentDrawer({ anchor, isOpen, containerRef, ...rest }: PersistDrawerProps) {
  return (
    <Drawer
      container={containerRef?.current ?? undefined}
      className={`${rest.className}`}
      sx={{
        zIndex: 50,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: rest.drawerWidth,
          boxSizing: 'border-box',
          position: 'absolute',
        },
      }}
      variant="persistent"
      anchor={anchor}
      open={isOpen}
    >
      {rest.children}
    </Drawer>
  );
}

export default PersistentDrawer;
