import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  className,
  style,
  children
}) => {
  const context = useContext(MenuContext);
  const classes = classNames('ry-menu-item', className, {
    'ry-menu-item-disabled': disabled,
    'is-active': context.index === index
  });
  const handleClick = () => {
    console.log('menu item click--->', index, context.index);
    !disabled && (typeof index === 'string') && context.onSelect?.(index)
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;