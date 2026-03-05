import "@testing-library/jest-dom/vitest";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./Login";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/loginService/loginService", () => ({
  loginService: {
    login: vi.fn(),
  },
}));

vi.mock("../../components/logo/logoUberto", () => ({
  __esModule: true,
  default: () => <div data-testid="logo-uberto" />,
}));

vi.mock("../../components/Notificacion/notificacion", () => ({
  __esModule: true,
  Notificacion: ({ mensaje }: { mensaje: string }) => (
    <div data-testid="notificacion">{mensaje}</div>
  ),
}));

describe("Login ", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });
  it("muestra errores si campos estan vacios", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText(/el nombre de usuario y la contraseña están vacíos/i)).toBeInTheDocument();
  });

  it("permite mostrar u ocultar contrasenia", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const toggleButton = screen.getByLabelText(/ocultar contraseña/i);
    fireEvent.click(toggleButton);

    expect(screen.getByLabelText(/mostrar contraseña/i)).toBeInTheDocument();
  });
  
});

