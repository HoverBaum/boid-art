import { ComponentType, PropsWithChildren } from 'react'

export const Info: ComponentType<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-violet-700 bg-violet-100 rounded-lg"
      role="alert"
    >
      {children}
    </div>
  )
}
