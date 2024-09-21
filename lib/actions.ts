"use server";

import { redirect } from "next/navigation";
import { incrementVotes, insertQuestion, insertTopic } from "./data";
import { revalidatePath } from "next/cache";

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: Number(question.get("votes") as string),
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
    console.log(topic.id);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    redirect(`/ui/topics/${topic.id}`);
  }
}
