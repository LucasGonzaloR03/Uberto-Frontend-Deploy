import "@testing-library/jest-dom/vitest";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PerfilUsuario from "./PerfilDeUsuario";

vi.mock("../../components/fotoDePerfil/fotoDePerfil", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-foto-de-perfil">
      <button data-testid="boton-subir-foto">Subir Foto</button>
    </div>
  ),
}));

vi.mock("../../components/Pestanias/Pestanias", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-pestanias">
      <button data-testid="tab-1">Tab 1</button>
      <button data-testid="tab-2">Tab 2</button>
    </div>
  ),
}));

describe("PerfilUsuario", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza correctamente la vista de perfil de usuario", () => {
    render(
      <MemoryRouter>
        <PerfilUsuario />
      </MemoryRouter>
    );

    expect(screen.getByTestId("mock-foto-de-perfil")).toBeInTheDocument();
    expect(screen.getByTestId("mock-pestanias")).toBeInTheDocument();
  });

  it("Permite simular la acción de subir una foto", () => {
    render(
      <MemoryRouter>
        <PerfilUsuario />
      </MemoryRouter>
    );

    const botonSubir = screen.getByTestId("boton-subir-foto");
    expect(botonSubir).toBeInTheDocument();

    fireEvent.click(botonSubir);
  });

  it("Simula navegacion entre pestanias", () => {
    render(
      <MemoryRouter>
        <PerfilUsuario />
      </MemoryRouter>
    );

    const tab1 = screen.getByTestId("tab-1");
    const tab2 = screen.getByTestId("tab-2");

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();

    fireEvent.click(tab1);
    fireEvent.click(tab2);
  });
});
