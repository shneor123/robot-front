import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useForm = (initialFields, cb) => {

    const [fields, setFields] = useState(initialFields)

    const handleChange = ({ target }) => {
        let value = target.type === 'number' ? (+target.value || '') : target.value
        const field = target.name
        if (field === 'inStock') value = value === 'all' ? 'all' : value === 'true'
        if (field === 'price') value = +value
        if (field === 'labels') value = Array.from(target.selectedOptions).map(option => option.value)

        if (field === 'labels') {
            let updatedLabels = [...value.labels]
            if (updatedLabels.includes(value)) updatedLabels = updatedLabels.filter(label => label !== value)
            else updatedLabels.push(value)
            value = updatedLabels.sort()
        }
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    useEffectUpdate(() => {
        if (cb) cb(fields)

    }, [fields])

    // if(cb) cb()
    return [
        fields,
        handleChange,
        setFields
    ]
}
