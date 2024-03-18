"use client";

import Link from "next/link";
import React, { useEffect, useState } from 'react';
export interface Usuario {
    nombre: string;
    documento: string;
}

export default function Home() {

    const [users, setUsers] = useState<Usuario[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("sistemafeli.up.railway.app:3000/usuario");
                if (!response.ok) {
                    throw new Error("Error al obtener usuarios");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <body>
        <div className={"elements-container"}>
            <div className={"six"}>
                <h1> Sistema FELI de gestión de usuarios </h1>
                <h1><span>Fácil Eficiente Leal Integrado</span></h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <div className={"button-container"}>
                <Link className={"button"} href={"/users/add"}>
                    Agregar Usuario
                </Link>
                <Link className={"button"} href={"/users/delete"}>
                    Eliminar Usuario
                </Link>
                <Link className={"button"} href={"/users/update"}>
                    Editar Usuario
                </Link>
            </div>
        </div>
        <div className={"elements-container"}>
            <table>
                <tbody>
                <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                </tr>
                {users.map(user => (
                    <tr key={user.documento}>
                        <td>{user.nombre}</td>
                        <td>{user.documento}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </body>
    );
}