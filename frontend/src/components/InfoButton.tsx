"use client";
import { Info } from "lucide-react";

interface InfoButtonProps {
  text: string;
}

export default function InfoButton({ text }: InfoButtonProps) {
  return (
    <span className="relative group inline-flex items-center justify-center ml-2 cursor-help align-middle">
      <Info className="w-4.5 h-4.5 text-blue-500 hover:text-blue-700 transition-colors" />
      <span className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-80 md:w-[26rem] p-4 bg-gray-900/95 backdrop-blur-md text-white text-xs leading-relaxed rounded-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-50 transform group-hover:translate-y-1 border border-gray-800 font-sans block text-left">
        <span className="absolute -top-2 left-3 md:left-1/2 md:-translate-x-1/2 border-4 border-transparent border-b-gray-900 block"></span>
        {text}
      </span>
    </span>
  );
}
