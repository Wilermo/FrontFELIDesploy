"use client"

import Link from "next/link";
import { useState } from "react";

async function updateUser(data) {
    const nombre = data.get("Nombre")?.valueOf();
    const documento = data.get("Documento")?.valueOf();

    try {
        if (typeof nombre !== "string" || nombre.length === 0) {
            throw new Error("Nombre inválido");
        }
        if (typeof documento !== "string" || documento.length === 0) {
            throw new Error("Documento inválido");
        }

            const response = await fetch(`http://localhost:3000/usuario/${documento}`, {
                method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre: nombre })
        });

        if (!response.ok) {
            throw new Error("Error al actualizar usuario");
        }

        console.log("Usuario actualizado:", documento);
        return "/";
    } catch (error) {
        console.error(error);
        return "/error";
    }
}

export default function Page() {
    const [redirectPath, setRedirectPath] = useState("/");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const path = await updateUser(formData);
        window.location.href = path;
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
                <h1>Editar usuario</h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Documento del usuario a editar</td>
                        <td><input type={"text"} name={"Documento"} /></td>
                    </tr>
                    <tr>
                        <td>Nombre nuevo</td>
                        <td><input type={"text"} name={"Nombre"} /></td>
                    </tr>
                    </tbody>
                </table>

                <div className={"button-container"}>
                    <Link className={"button"} href={".."}>
                        Cancelar
                    </Link>
                    <button className={"button"} type={"submit"}>
                        Editar
                    </button>
                </div>
            </form>
        </div>
        {redirectPath !== "/" && <meta http-equiv="refresh" content={`0;url=${redirectPath}`} />}
        </body>
    );
}
