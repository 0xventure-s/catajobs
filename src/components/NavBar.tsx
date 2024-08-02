"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { Button } from "./ui/button";
import { ArrowUpFromLine, Heart, Users } from "lucide-react";

export default function NavBar() {
  const [activeUsers, setActiveUsers] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * (500 - 100 + 1) + 99));
    }, 9000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
   <header className="shadow-sm">
    <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src={logo} width={40} height={40} alt="Job Imagen"/>
        <span className="text-xl font-bold tracking-tight">Cata Jobs</span>
      </Link>
      <div className="flex items-center gap-6"> 
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={18} />
          <span>Usuarios activos: {activeUsers}</span>
        </div>
        <Button asChild className="relative">
          <Link href="/jobs/new">
            Crear un trabajo
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </Link>
        </Button>
        <div className="group relative">
          <Button className="opacity-20">Hacer mi CV</Button>
          <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:bottom-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-black before:content-[''] group-hover:opacity-100">
            Próximamente
          </span>
        </div>
      </div>
    </nav>
   </header>
  )
}