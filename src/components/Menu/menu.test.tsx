import React from 'react';
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
  defaultOpenMenus: ['3']
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        ryui
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

let wrapper: RenderResult, 
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;

const createStyleFile = () => {
  const cssFile: string = `
    .ry-submenu {
      display: none;
    }
    .ry-submenu.ry-menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
}
describe('test Menu and MenuItem component', () => {
  
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('ry-menu');
    expect(menuElement.getElementsByTagName('li').length).toEqual(5);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('ry-menu-item is-active')
    expect(disabledElement).toHaveClass('ry-menu-item ry-menu-item-disabled')
  });

  it('click items should change active and call right cb', () => {
    const thirdItem = wrapper.getByText('ryui');
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('ry-menu-vertical');
  });

  it('show show dropdown items when hover on subMenu', async () => {
    const dropdownElement = wrapper.getByText('dropdown');
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
})