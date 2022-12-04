import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useFormRegister = (initialState, cb) => {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        if (cb) cb(fields)
    }, [fields])

    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +target.value || ''
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break
        }
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }



    const register = (field, type = '', value) => {
        const inputProp = {
            onChange: handleChange,
            name: field,
            id: field,
            value: fields[field],
            type
        }
        if (type === 'checkbox') inputProp.checked = fields[field]
        if (type === 'radio') {
            inputProp.value = value
            inputProp.id = value
            inputProp.checked = fields[field] === value
        }
        return inputProp
    }
    return [register, setFields, fields]
}