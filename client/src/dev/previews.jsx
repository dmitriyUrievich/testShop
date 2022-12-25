import React from 'react'
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox'
import { PaletteTree } from './palette'
import Product from '../app/components/product'

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/Product">
        <Product/>
      </ComponentPreview>
      <ComponentPreview path="/SelectField">
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews
