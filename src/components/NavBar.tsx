"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png"
import { Button } from "./ui/button";
import { ArrowUpFromLine, Heart, Users, Menu } from "lucide-react";

export default function NavBar() {
  const [activeUsers, setActiveUsers] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * (500 - 100 + 1) + 99));
    }, 9000); // Actualiza cada 9 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto px-3 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} width={40} height={40} alt="Job Imagen"/>
            <span className="text-xl font-bold tracking-tight">Cata Jobs</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={18} className='text-blue-500' />
              <span>Usuarios activos: {activeUsers}</span>
            </div>
            <Button asChild className="relative bg-blue-500 hover:bg-blue-900">
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
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 space-y-4 md:hidden">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={18} className='text-blue-500' />
              <span>Usuarios activos: {activeUsers}</span>
            </div>
            <Button asChild className="w-full relative bg-blue-500 hover:bg-blue-900">
              <Link href="/jobs/new">
                Crear un trabajo
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </Link>
            </Button>
            <div className="relative">
              <Button className="w-full opacity-20">Hacer mi CV</Button>
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded bg-black px-2 py-1 text-white text-xs">
                Próximamente
              </span>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}