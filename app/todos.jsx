import { cookies } from "next/headers";
import React from "react";
import { ToDoItem } from "../components/ServerComponent";

const fetchTodo = async (token) => {
  try {
    const res = await fetch(`http://localhost:3000/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();

    if (!data.success) return [];

    return data.tasks;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  const tasks = await fetchTodo(token);

  return (
    <section className="todosContainer">
      {tasks?.map((i) => (
        <ToDoItem
          title={i.title}
          description={i.description}
          id={i._id}
          key={i._id}
          completed={i.isCompleted}
        />
      ))}
    </section>
  );
};

export default Todos;
