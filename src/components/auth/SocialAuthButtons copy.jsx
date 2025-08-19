// src/components/auth/SocialAuthButtons.jsx
import Button from '../common/Button'

const providers = [
    {
        name: 'Google',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.158-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z" />
            </svg>
        ),
        color: 'bg-red-600 hover:bg-red-700'
    },
    {
        name: 'Facebook',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-0.732 0-1.325 0.593-1.325 1.325v21.351c0 0.731 0.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12v9.293h6.116c0.73 0 1.323-0.593 1.323-1.325v-21.35c0-0.732-0.593-1.325-1.325-1.325z" />
            </svg>
        ),
        color: 'bg-blue-600 hover:bg-blue-700'
    }
]

function SocialAuthButtons() {
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                {providers.map((provider) => (
                    <Button
                        key={provider.name}
                        variant="outline"
                        className={`flex items-center justify-center ${provider.color}`}
                    >
                        <span className="mr-2">{provider.icon}</span>
                        {provider.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default SocialAuthButtons