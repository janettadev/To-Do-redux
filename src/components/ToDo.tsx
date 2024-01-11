import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ToDo = () => {
   const dispatch = useDispatch();
   const [inputValue, setInputValue] = useState("");
   const list = useSelector((state: any) => state.list);
   const oneTodo = useSelector((state: any) => state.oneTodo);
   console.log(oneTodo);

   function create() {
      const data = JSON.parse(localStorage.getItem("todo") || "[]");
      data.push({
         name: inputValue,
         id: Date.now(),
      });
      if (inputValue !== "") {
         localStorage.setItem("todo", JSON.stringify(data));
      }
      setInputValue("");
      read();
   }

   function read() {
      const data = JSON.parse(localStorage.getItem("todo") || "[]");
      dispatch({ type: "GET_TODO", payload: data });
   }

   function getOneProduct(id: number) {
      const data = JSON.parse(localStorage.getItem("todo") || "[]");
      const oneProduct = data.map((el: any) => el.id === id);
      dispatch({ type: "ONE_TODO", payload: oneProduct });
   }

   useEffect(() => {
      create();
   }, []);

   useEffect(() => {
      read();
   }, []);
   // console.log(list);

   function deleteTodo(id: number) {
      const data = JSON.parse(localStorage.getItem("todo") || "[]");
      const newData = data.filter((el: any) => el.id !== id);
      localStorage.setItem("todo", JSON.stringify(newData));
      read();
   }

   return (
      <div id="toDo">
         <div className="container">
            <div className="toDo">
               <div className="toDo--block">
                  <h1>To Do</h1>
                  <div className="toDo--block__input">
                     <input
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="text"
                        value={inputValue}
                     />
                     <button onClick={create}>Create</button>
                  </div>
                  {list?.map((el: any) => (
                     <div className="toDo--block__box" key={el.id}>
                        <h4>{el.name}</h4>
                        <div className="toDo--block__box--btns">
                           <button onClick={() => deleteTodo(el.id)}>
                              Delete
                           </button>
                           <button onClick={() => getOneProduct(el.id)}>
                              Edit
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ToDo;
