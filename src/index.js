import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'reset.css'
import Main from './Main'

const Global = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700');
  ${reset}

    body {
      background: #F6F6F6;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: #545454;
      line-height: 1.2;
    }


    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: rgba(255,255, 255, 0.7);
}
::-moz-placeholder { /* Firefox 19+ */
  color: rgba(255,255, 255, 0.7);
}
:-ms-input-placeholder { /* IE 10+ */
  color: rgba(255,255, 255, 0.7);
}
:-moz-placeholder { /* Firefox 18- */
  color: rgba(255,255, 255, 0.7);
}
`

function App() {
  return (
    <>
      <Main />
      <Global />
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
