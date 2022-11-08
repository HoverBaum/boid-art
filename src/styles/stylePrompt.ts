export const stylePrompt = (prompt: string, style?: string) => {
  if (!style) return prompt
  let promptStyle = style
  if (!/{prompt}/.test(promptStyle)) {
    promptStyle = `{prompt}, ${promptStyle}`
  }
  const styledPrompt = promptStyle.replace(/{prompt}/g, prompt)
  return styledPrompt
}
