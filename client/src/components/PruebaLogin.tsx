import { ChangeEvent, useState } from "react";
import { trpc } from "../trpc";
import { QueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function PruebaLogin() {
    return (
        <>
            <Link className="btn" to={"/"}>listado</Link>
            <form>
                <input type="text" />

                <button hidden={true}>Subit</button>
            </form>
        </>
    )

}