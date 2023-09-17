import { DataType } from "sequelize-typescript";

export const todoList = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false
  }
}
