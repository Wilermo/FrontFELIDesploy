"use client"

import Link from "next/link";
import { useState } from "react";

async function createUser(data: FormData) {
    try {
        const response = await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Error al crear usuario");
        }
        return "/";
    } catch (error) {
        console.error(error);
        return "/error";
    }
}

export default function AddUser() {
    const [formData, setFormData] = useState({
        nombre: "",
        documento: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const redirectPath = await createUser(formData);
        // Redirigir a la página de inicio o a la página de error según sea necesario
        window.location.href = redirectPath;
    };

    return (
        <body>
        <div className={"elements-container"}>
            <div className={"six"}>
                <h1>Sistema FELI de gestión de usuarios</h1>
                <h1>
                    <span>Fácil Eficiente Leal Integrado</span>
                </h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <div className={"thirteen"}>
                <h1>Adición de usuarios</h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Nombre</td>
                        <td>
                            <input type={"text"} name={"nombre"} value={formData.nombre} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>Documento</td>
                        <td>
                            <input  type={"text"} name={"documento"} value={formData.documento} onChange={handleChange} />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className={"button-container"}>
                    <Link className={"button"}  href={"/"}>Cancelar</Link>
                    <button className={"button"}  type={"submit"}>Agregar</button>
                </div>
            </form>
        </div>
        </body>
    );
}
