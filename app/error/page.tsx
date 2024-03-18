import Link from "next/link";
import {isAsyncFunction} from "util/types";
import {prisma} from "@/app/db";
import {redirect} from "next/navigation";
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
            <div className={"thirteen-error"}>
                <h1> Ha ocurrido un error
                </h1>
            </div>
        </div>
        <div className={"elements-container"}>
            <div className={"button-container"}>
                <Link className={"button"} href={".."}>
                    Volver a intentar
                </Link>
            </div>

        </div>
        </body>
    )
}