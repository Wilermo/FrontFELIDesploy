import Link from "next/link";
import {isAsyncFunction} from "util/types";
import {prisma} from "@/app/db";
import {redirect} from "next/navigation";

async function deleteUser(data: FormData) {
    "use server"
    const documento = data.get("Documento").valueOf()

    try{
        if (typeof documento !== "string" || documento.length === 0) {
            throw Error("Documento inválido")
        }
        await prisma.user.delete({
            where: {
                documento: +documento,
            },
        })
        console.log(documento)
    }catch (error){
        console.log(error)
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
                <h1> Eliminar usuario
                </h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <form action={deleteUser}>
                <table>
                    <tbody>
                    <tr>
                        <td>Documento del usuario a eliminar</td>
                        <td><input type={"text"} name={"Documento"}/></td>
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
        </body>
    )
}