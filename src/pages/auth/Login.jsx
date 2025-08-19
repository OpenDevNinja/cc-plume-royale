import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthLayout from '../../components/layout/AuthLayout';
import ErrorMessage from '../../components/common/ErrorMessage';

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(credentials);
            if (!result.success) {
                setError(result.message || 'Email ou mot de passe incorrect');
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Connexion à votre compte"
            subtitle="Entrez vos identifiants pour accéder à votre espace"
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}

                <Input
                    label="Adresse email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={credentials.email}
                    onChange={handleChange}
                />

                <PasswordInput
                    label="Mot de passe"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Se souvenir de moi
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link
                            to={ROUTES.FORGOT_PASSWORD}
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                    >
                        Se connecter
                    </Button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Pas encore de compte ?</span>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={() => navigate(ROUTES.REGISTER)}
                    >
                        Créer un compte
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Login;