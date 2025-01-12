import RSCDemo from "@/components/RSCDemo";
import ClientDemo from "@/components/ClientDemo";
import DataFetchingDemo from "@/components/DataFetchingDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <RSCDemo />
      <ClientDemo />
      <DataFetchingDemo />
      <ServerActionsDemo />
      <Suspense fallback={<p>Loading...</p>}>
        <UsePromiseDemo />
      </Suspense>
    </main>
  );
}
