import Image from 'next/image'
import { ComponentType, useState } from 'react'
import { styles } from '../styles'

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
    <div className={`grid grid-cols-${styles.length} p-4`}>
      {styles.map(({ id, name, image }) => (
        <div
          className={`w-32 ${
            selectedStyleId === id ? 'outline-violet-500 outline' : 'grayscale'
          } hover:grayscale-0 hover:cursor-pointer`}
          key={id}
          onClick={() => onStyleSelect(id)}
        >
          <Image src={image} alt={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  )
}
