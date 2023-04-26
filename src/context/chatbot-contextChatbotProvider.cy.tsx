import React from 'react'
import { ChatbotProvider } from './chatbot-context'

describe('<ChatbotProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatbotProvider />)
  })
})