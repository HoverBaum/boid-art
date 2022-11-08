import tap from 'tap'
import { stylePrompt } from './stylePrompt'

tap.test('Applying styles to a prompt', (t) => {
  const prompt = 'a purple unicorn'
  const picassoStyle = 'by Pablo Picasso'
  const replacedPromptStyle = 'Matte painting of {prompt} by Studio Ghibli'
  const multipleReplaceStyle =
    'Matte painting of {prompt} and {prompt} by Studio Ghibli'

  t.equal(
    stylePrompt(prompt, picassoStyle),
    'a purple unicorn, by Pablo Picasso',
    'With no {prompt} the style gets appended.'
  )
  t.equal(
    stylePrompt(prompt, replacedPromptStyle),
    'Matte painting of a purple unicorn by Studio Ghibli',
    '{prompt} in the style gets replaced with the prompt.'
  )

  t.equal(
    stylePrompt(prompt, multipleReplaceStyle),
    'Matte painting of a purple unicorn and a purple unicorn by Studio Ghibli',
    'Multiple {prompt} in the style get replaced with the prompt.'
  )

  t.equal(stylePrompt(prompt), prompt, 'No style returns the prompt.')
  t.equal(stylePrompt(prompt, ''), prompt, 'Empty style return the prompt.')
  t.end()
})
