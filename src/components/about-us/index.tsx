import React from 'react'

type Props = {}

const AboutUsSection = (props: Props) => {
  return (
    <div className='h-screen bg-primary-dark flex justify-center' id='about-us'>
      <h2 className='text-primary-yellow text-6xl'>About us</h2>
      <div>
        <h3>What is Satisfia?</h3>
      </div>
    </div>
  )
}

export default AboutUsSection