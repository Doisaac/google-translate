import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"
import { type FC, type ChangeEvent } from "react"
import { FromLanguage, type Language } from "../types"

type Props =
  | {
      type: "from"
      value: FromLanguage
      onChange: (language: FromLanguage) => void
    }
  | { type: "to"; value: Language; onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
    <Form.Select
      aria-label="Choose the language"
      onChange={handleChange}
      value={value}
    >
      {type === "from" && <option value={AUTO_LANGUAGE}>Detect idiom</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Select>
  )
}
