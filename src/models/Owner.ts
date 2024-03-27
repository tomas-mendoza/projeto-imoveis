import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique, BelongsTo } from 'sequelize-typescript';
import Address from './Address';

@Table({
  tableName: 'owners'
})
export default class Owner extends Model {
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
    address!: Address;
}
