import React, { Suspense } from "react";
import Form from "./addToDoForm";
import Todos from "./todos";

function page() {
  return (
    <>
      <div className="container">
        <Form />
        <Suspense fallback={<div>loading...</div>}>
          <Todos />
        </Suspense>
      </div>
    </>
  );
}

export default page;
