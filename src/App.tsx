import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Button, Stack } from "react-bootstrap"
import "./App.css"
import { useStore } from "./hooks/useStore"
import { AUTO_LANGUAGE, SPEAKER_VOICE } from "./constants"
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from "./components/Icons"
import { LanguageSelector } from "./components/LanguageSelector"
import { SectionType } from "./types.d"
import { TextArea } from "./components/TextArea"
import { useEffect } from "react"

function App() {
  const {
    loading,
    fromText,
    result,
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore()

  useEffect(() => {
    if (fromText === "") return

    // Here is be the logic to translate the text
    // translate({ fromLanguage, toLanguage, text: fromText })
    //   .then((result) => {
    //     if (result == null) return
    //     setResult(result)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }, [fromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = SPEAKER_VOICE[toLanguage]
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => interchangeLanguages()}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Button variant="link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
