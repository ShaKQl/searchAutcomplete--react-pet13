import { useState } from 'react'
import './App.css'
import SearchAutocomplete from './components'

function App() {

  const url = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json'

  return (
    <>
    <SearchAutocomplete url={url}/>
    </>
  )
}

export default App
