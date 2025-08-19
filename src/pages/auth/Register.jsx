import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthLayout from '../../components/layout/AuthLayout';
import ErrorMessage from '../../components/common/ErrorMessage';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            const { confirmPassword, ...userData } = formData;
            const result = await register(userData);

            if (result.success) {
                navigate('/auth/verify-email', { state: { email: formData.email } });
            } else {
                setError(result.message || "Erreur lors de l'inscription");
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Créer un nouveau compte"
            subtitle="Remplissez le formulaire pour vous inscrire"
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        label="Prénom"
                        id="first_name"
                        name="first_name"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Nom"
                        id="last_name"
                        name="last_name"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>

                <Input
                    label="Adresse email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    label="Téléphone"
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <PasswordInput
                    label="Mot de passe"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <PasswordInput
                    label="Confirmer le mot de passe"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <div className="flex items-center">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        required
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        J'accepte les <a href="#" className="text-primary-600 hover:text-primary-500">conditions d'utilisation</a>
                    </label>
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                    >
                        S'inscrire
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

export default Register;