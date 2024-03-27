import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique, HasMany } from 'sequelize-typescript';
import Owner from './Owner';
import Property from './Property';
import Customer from './Customer';
import Broker from './Broker';

@Table({
  tableName: 'address'
})
export default class Address extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
    id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(2))
    state!: string;

  @AllowNull(false)
  @Column(DataType.STRING(65))
    city!: string;

  @AllowNull(false)
  @Column(DataType.STRING(70))
    district!: string;

  @AllowNull(false)
  @Column(DataType.STRING(70))
    street!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
    complement!: string;

  @AllowNull(false)
  @Column(DataType.STRING(8))
    cep!: string;

  @HasMany(() => Owner)
    owners!: Owner[];

  @HasMany(() => Property)
    properties!: Property[];

  @HasMany(() => Customer)
    customers!: Customer[];

  @HasMany(() => Broker)
    brokers!: Broker[];
}
