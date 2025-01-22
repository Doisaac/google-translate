import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"
import { FC } from "react"

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  autoFocus?: boolean
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: "200px", resize: "none" }

const getPlaceHolder = ({
  type,
  loading,
}: {
  type: SectionType
  loading?: boolean
}) => {
  if (type === SectionType.From) return "Enter text"
  if (type === SectionType.To && loading) return "Translating..."
  return "Translation"
}

export const TextArea: FC<Props> = ({ loading, type, value, onChange }) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      disabled={type === SectionType.To}
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}
