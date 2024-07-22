import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer.entity';
import { User } from './user.entity';

@Table
export class Sale extends Model<Sale> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => User) 
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 50 } })
  amount: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
