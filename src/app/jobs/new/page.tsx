import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
    title: "Crear nuevo empleo"
}



export default function Page(){

    return <NewJobForm/>

}