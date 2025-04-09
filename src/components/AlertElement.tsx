import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart } from "lucide-react";

export default function AlertElement() {
  return (
    <Alert variant="default" className="hidden">
      {/* ou retire complètement le variant pour du neutre/vert */}
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your session is active. Welcome back!</AlertDescription>
    </Alert>
  );
}
