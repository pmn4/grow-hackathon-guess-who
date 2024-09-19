"use client";

import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { SelectProvider } from "@/db/schema";
import { useGridScale } from "@/hooks/use-grid-scale";
import { ProviderCard } from "./ProviderCard";

export default function PerfectProviderHome({
  providers,
}: {
  providers: SelectProvider[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { columns, rows } = useGridScale(providers.length, containerRef);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Perfect Provider
        </h1>
        <p className="mb-4">Find the right provider for you!</p>
        <Input
          placeholder="Enter your criteria..."
          className="w-full max-w-md"
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <div
          id="grid-container"
          ref={containerRef}
          className="h-full w-full p-2 sm:p-4"
        >
          <div
            className="grid h-full w-full"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: "4px",
            }}
          >
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
