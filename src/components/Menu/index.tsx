import React from 'react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

export { MenuItem, SubMenu };
class MainMenu extends React.PureComponent<MenuProps> {
  static MenuItem = MenuItem;
  static SubMenu = SubMenu
  render() {
    return (
      <Menu {...this.props}>
        {this.props.children}
      </Menu>
    )
  }
}
export default MainMenu;
