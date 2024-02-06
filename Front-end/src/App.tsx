import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguajeSelector } from './components/LanguajeSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import API_URL from './config/api'
import { useDebounce } from './hooks/useDebounce'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 500)
  const fetchTranslation = async () => {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromLanguage,
        toLanguage,
        text: debouncedFromText
      })
    }
    const response = await fetch(`${API_URL}/translate`, options)
    if (!response.ok) {
      console.log('Error: ', response);
      setResult('Error al traducir')
      return
    }
    const data = await response.json()
    console.log('Data: ', data.translation);

    setResult(data.translation)
  }
  const haddleClipboard = () => {
    if (!result || result.trim() === '') {
      toast.error("No hay texto para copiar", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    navigator.clipboard.writeText(result)
    toast("Texto copiado!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });
  }
  const haddleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }
  useEffect(() => {
    if (debouncedFromText === '') return
    fetchTranslation()

  }, [debouncedFromText, fromLanguage, toLanguage])
  return (
    <Container fluid>
      <h1>GPT Translate</h1>
      <ToastContainer />
      <Row>
        <Col>
          <Stack gap={2}>

            <LanguajeSelector
              type={SectionType.FROM}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.FROM}
              value={fromText}
              onChange={setFromText}
              loading={loading}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguajeSelector
              type={SectionType.TO}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.TO}
                value={result}
                onChange={setResult}
                loading={loading}
              />
              <div style={{ position: 'absolute', left: '0px', bottom: '10px', display: 'flex' }}>
                <Button variant='link'
                  onClick={haddleClipboard}
                >
                  <ClipboardIcon />
                </Button>
                <Button variant='link'
                  onClick={haddleSpeech}
                >
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
