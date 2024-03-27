import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Address from './Address';
import History from './History';

@Table({
  tableName: 'brokers'
})
export default class Broker extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
    id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(150))
    name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(11))
    cpf!: string;

  @AllowNull(true)
  @Column(DataType.STRING(14))
    cnpj!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
    birthdate!: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Address)
    address_id!: number;

  @BelongsTo(() => Address, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
    address!: Address;

  @HasMany(() => History)
    history!: History[];
}
