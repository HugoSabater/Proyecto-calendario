export async function getActividades() {
    const res = await fetch("http://localhost:4000/api/agenda");
    return res.json();
}

export async function crearActividad(data: {
    nombre: string;
    descripcion: string;
    fecha: string;
}) {
    const res = await fetch("http://localhost:4000/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}
