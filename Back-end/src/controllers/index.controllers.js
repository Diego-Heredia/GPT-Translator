import { translateText } from '../services/translate.service.js'
export const index = (req, res) => {
  res.json({ message: 'Welcome to my application' })
}
export const translateGPT = async (req, res) => {
  const { fromLanguage, toLanguage, text } = req.body
  if (!fromLanguage || !toLanguage || !text) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  try {
    const translation = await translateText(fromLanguage, toLanguage, text)
    res.json({ translation })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
