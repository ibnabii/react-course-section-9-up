"use server";
import { saveMeal } from "@/lib/meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// before using useFormState
// export async function shareMeal(formData) {
// after using useFormState
export async function shareMeal(prevState, formData) {
  function isInvalidText(text) {
    return !text || text.trim() === "";
  }

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  // layout - revalidates layout, thus also nested pages
  // page - default - revalidates only this specific route
  revalidatePath("/meals", "layout");
  redirect("/meals");
}
