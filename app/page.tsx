import Link from "next/link";
import {prisma} from "@/app/db";

function getUsers() {
    return prisma.user.findMany()
}


export default async function Home() {
    const users = await getUsers()
    //await prisma.user.create({data: {nombre: "Pipe", documento: 123}})
    return (
        <body>
        <div className={"elements-container"}>
            <div className={"six"}>
                <h1> Sistema FELI de gestión de usuarios
                </h1>
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
    )
}