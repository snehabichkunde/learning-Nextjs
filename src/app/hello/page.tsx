"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    async function xyz() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Delayed by 1 second");
    }

    xyz(); // ✅ Call the async function
  }, []);

  return <h1>Hello from Next.js!</h1>;
}
