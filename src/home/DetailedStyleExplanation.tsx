import Image from 'next/image'
import { Container } from '../components/Container'
import { styleImages } from '../styles/styleImages'
import { styles } from '../styles/styles'

export const DetailedStyleExplanation = () => {
  return (
    <div className="p-4">
      <Container wide={true}>
        <h2 className="font-medium text-5xl mb-4">Art Styles</h2>
        <p>
          A great way to get more out of your prompt is to use one of our Art
          Styles. Read on below to learn more about each style.
        </p>
        <p>
          Technically the styles represent a string like "by Pablo Picasso" that
          gets added to your prompt.
        </p>
        <div className="mt-10">
          {styles.map(({ id, name, description }) => (
            <div
              className="my-6 bg-[#232323] p-4 grid grid-cols-4 rounded-2xl"
              key={id}
            >
              <div className="mr-6 col-span-1">
                <h2 className="text-2xl mb-4">{name}</h2>
                <p>{description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full col-span-3">
                {styleImages
                  .filter((image) => image.styleId === id)
                  .map(({ image, prompt, styleId }) => (
                    <figure key={styleId + prompt}>
                      <Image alt={prompt} src={image} className="rounded-2xl" />
                      <figcaption>{prompt}</figcaption>
                    </figure>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
