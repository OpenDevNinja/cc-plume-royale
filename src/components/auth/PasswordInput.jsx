import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '../common/Input';

const PasswordInput = ({ label, id, name, value, onChange, error, required = false }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                label={label}
                id={id}
                name={name}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                required={required}
                error={error}
            />
            <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
        </div>
    );
};

export default PasswordInput;