"use client";
import { Info } from "lucide-react";

interface InfoButtonProps {
  text: string;
}

export default function InfoButton({ text }: InfoButtonProps) {
  return (
    <div className="relative group inline-flex items-center justify-center ml-2 cursor-help">
      <Info className="w-4.5 h-4.5 text-blue-500 hover:text-blue-700 transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 md:w-96 p-4 bg-gray-900/95 backdrop-blur-md text-white text-xs leading-relaxed rounded-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-50 transform group-hover:-translate-y-1 border border-gray-800">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}
