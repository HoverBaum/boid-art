import { ComponentType, PropsWithChildren } from 'react'

export const Container: ComponentType<PropsWithChildren> = ({ children }) => {
  return <div className="max-w-3xl mx-auto">{children}</div>
}
