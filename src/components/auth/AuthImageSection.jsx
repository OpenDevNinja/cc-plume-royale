//src/components/auth/AuthImageSection.jsx

import React from 'react';

const AuthImageSection = () => {
    return (
        <div className="lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-12">
            <div className="text-white text-center max-w-lg">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Education"
                    className="rounded-lg shadow-xl mb-8 mx-auto"
                />
                <h3 className="text-3xl font-bold mb-4">Bienvenue sur notre plateforme</h3>
                <p className="text-lg opacity-90">
                    Rejoignez notre communauté éducative et offrez à vos enfants les meilleures ressources
                    pour leur apprentissage et développement.
                </p>
            </div>
        </div>
    );
};

export default AuthImageSection;