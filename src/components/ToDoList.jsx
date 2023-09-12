import React from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function TodoList({ todos, onDelete, onComplete, onEdit }) {
  return (
    <div className="list">
      <ul>
        {todos.map((todo) => (
          <li className="list-items" key={todo.id}>
            <div className="list-item-list" id={todo.status ? "list-item" : ""}>
              {todo.list}
            </div>
            <span>
              <IoMdDoneAll
                className="list-item-icons"
                id="complete"
                title="Complete"
                onClick={() => onComplete(todo.id)}
              />
              <FiEdit
                className="list-item-icons"
                id="edit"
                title="Edit"
                onClick={() => onEdit(todo.id)}
              />
              <MdDelete
                className="list-item-icons"
                id="delete"
                title="Delete"
                onClick={() => onDelete(todo.id)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
