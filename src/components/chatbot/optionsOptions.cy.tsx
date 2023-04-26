import React from 'react'
import Options from './options'

describe('<Options />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Options />)
  })
})