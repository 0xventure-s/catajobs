import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { Button } from "./ui/button";
import { ArrowUpFromLine, Heart } from "lucide-react";


export default function NavBar() {
  return (
   <header className="shadow-sm ">
    <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
      <Image src={logo} width={40} height={40} alt="Job Imagen"/>

      <span className="text-xl font-bold tracking-tight">Cata Jobs</span>

      </Link>
      <Button asChild>
        <Link href="/jobs/new">Crear un trabajo</Link>
      </Button>
    </nav>
   </header>
  )
}
