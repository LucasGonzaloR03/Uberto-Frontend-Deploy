import { MoonLoader } from "react-spinners"

interface SpinnerProps {
    color?: string,
    size?: number,
    isLoading: boolean
}

export function Spinner({ color, size, isLoading }: SpinnerProps) {
    if (!isLoading) return null;

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
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
        }}>
            <MoonLoader
                color={color || '#4e199e'}
                size={size || 50}
                loading={isLoading}
            />
        </div>
    )
}
