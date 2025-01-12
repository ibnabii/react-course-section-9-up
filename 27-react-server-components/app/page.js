import RSCDemo from "@/components/RSCDemo";
import ClientDemo from "@/components/ClientDemo";
import DataFetchingDemo from "@/components/DataFetchingDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";
import fs from "node:fs";

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve) =>
    setTimeout(async () => {
      const data = fs.readFileSync("dummy-db.json", "utf-8");
      const users = await JSON.parse(data);
      resolve(users);
    }, 3000),
  );

  return (
    <main>
      <RSCDemo />
      <ClientDemo />
      <DataFetchingDemo />
      <ServerActionsDemo />
      <Suspense fallback={<p>Loading...</p>}>
        <UsePromiseDemo usersPromise={fetchUsersPromise} />
      </Suspense>
    </main>
  );
}
