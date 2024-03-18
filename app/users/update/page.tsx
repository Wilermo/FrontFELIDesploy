import Link from "next/link";
import {isAsyncFunction} from "util/types";
import {prisma} from "@/app/db";
import {redirect} from "next/navigation";

async function updateUser(data: FormData) {
    "use server"
    const nombre = data.get("Nombre")?.valueOf()
    const documento = data.get("Documento")?.valueOf()

    try{
        if (typeof nombre !== "string" || nombre.length === 0) {
            throw Error("Nombre inválido")
        }
        if (typeof documento !== "string" || documento.length === 0) {
            throw Error("Documento inválido")
        }

        await prisma.user.update({
            where: {
                documento: +documento,
            },
            data: {
                nombre: nombre,
            },
        })
    }catch (error){
        redirect("/error")
    }

    console.log(data)
    redirect("/");
}

export default function Page() {
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
            <div className={"thirteen"}>
                <h1> Editar de usuarios
                </h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <form action={updateUser}>
                <table>
                    <tbody>
                    <tr>
                        <td>Documento del usuario a editar</td>
                        <td><input type={"text"} name={"Documento"}/></td>
                    </tr>
                    <tr>
                        <td>Nombre nuevo</td>
                        <td><input type={"text"} name={"Nombre"}/></td>
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
        </body>
    )
}