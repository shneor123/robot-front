import {  useState } from "react"
import { useEffectUpdate } from './useEffectUpdate';

export const useFormRegister = (initialFields, cb) => {

    const [fields, setFields] = useState(initialFields)

    const handleChange = ({ target }) => {
        let value = target.type === 'number' ? (+target.value || '') : target.value
        const field = target.name
        if (field === 'inStock') value = value === 'yes'
        if (field === 'price') value = +value
        if (field === 'labels') value = Array.from(target.selectedOptions).map(option => option.value)
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    useEffectUpdate(() => {
        if (cb) cb(fields)
    }, [fields])

    const register = (field, type = 'text') => {
        return {
            onChange: handleChange,
            type,
            id: field,
            name: field,
            value: fields[field]
        }
    }

    return [
        register
    ]
}