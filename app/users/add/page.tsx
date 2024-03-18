import Link from "next/link";
import {isAsyncFunction} from "util/types";
import {prisma} from "@/app/db";
import {redirect} from "next/navigation";

async function createUser(data: FormData) {
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

        await prisma.user.create({data: {nombre: nombre, documento: +documento}});
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
                <h1> Adición de usuarios
                </h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <form action={createUser}>
                <table>
                    <tbody>
                    <tr>
                        <td>Nombre</td>
                        <td><input type={"text"} name={"Nombre"}/></td>
                    </tr>
                    <tr>
                        <td>Documento</td>
                        <td><input type={"text"} name={"Documento"}/></td>
                    </tr>
                    </tbody>
                </table>

            <div className={"button-container"}>
                <Link className={"button"} href={".."}>
                    Cancelar
                </Link>
                <button className={"button"} type={"submit"}>
                    Agregar
                </button>
            </div>
            </form>
        </div>
        </body>
    )
}