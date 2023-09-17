import { todoList } from "./models/todo_list";

import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { todo } from "./models/todo";

import { user } from "./models/user";
import { TodoModel, UserModel } from "./models/models";

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;

const sequelizeOptions:SequelizeOptions = {
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  dialect: "postgres"
}

const sequelize = new Sequelize(sequelizeOptions);

// Init db models

// user model
export const User = sequelize.define<UserModel>("User", user);

// // todo-list model
// export const TodoList = sequelize.define<TodoListModel>("TodoList", todoList, {updatedAt: false});

// todo-item model
export const Todo = sequelize.define<TodoModel>("Todo", todo, {updatedAt: false});

User.hasOne(Todo, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Todo.belongsTo(User);

// TodoList.hasOne(Todo, {
//   foreignKey: "todo_list_id",
//   onDelete: "CASCADE"
// });
// Todo.belongsTo(TodoList);

// Fucntion for connect to DB
export const dbConnect = async () => {
  try {
    await sequelize.authenticate(); // Check auth to DB
    await sequelize.sync(); // Sync to DB
  } catch (error) {
     console.log(error)
  }
}
