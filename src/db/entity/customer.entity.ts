import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Customer extends Model<Customer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, validate: { len: [1, 50] } })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true, validate: { len: [1, 50] } })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false, validate: { len: [1, 200] } })
  address: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
