import styled from 'styled-components'

export const App = styled.main`
  width: 350px;
  margin: auto;
  margin-top: 50px;
  background: #ffffff;
  box-shadow: -2px 7px 7px rgba(0, 0, 0, 0.1);
`

export const H1 = styled.h1`
  font-size: 19.33px;
  color: #ffffff;
  text-shadow: 0 5px 19px rgba(0, 0, 0, 0.27);
  position: absolute;
  margin: 46px 23px;
  max-width: 150px;
  text-transform: uppercase;
`

export const Subtitle = styled.span`
  font-size: 13px;
  color: #cdcdcd;
  line-height: 13px;
  margin-bottom: 8px;
  text-transform: uppercase;
  display: block;
`

export const Text = styled.p`
  font-size: 16px;
  color: #545454;
  line-height: 24px;

  a {
    color: #545454;
  }
`

export const Button = styled.button`
  font-size: 16px;
  color: #545454;
  line-height: 24px;
  appearance: none;
  background: transparent;
  border: none;
  text-align: left;
  padding: 0;
  text-decoration: underline;
`

export const Section = styled.section`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`

export const List = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 5px;
  }
`

export const Maps = styled.img`
  margin-top: -7px;
  display: block;
`

export const Link = styled.img`
  height: 18px;
  margin-top: -5px;
  display: block;
`
