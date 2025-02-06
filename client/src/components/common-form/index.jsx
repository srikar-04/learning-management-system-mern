import React from 'react'
import { Button } from '../ui/button'
import FormControls from './form-controls'

function CommonForm({handleSubmit, buttonText = 'submit', formControls = [], formData, setFormData}) {
  return (
   <form onSubmit={handleSubmit} >
    {/* render form controls here */}
    <FormControls formControls={formControls} formData = {formData} setFormData={setFormData} />
    <Button type="submit">{buttonText}</Button>
   </form>
  )
}

export default CommonForm