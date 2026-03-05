import "@testing-library/jest-dom/vitest";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DatosPasajero from "./DatosPasajero";
import { pasajeroService } from "../../services/PasajeroService";


vi.mock("../../services/usuarioService/usuarioService", () => ({
  obtenerUserID: () => 1,
}));

vi.mock("../../services/usuarioService/pasajeroService", () => ({
  pasajeroService: {
    obtenerDatosPasajero: vi.fn().mockResolvedValue({
      nombre: "Juan",
      apellido: "Pérez",
      telefono: "123456",
      saldo: 100,
      listaAmigos: [
        { id: 1, nombreCompleto: "Carlos Amigo", fotoPerfil: "img1.png" },
      ],
    }),
    updatePasajero: vi.fn(),
    agregarSaldo: vi.fn(),
    agregarAmigo: vi.fn(),
    eliminarAmigo: vi.fn(),
  },
}));

vi.mock("../Tarjetas/TarjetaAmigo", () => ({
  __esModule: true,
  default: ({ eliminar }: { eliminar: () => void }) => (
    <div data-testid="tarjeta-amigo">
      <button data-testid="eliminar-amigo" onClick={eliminar}>Eliminar</button>
    </div>
  ),
}));

vi.mock("../Modales/ModalAgregarAmigo", () => ({
  __esModule: true,
  CardAgregarAmigo: ({ open }: { open: boolean }) => open ? <div data-testid="modal-agregar-amigo" /> : null,
}));

vi.mock("../Notificacion/notificacion", () => ({
  __esModule: true,
  Notificacion: () => <div data-testid="notificacion" />,
}));

describe("DatosPasajero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza un amigo en la lista", async () => {
    render(<DatosPasajero />);

    expect(await screen.findByTestId("tarjeta-amigo")).toBeInTheDocument();
  });

  it("Muestra el modal de agregar amigo al hacer click en el icono", async () => {
    render(<DatosPasajero />);
    const botonAbrirModal = await screen.findByRole("button", { name: "" });

    fireEvent.click(botonAbrirModal);

    expect(await screen.findByTestId("modal-agregar-amigo")).toBeInTheDocument();
  });

  it("Llama al servicio eliminarAmigo al hacer click en eliminar", async () => {
    render(<DatosPasajero />);

    const botonEliminar = await screen.findByTestId("eliminar-amigo");
    fireEvent.click(botonEliminar);

    expect(pasajeroService.deleteAmigo).toHaveBeenCalledWith(1);
  });
});

