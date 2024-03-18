"use client"

import Link from "next/link";
import { useState } from "react";

async function deleteUser(data: FormData) {
    const documento = data.get("Documento")?.valueOf();

    try {
        if (typeof documento !== "string" || documento.length === 0) {
            throw new Error("Documento inválido");
        }

        const response = await fetch("http://localhost:3000/usuario/" + documento, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error al eliminar usuario");
        }

        console.log("Usuario eliminado:", documento);
        return "/";
    } catch (error) {
        console.error(error);
        return "/error";
    }
}

export default function Page() {
    const [redirectPath, setRedirectPath] = useState("/");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const path = await deleteUser(formData);
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
                <h1>Eliminar usuario</h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td>Documento del usuario a eliminar</td>
                        <td><input type={"text"} name={"Documento"} /></td>
                    </tr>
                    </tbody>
                </table>

                <div className={"button-container"}>
                    <Link className={"button"} href={".."}>
                        Cancelar
                    </Link>
                    <button className={"button"} type={"submit"}>
                        Eliminar
                    </button>
                </div>
            </form>
        </div>
        {redirectPath !== "/" && <meta http-equiv="refresh" content={`0;url=${redirectPath}`} />}
        </body>
    );
}