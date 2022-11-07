import { StaticImageData } from 'next/image'

export type StyleImage = {
  styleId: string
  image: StaticImageData
  prompt: string
}

export const styleImages: StyleImage[] = [
  {
    styleId: 'default',
    image: require('./images/default.png'),
    prompt: 'a purple unicorn',
  },
  {
    styleId: 'picasso',
    image: require('./images/picasso-1.png'),
    prompt: 'a diverse group of people',
  },
  {
    styleId: 'picasso',
    image: require('./images/picasso-2.png'),
    prompt: 'the worlds tallest skyscraper growing wider at the top',
  },
  {
    styleId: 'picasso',
    image: require('./images/picasso-3.png'),
    prompt: 'Daft Punk on stage',
  },
  {
    styleId: 'picasso',
    image: require('./images/picasso-4.png'),
    prompt: 'a purple unicorn',
  },
  {
    styleId: 'picasso',
    image: require('./images/picasso-5.png'),
    prompt: 'a Pathway in the wood with dappled light',
  },
  {
    styleId: 'picasso',
    image: require('./images/picasso-6.png'),
    prompt: 'Chromatic goddess of colors',
  },
  {
    styleId: 'goldenHourRender',
    image: require('./images/golden-hour-1.png'),
    prompt: 'beautiful sunset over the ocean',
  },
  {
    styleId: 'goldenHourRender',
    image: require('./images/golden-hour-2.png'),
    prompt: 'mountain terrain',
  },
  {
    styleId: 'goldenHourRender',
    image: require('./images/golden-hour-3.png'),
    prompt: 'sprawling green meadow with flowers',
  },
  {
    styleId: 'goldenHourRender',
    image: require('./images/golden-hour-4.png'),
    prompt: 'a purple unicorn',
  },
  {
    styleId: 'goldenHourRender',
    image: require('./images/golden-hour-5.png'),
    prompt: 'a Pathway in the wood with dappled light',
  },
  {
    styleId: 'goldenHourRender',
    image: require('./images/golden-hour-6.png'),
    prompt: 'Chromatic goddess of colors',
  },
  {
    styleId: 'cyberpunkMatteGhibli',
    image: require('./images/ghibli-cyberpunk-1.png'),
    prompt: 'ramen stall in a city square',
  },
  {
    styleId: 'cyberpunkMatteGhibli',
    image: require('./images/ghibli-cyberpunk-2.png'),
    prompt: 'city with neon purple lit advertisements',
  },
  {
    styleId: 'cyberpunkMatteGhibli',
    image: require('./images/ghibli-cyberpunk-3.png'),
    prompt: 'rainbow robot mecha portrait',
  },
  {
    styleId: 'cyberpunkMatteGhibli',
    image: require('./images/ghibli-cyberpunk-4.png'),
    prompt: 'a purple unicorn',
  },
  {
    styleId: 'cyberpunkMatteGhibli',
    image: require('./images/ghibli-cyberpunk-5.png'),
    prompt: 'a Pathway in the wood with dappled light',
  },
  {
    styleId: 'cyberpunkMatteGhibli',
    image: require('./images/ghibli-cyberpunk-6.png'),
    prompt: 'Chromatic goddess of colors',
  },
  {
    styleId: 'conceptArt',
    image: require('./images/concept-art-1.png'),
    prompt: 'a tribal warrior',
  },
  {
    styleId: 'conceptArt',
    image: require('./images/concept-art-2.png'),
    prompt: 'fantasy monster ready to fight',
  },
  {
    styleId: 'conceptArt',
    image: require('./images/concept-art-3.png'),
    prompt: 'meadieval fantasy town square',
  },
  {
    styleId: 'conceptArt',
    image: require('./images/concept-art-4.png'),
    prompt: 'a purple unicorn',
  },
  {
    styleId: 'conceptArt',
    image: require('./images/concept-art-5.png'),
    prompt: 'a Pathway in the wood with dappled light',
  },
  {
    styleId: 'conceptArt',
    image: require('./images/concept-art-6.png'),
    prompt: 'Chromatic goddess of colors',
  },
]
