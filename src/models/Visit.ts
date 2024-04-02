import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Property from './Property';
import Customer from './Customer';

@Table({
  tableName: 'visits'
})
export default class Visit extends Model {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Property)
    property_id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Customer)
    customer_id!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
    visit_date!: Date;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
    visit_realized!: boolean;

  @BelongsTo(() => Property)
    property!: Property;

  @BelongsTo(() => Customer)
    customer!: Customer;
}
