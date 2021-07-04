import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';

// 测试用例 it和test是一样的
describe('test Button component', () => {
  it('should render in the correct default button', () => {
    const wrapper = render(<Button>nice</Button>);
    const element = wrapper.getByText('nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
  })
  it('should render in the correct component base on different props', () => {
    
  })
  it('should render a link when btnType equals link and href is provided', () => {
    
  })
  it('should render disabled button when disabled set to true', () => {
    
  })
})