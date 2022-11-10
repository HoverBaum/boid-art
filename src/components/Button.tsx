import { ComponentType, PropsWithChildren } from 'react'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  type?: 'primary' | 'secondary'
}

export const Button: ComponentType<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  disabled = false,
  type = 'primary',
}) => {
  if (type === 'secondary') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="text-blac bg-inherit hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 border-gray-50 border-2"
      >
        {children}
      </button>
    )
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="text-black font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 bg-gray-50 hover:bg-gray-200 border-2"
    >
      {children}
    </button>
  )
}
