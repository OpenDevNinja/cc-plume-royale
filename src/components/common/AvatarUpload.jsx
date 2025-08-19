import React, { useState, useRef } from 'react'
import Button from './Button'
import { FiCamera } from "react-icons/fi";
import { FiX } from "react-icons/fi";
const AvatarUpload = ({
    initialPreview = '',
    onChange,
    size = 'lg',
    editable = true
}) => {
    const [preview, setPreview] = useState(initialPreview)
    const fileInputRef = useRef(null)

    const sizes = {
        sm: 'h-16 w-16',
        md: 'h-24 w-24',
        lg: 'h-32 w-32',
        xl: 'h-40 w-40'
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const result = reader.result
            setPreview(result)
            onChange && onChange(file)
        }
        reader.readAsDataURL(file)
    }

    const handleRemove = () => {
        setPreview('')
        onChange && onChange(null)
    }

    return (
        <div className="relative group">
            <div className={`${sizes[size]} rounded-full overflow-hidden border-2 border-gray-200`}>
                {preview ? (
                    <img
                        src={preview}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">Pas d'image</span>
                    </div>
                )}
            </div>

            {editable && (
                <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            className="rounded-full p-2"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FiCamera className="h-5 w-5" />
                        </Button>
                    </div>

                    {preview && (
                        <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            className="absolute top-0 right-0 rounded-full p-1"
                            onClick={handleRemove}
                        >
                            <FiX className="h-4 w-4" />
                        </Button>
                    )}
                </>
            )}
        </div>
    )
}

export default AvatarUpload