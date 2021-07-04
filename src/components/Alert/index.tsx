import React, { FC, useState, useRef } from 'react';
import classNames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import { Transition, TransitionStatus } from 'react-transition-group'

export enum AlertType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  // type?: AlertType;
  closable?: boolean;
  closeText?: React.ReactNode;
  message: React.ReactNode;
  description?: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  afterClose?: () => void;
  showIcon?: boolean;
  role?: string;
  style?: React.CSSProperties;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const duration = 300;
const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  padding: '8px 15px',
}
type TStyles<T extends keyof any> = {
  [P in T]?: React.CSSProperties
}
const transitionStyles: TStyles<TransitionStatus> = {
  entering: { opacity: 1, height: 'auto' },
  entered:  { opacity: 1, height: 'auto' },
  exiting:  { opacity: 0, height: 'auto' },
  exited:  { opacity: 0, height: 0 },
  unmounted: { opacity: 0, height: 0 }
}

const Alert: FC<AlertProps> = ({
  type = AlertType.Info,
  description,
  message,
  className,
  style,
  showIcon,
  closable,
  ...props
}) => {
  const [closed, setClosed] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    setClosed(true);
    props.onClose?.(e)
  }
  const classes = classNames('ry-alert', {
    [`ry-alert-${type}`]: type,
    'ry-alert-closable': closable,
    'ry-alert-icon': showIcon,
    className
  })
  return (
    <div>
      <Transition
        in={!closed}
        timeout={duration}
        nodeRef={nodeRef}
        unmountOnExit={true}
      >
        {(state: TransitionStatus) => (
          <div
            style={{
              position: 'relative',
              ...defaultStyle,
              ...transitionStyles![state]
            }}
            ref={nodeRef}
            className={classes}
          >
            <div>
              {!!message && <div>{message}</div>}
              {!!description && <div>{description}</div>}
            </div>
            <div className='ry-alert-close' onClick={handleClose}>
              {closable && <CloseOutlined style={{fontSize: 12}} />}
            </div>
          </div>
        )}
      </Transition>
    </div>

  )
}

export default Alert;