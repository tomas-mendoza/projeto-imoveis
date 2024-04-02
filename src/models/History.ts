import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Property from './Property';
import Customer from './Customer';
import Broker from './Broker';

@Table({
  tableName: 'history'
})
export default class History extends Model {

  @PrimaryKey
  @AutoIncrement
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
    id!: number; 

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Property)
    property_id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Customer)
    customer_id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Broker)
    broker_id!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
    negotiation_date!: Date;

  @AllowNull(false)
  @Column(DataType.FLOAT)
    commission_perc!: number;

  @BelongsTo(() => Property)
    property!: Property;

  @BelongsTo(() => Customer)
    customer!: Customer;

  @BelongsTo(() => Broker)
    broker!: Broker;
}
