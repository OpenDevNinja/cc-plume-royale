// src/components/auth/SocialAuthButtons.jsx
import Button from '../common/Button'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'

const SocialAuthButtons = ({ onGoogleClick, onFacebookClick, onAppleClick }) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-3">
            {onGoogleClick && (
                <Button
                    variant="outline"
                    onClick={onGoogleClick}
                    className="flex items-center justify-center"
                >
                    <FaGoogle className="mr-2" />
                    Continuer avec Google
                </Button>
            )}
            {onFacebookClick && (
                <Button
                    variant="outline"
                    onClick={onFacebookClick}
                    className="flex items-center justify-center"
                >
                    <FaFacebook className="mr-2" />
                    Continuer avec Facebook
                </Button>
            )}
            {onAppleClick && (
                <Button
                    variant="outline"
                    onClick={onAppleClick}
                    className="flex items-center justify-center"
                >
                    <FaApple className="mr-2" />
                    Continuer avec Apple
                </Button>
            )}
        </div>
    )
}

export default SocialAuthButtons