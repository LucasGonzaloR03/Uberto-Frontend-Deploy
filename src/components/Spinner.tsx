import { MoonLoader } from "react-spinners"

interface SpinnerProps {
    color?: string,
    size?: string,
    isLoading: boolean
}

export function Spinner({ color, size, isLoading }: SpinnerProps) {
    if (!isLoading) return null; // No renderizamos nada si no está cargando

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Fondo traslúcido
            backdropFilter: 'blur(5px)', // El efecto de desenfoque
            zIndex: 9999, // Asegura que esté por encima de todo
        }}>
            <MoonLoader
                color={color || '#4e199e'}
                size={size || '50px'}
                loading={isLoading}
            />
        </div>
    )
}