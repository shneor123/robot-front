import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useForm = (initialFields, cb) => {

    const [fields, setFields] = useState(initialFields)

    const handleChange = ({ target }) => {
        let value = target.type === 'number' ? (+target.value || '') : target.value
        const field = target.name
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    useEffectUpdate(() => {
        if (cb) cb(fields)

    }, [fields])

    // if(cb) cb()
    return [
        fields,
        handleChange,
        setFields,
    ]
}


