import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthLayout from '../../components/layout/AuthLayout';
import ErrorMessage from '../../components/common/ErrorMessage';
import { resetPassword } from '../../api/auth';

function ResetPassword() {
    const { token } = useParams();
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (passwords.password !== passwords.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            const response = await resetPassword({
                token,
                password: passwords.password
            });

            if (response.success) {
                setSuccess('Votre mot de passe a été réinitialisé avec succès');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(response.message || "Erreur lors de la réinitialisation");
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
            console.error('Reset password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Réinitialiser votre mot de passe"
            subtitle="Choisissez un nouveau mot de passe sécurisé"
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                {success && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{success}</p>
                            </div>
                        </div>
                    </div>
                )}

                <PasswordInput
                    label="Nouveau mot de passe"
                    id="password"
                    name="password"
                    value={passwords.password}
                    onChange={handleChange}
                    required
                />

                <PasswordInput
                    label="Confirmer le nouveau mot de passe"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                    >
                        Réinitialiser le mot de passe
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

export default ResetPassword;