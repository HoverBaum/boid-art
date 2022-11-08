import { StyleType } from './types'
import defaultImage from './images/default.png'
import picassoImage from './images/picasso-4.png'
import goldenHourImage from './images/golden-hour-4.png'
import ghibliCyberpunkImage from './images/ghibli-cyberpunk-4.png'
import conceptArtImage from './images/concept-art-4.png'

export const styles: StyleType[] = [
  {
    style: '',
    id: 'default',
    name: 'No style',
    description: 'The default style, no special effects.',
    image: defaultImage,
  },
  {
    style: 'by Pablo Picasso',
    id: 'picasso',
    name: 'Picasso',
    description: 'Like a painting by Pablo Picasso.',
    image: picassoImage,
  },
  {
    style:
      'golden hour, dream - like mysterious atmosphere, in the wastelands, baroque landscape painting, perfect composition, beautiful detailed intricate insanely detailed octane render trending on artstation, 8 k artistic photography, photorealistic, soft natural volumetric cinematic perfect light, chiaroscuro, award - winning photograph, masterpiece, raphael, caravaggio, greg rutkowski, beeple, beksinski',
    id: 'goldenHourRender',
    name: 'Golden Hour',
    description:
      'A mix of a CGI render and classical fantasy illustration. Lends itself well to landscapes.',
    image: goldenHourImage,
  },
  {
    style:
      'A highly detailed matte painting of {prompt} by Studio Ghibli, Makoto Shinkai, by Artgerm, by WLOP, by Greg Rutkowski, volumetric lighting, octane render, 4K resolution, trending on artstation, masterpiece, cyberpunk',
    id: 'cyberpunkMatteGhibli',
    name: 'Cyberpunk',
    description:
      'Cyberpunk inspired art that Studio Ghibli might use for backgorunds in their animes.',
    image: ghibliCyberpunkImage,
  },
  {
    style:
      'dramatic lighting, illustration by greg rutkowski, yoji shinkawa, 4k, digital art, concept art, trending on artstation',
    id: 'conceptArt',
    name: 'Concept Art',
    description: 'A concept art style that will give you rougher forms.',
    image: conceptArtImage,
  },
]
