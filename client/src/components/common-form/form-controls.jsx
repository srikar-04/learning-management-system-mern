import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SelectContent } from '@radix-ui/react-select';

function FormControls({formControls = [], formData, setFormData}) {

    const renderComponentByType = (getControlItem) => {
        let element = null;
        let value = formData[getControlItem.name] || ''

        switch (getControlItem.componentType) {
            case 'input':
                element = (<Input
                        id={getControlItem.name}
                        name = {getControlItem.name}
                        placeholder= {getControlItem.placeholder}
                        type= {getControlItem.type}
                        value = {value}
                        onChange = {(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />)
                break;
        
            case 'select':
                element = (<Select
                value={value}
                    onValueChange={(value) => setFormData({
                        ...formData,
                        [getControlItem.name]: value
                    })}
                >
                    <SelectTrigger className= 'w-full'>
                        <SelectValue placeholder={getControlItem.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem.options.length>0 ? getControlItem.options.map(optionItem => <SelectItem
                                key={optionItem.id}
                                value={optionItem.id}
                            >
                                {optionItem.label}
                            </SelectItem>) : null
                        }
                    </SelectContent>
                </Select>)
                break;
        
            case 'textarea':
                element = (<Textarea
                        id={getControlItem.name}
                        name = {getControlItem.name}
                        placeholder= {getControlItem.placeholder}
                        value = {value}
                        onChange = {(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />)
                break;
        
            default:
                element = (<Input
                        id={getControlItem.name}
                        name = {getControlItem.name}
                        placeholder= {getControlItem.placeholder}
                        type= {getControlItem.type}
                        value = {value}
                        onChange = {(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />)
                break;
        }
        return element
    }

  return (
    <div className='flex flex-col gap-3'>
        {
            formControls.map( controlItem => (
                <div key={controlItem.name}>
                    <Label htmlFor={controlItem.label} >{controlItem.label}</Label>
                    {renderComponentByType(controlItem)}
                </div>
            ) )
        }
    </div>
  )
}

export default FormControls