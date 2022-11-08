import { styles } from './styles'

export const nameForStyleId = (styleId: string) =>
  styles.find((style) => style.id === styleId)?.name
