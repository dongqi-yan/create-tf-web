import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical';
type SelectCallBack = (selectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallBack;
  defaultOpenMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
  defaultOpenMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'});

const Menu: React.FC<MenuProps> = ({
  className,
  mode = 'horizontal',
  style,
  children,
  defaultIndex = '0',
  onSelect,
  defaultOpenMenus = []
}) => {
  const [currentActive, setActive] = useState<string>(defaultIndex)
  const classes = classNames('ry-menu', className, {
    'ry-menu-vertical': mode === 'vertical',
    'ry-menu-horizontal': mode !== 'vertical'
  });
  const handleClick = (index: string) => {
    setActive(index);
    onSelect?.(index);
    console.log('current: ', index);
  }
  const passedContext: IMenuContext = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index + '' });
      } else {
        console.error('warning: menu has a child which is not a MenuItem')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu;