"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function NuevoDocumento() {
  const router = useRouter();
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden p-4 gap-4">
      <Button variant="primary" onClick={() => router.back()}>
        VOLVER
      </Button>
    </div>
  );
}
