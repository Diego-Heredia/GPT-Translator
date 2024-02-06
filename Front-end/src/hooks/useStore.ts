import { useReducer } from 'react'
import {
  type Language,
  type Action,
  type translationState,
  type FromLanguage
} from '../types.d'

const initialState: translationState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer(state: translationState, action: Action) {
  const { type } = action
  switch (type) {
    case 'INTERCHANGE_LANGUAGES':
      if (state.fromLanguage === 'auto') return state
      const loadingInterchange = state.fromText !== ''
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        result: '',
        loading: loadingInterchange,
        fromText: state.result,
        toText: state.fromText
      }
    case 'SET_FROM_LANGUAGE':
      if(state.fromLanguage === action.payload) return state
      const loadingFrom = state.fromText !== ''
      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading: loadingFrom
      }
    case 'SET_TO_LANGUAGE':
      if(state.toLanguage === action.payload) return state
      const loadingTo = state.fromText !== ''
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading: loadingTo
      }
    case 'SET_FROM_TEXT':
      return {
        ...state,
        loading: true,
        fromText: action.payload,
        result: ''
      }
    case 'SET_RESULT':
      return {
        ...state,
        loading: false,
        result: action.payload
      }
    default:
      return state
  }
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }
  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
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
  }
}
