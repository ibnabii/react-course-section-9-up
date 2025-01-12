// "use client";

// import { useState, use } from "react";
import fs from "node:fs";

export default async function UsePromiseDemo({ usersPromise }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = fs.readFileSync("dummy-db.json", "utf-8");
  const users = JSON.parse(data);
  // const users = use(usersPromise);
  // const [count, setCount] = useState(0);
  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      {/*<p>*/}
      {/*  <button onClick={() => setCount((prevCount) => prevCount + 1)}>*/}
      {/*    Increment*/}
      {/*  </button>*/}
      {/*  <span>{count}</span>*/}
      {/*</p>*/}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
