// 2. pages/auth/VerifyEmail.jsx - Correction du composant
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layout/AuthLayout';
import ErrorMessage from '../../components/common/ErrorMessage';
import { verifyEmail } from '../../api/auth';

function VerifyEmail() {
    const { token } = useParams();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setError('Token de vérification manquant');
                setIsLoading(false);
                return;
            }

            try {
                // CORRECTION: Passer directement le token
                const response = await verifyEmail(token);
                if (response.success) {
                    setIsVerified(true);
                } else {
                    setError(response.message || "Erreur lors de la vérification");
                }
            } catch (err) {
                console.error('Verify email error:', err);

                // CORRECTION: Meilleure gestion des erreurs
                const errorMessage = err.response?.data?.message ||
                    err.message ||
                    'Une erreur est survenue. Veuillez réessayer.';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    return (
        <AuthLayout
            title="Vérification de l'email"
            subtitle={isVerified ? "Votre email a été vérifié avec succès" : "Vérification en cours..."}
        >
            <div className="mt-8 space-y-6 text-center">
                {isLoading && (
                    <div className="py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2">Vérification en cours...</p>
                    </div>
                )}

                {error && <ErrorMessage message={error} />}

                {isVerified && (
                    <>
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex justify-center">
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                onClick={() => navigate('/auth/login')}
                            >
                                Se connecter
                            </Button>
                        </div>
                    </>
                )}

                {/* AJOUT: Bouton pour renvoyer l'email si erreur */}
                {error && !isLoading && (
                    <div className="mt-4">
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/auth/login')}
                        >
                            Retour à la connexion
                        </Button>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}

export default VerifyEmail;
