// src/components/common/Toast.jsx
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export const ToastContainer = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#fff',
                    color: '#374151',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    borderRadius: '0.375rem',
                    padding: '1rem'
                }
            }}
        />
    )
}

export const showSuccessToast = (message) => {
    toast.success(message, {
        style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0'
        }
    })
}

export const showErrorToast = (message) => {
    toast.error(message, {
        style: {
            background: '#fef2f2',
            color: '#b91c1c',
            border: '1px solid #fecaca'
        }
    })
}

export const showPromiseToast = (promise, messages) => {
    return toast.promise(promise, messages, {
        style: {
            background: '#eff6ff',
            color: '#1e40af',
            border: '1px solid #bfdbfe'
        }
    })
}