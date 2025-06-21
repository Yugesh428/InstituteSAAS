import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "institute", "super-admin", "student"),
    defaultValue: "student",
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare currentInstituteNumber: string;
}

export default User;
