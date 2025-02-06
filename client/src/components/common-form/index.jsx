import React from 'react'
import { Button } from '../ui/button'
import FormControls from './form-controls'

function CommonForm({handleSubmit, buttonText = 'submit', formControls = [], formData, setFormData, isButtonDisabled = false}) {
  return (
   <form onSubmit={handleSubmit} className='w-full' >
    {/* render form controls here */}
    <FormControls formControls={formControls} formData = {formData} setFormData={setFormData} />
    <Button disabled = {isButtonDisabled} type="submit" className = 'mt-5 w-full'>{buttonText}</Button>
   </form>
  )
}

export default CommonForm