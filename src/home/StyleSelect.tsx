import { ComponentType } from 'react'
import { styles } from '../styles'

type StyleSelectProps = {
  onStyleChange: (styleId: string) => void
}

export const StyleSelect: ComponentType<StyleSelectProps> = ({
  onStyleChange,
}) => {
  return (
    <>
      {styles.map(({ id, name }) => (
        <div className="flex items-center mb-4" key={id}>
          <input
            id={`styleSelect-${id}`}
            type="radio"
            name="style-select"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => onStyleChange(id)}
          />
          <label
            htmlFor={`styleSelect-${id}`}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {name}
          </label>
        </div>
      ))}
    </>
  )
}
