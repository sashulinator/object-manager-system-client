import { Spinner, SpinnerSize } from '@fluentui/react'

import './loading-area.css'

import cx from 'clsx'
import React, { FC } from 'react'

type LoadingAriaProps = {
  loading?: boolean
  top?: string
  children: React.ReactNode
}

const LoadingAria: FC<LoadingAriaProps> = ({ loading, children, top = '77px' }): JSX.Element => {
  return (
    <div className={cx('LoadingAria', loading && 'LoadingAria--loading')}>
      <div className="spinnerContainer" style={{ top }}>
        <Spinner size={SpinnerSize.large} />
      </div>
      <div className="contentContainer">{children}</div>
    </div>
  )
}

export default LoadingAria