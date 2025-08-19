import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import AuthLayout from '../../components/layout/AuthLayout';
import ErrorMessage from '../../components/common/ErrorMessage';
import { forgotPassword } from '../../api/auth';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await forgotPassword({ email });
            if (response.success) {
                setSuccess('Un email de réinitialisation a été envoyé à votre adresse');
            } else {
                setError(response.message || "Erreur lors de l'envoi de l'email");
            }
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
            console.error('Forgot password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Mot de passe oublié ?"
            subtitle="Entrez votre email pour recevoir un lien de réinitialisation"
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

                <Input
                    label="Adresse email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                    >
                        Envoyer le lien
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

export default ForgotPassword;