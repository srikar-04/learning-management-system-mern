import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SelectContent } from '@radix-ui/react-select';

function FormControls({formControls = [], formData, setFormData}) {

    const renderComponentByType = (getControlItem) => {
        let element = null;

        switch (getControlItem.componentType) {
            case 'input':
                element = (<Input
                        id={getControlItem.name}
                        name = {getControlItem.name}
                        placeholder= {getControlItem.placeholder}
                        type= {getControlItem.type}
                    />)
                break;
        
            case 'select':
                element = (<Select>
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
                    />)
                break;
        
            default:
                element = (<Input
                        id={getControlItem.name}
                        name = {getControlItem.name}
                        placeholder= {getControlItem.placeholder}
                        type= {getControlItem.type}
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