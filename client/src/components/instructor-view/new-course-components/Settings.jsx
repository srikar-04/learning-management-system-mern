import { Label } from '../../../components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card.jsx'
import React from 'react'
import { Input } from '../../../components/ui/input.jsx'

function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-3'>
          <Label>Upload Course Image</Label>
          <Input 
            type='file'
            accept='image/*'
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default Settings