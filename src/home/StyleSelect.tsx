import Image from 'next/image'
import { ComponentType, useState } from 'react'
import { styles } from '../styles/styles'

type StyleSelectProps = {
  onStyleChange: (styleId: string) => void
}

export const StyleSelect: ComponentType<StyleSelectProps> = ({
  onStyleChange,
}) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('default')

  const onStyleSelect = (newStyleId: string) => {
    setSelectedStyleId(newStyleId)
    onStyleChange(newStyleId)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 p-4 gap-4">
      {styles.map(({ id, name, image }) => (
        <div
          className={`rounded-lg overflow-hidden relative ${
            selectedStyleId === id ? 'outline' : 'grayscale'
          } hover:grayscale-0 hover:cursor-pointer`}
          key={id}
          onClick={() => onStyleSelect(id)}
        >
          <Image src={image} alt={name} className="object-cover h-12 sm:h-10" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
            {name}
          </span>
        </div>
      ))}
    </div>
  )
}
