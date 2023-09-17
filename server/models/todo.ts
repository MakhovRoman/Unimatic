import { DataType } from "sequelize-typescript";

export const todo = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false
  },
  title: {
    type: DataType.STRING,
    allowNull: false
  },
  content: {
    type: DataType.STRING,
    allowNull: false
  },
}
