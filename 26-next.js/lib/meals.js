import sql from "better-sqlite3";
const db = sql("meals.db");

export async function getMeals() {
  // artificial 2sec delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}
