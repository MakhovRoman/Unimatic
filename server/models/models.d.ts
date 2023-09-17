import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>;
  email: string;
  password: string;
}

// export interface TodoListModel extends Model<InferAttributes<TodoListModel>, InferCreationAttributes<TodoListModel>> {
//   id: CreationOptional<number>;
//   user_id: number
// }

export interface TodoModel extends Model<InferAttributes<TodoModel>, InferCreationAttributes<TodoModel>> {
  id: CreationOptional<number>;
  user_id: number | string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined;
  title: string;
  content: string;
}
