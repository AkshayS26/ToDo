"use client";
import { Context } from "@/components/Client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const addToDoForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { user } = useContext(Context);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(data.message);
    }
  };

  if (!user._id) return redirect("/login");

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title "
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit" className="btn">
            Add task
          </button>
        </form>
      </section>
    </div>
  );
};

export default addToDoForm;
