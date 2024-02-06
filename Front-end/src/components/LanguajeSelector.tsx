import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
| { type: SectionType.FROM, value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: SectionType.TO, value: Language, onChange: (language: Language) => void }

export const LanguajeSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
    <Form.Select aria-label="Selecciona el idioma" value={value} onChange={handleChange} >
        {type === SectionType.FROM && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
