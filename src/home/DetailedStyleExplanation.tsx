import Image from 'next/image'
import { styleImages } from '../styles/styleImages'
import { styles } from '../styles/styles'

export const DetailedStyleExplanation = () => {
  return (
    <div>
      <h2>Art Styles</h2>
      <p>
        A great way to get more out of your prompt is to use one of our Art
        Styles. Read on below to learn more about each style.
      </p>
      <p>
        Technically the styles represent a string like "by Pablo Picasso" that
        gets added to your prompt.
      </p>
      {styles.map(({ id, name, description }) => (
        <div className="my-6" key={id}>
          <h2>{name}</h2>
          <p>{description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full sm:w-1/2">
            {styleImages
              .filter((image) => image.styleId === id)
              .map(({ image, prompt, styleId }) => (
                <figure key={styleId + prompt}>
                  <Image alt={prompt} src={image} />
                  <figcaption>{prompt}</figcaption>
                </figure>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
