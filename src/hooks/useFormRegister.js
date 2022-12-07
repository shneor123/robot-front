import { useEffect, useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useFormRegister = (initialState, callBack) => {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        if (callBack) callBack(fields)
    }, [fields])

    const handleChange = ({ target }) => {

        let value = target.value
        const field = target.name
        if (field === 'labels') value = Array.from(target.selectedOptions).map(option => option.value)
        if (field === 'inStock') value = value === 'all' ? 'all' : value === 'true' 

        switch (target.type) {
            case 'number':
                value = +target.value || ''
                break;
            case 'button':
                value = target.checked
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break
        }
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    const register = (field, type = '', value) => { // value only used when type === 'radio'
        const inputProp = {
            onChange: handleChange,
            name: field,
            id: field,
            value: fields[field],
            type
        }
        if (type === 'checkbox') inputProp.checked = fields[field]
        if (type === 'button') inputProp.value = value
        if (type === 'button') inputProp.value = value

        if (type === 'radio') {
            inputProp.value = value
            inputProp.id = value
            inputProp.checked = fields[field] === value
        }
        return inputProp
    }

    return [register, setFields, fields]

}