import React from 'react'
import { Button } from '../ui/button'
import FormControls from './form-controls'

function CommonForm({handleSubmit, buttonText = 'submit', formControls = [], formData, setFormData}) {
  return (
   <form onSubmit={handleSubmit} className='w-full' >
    {/* render form controls here */}
    <FormControls formControls={formControls} formData = {formData} setFormData={setFormData} />
    <Button type="submit" className = 'mt-5 w-full'>{buttonText}</Button>
   </form>
  )
}

export default CommonForm