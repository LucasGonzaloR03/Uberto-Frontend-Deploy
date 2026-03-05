import React from 'react';

interface BotonPrincipalProps {
    text: string;
}

const BotonPrincipal: React.FC<BotonPrincipalProps> = ({ text }) => {
    return (
        <button>
            {text}
        </button>
    );
};

export default BotonPrincipal;
