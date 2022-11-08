import { ComponentType, PropsWithChildren } from 'react'

type ContainerProps = {
  wide?: boolean
}

export const Container: ComponentType<PropsWithChildren<ContainerProps>> = ({
  children,
  wide = false,
}) => {
  return (
    <div className={`${wide ? 'max-w-4xl' : 'max-w-2xl'} mx-auto`}>
      {children}
    </div>
  )
}
