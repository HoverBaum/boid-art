import { ComponentType, PropsWithChildren } from 'react'

export const Container: ComponentType<PropsWithChildren> = ({ children }) => {
  return <div className="max-w-2xl mx-auto">{children}</div>
}
