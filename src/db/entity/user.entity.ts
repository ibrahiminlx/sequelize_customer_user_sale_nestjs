import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, validate: { len: [1, 50] } })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, validate: { len: [1, 200] } })
  password: string;
  

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
