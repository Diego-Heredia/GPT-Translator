import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}
const commonStyle = { minHeight: '200px', border: 0, resize: 'none' as 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.FROM) return 'Introducir texto'
    if (loading === true) return 'Traduciendo...'
    return 'Traducción'
}
export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === SectionType.FROM ? commonStyle : { ...commonStyle, backgroundColor: '#f5f5f5' }
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)
    return (
        <Form.Control
            autoFocus={type === SectionType.FROM}
            as="textarea"
            disabled={type === SectionType.TO}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}
