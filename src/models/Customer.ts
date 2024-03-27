import { AllowNull, HasMany, BelongsToMany, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Address from './Address';
import Visit from './Visit';
import Property from './Property';
import History from './History';
// import Broker from './Broker';

@Table({
  tableName: 'customers'
})
export default class Customer extends Model {
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

  @BelongsToMany(() => Property, { through: {
    model: () => Visit
  } })
    visits!: Visit[];

  // @BelongsToMany(() => Broker, {
  //   through: {
  //     model: () => History
  //   }
  // })
  // @BelongsToMany(() => Property, {
  //   through: {
  //     model: () => History
  //   }
  // })
  @HasMany(() => History)
    history!: History[];
}
