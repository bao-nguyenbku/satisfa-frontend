import DatePicker from "@/components/date-picker"
import React from 'react';

describe('DatePicker.cy.tsx', () => {
  it('should mount', () => {
    cy.mount(<DatePicker value={"12/12/2023"} onChange={()=> { }}/>)
  })
})