import { DataType } from "sequelize-typescript";

export const user = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataType.STRING,
    unique: true
  },
  password: {
    type: DataType.STRING
  },
  firstName: {
    type: DataType.STRING
  },
  lastName: {
    type: DataType.STRING
  }
};
