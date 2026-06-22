"use client";

import { FileText, Menu, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "@/assets/logo.png";

import { Button } from "./ui/button";

export default function NavBar() {
  const [activeUsers, setActiveUsers] = useState(
    Math.floor(Math.random() * (200 - 100 + 1) + 99),
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * (200 - 100 + 1) + 99));
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="shadow-sm">
      <nav className="m-auto max-w-5xl px-3 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              width={40}
              height={40}
              className="rounded-md"
              quality={100}
              alt="Cata Jobs"
            />
            <span className="text-xl font-bold">Cata Jobs</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={18} className="text-blue-500" />
              <span>Usuarios activos: {activeUsers}</span>
            </div>
            <Button asChild className="relative bg-blue-500 hover:bg-blue-900">
              <Link href="/jobs/new">
                Crear un trabajo
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cv">
                <FileText className="mr-2 h-4 w-4" />
                Hacer mi CV
              </Link>
            </Button>
          </div>
          <button
            className={`rounded-full p-2 transition-colors md:hidden ${
              isMenuOpen ? "bg-gray-200" : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 space-y-4 md:hidden">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={18} className="text-blue-500" />
              <span>Usuarios activos: {activeUsers}</span>
            </div>
            <Button asChild className="relative w-full bg-blue-500 hover:bg-blue-900">
              <Link href="/jobs/new">
                Crear un trabajo
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cv">
                <FileText className="mr-2 h-4 w-4" />
                Hacer mi CV
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
