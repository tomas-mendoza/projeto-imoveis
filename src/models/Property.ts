import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import PropertyType from './PropertyType';
import Address from './Address';
import Visit from './Visit';
import Customer from './Customer';
import History from './History';
import Photo from './Photo';

@Table({
  tableName: 'properties'
})
export default class Property extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
    id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(400))
    description!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
    area!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => PropertyType)
    type_id!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Address)
    address_id!: number;

  @BelongsTo(() => PropertyType, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
    type!: PropertyType;

  @BelongsTo(() => Address, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
    address!: Address;

  @BelongsToMany(() => Customer, { through: {
    model: () => Visit
  }})
    visits!: Visit[];

  @HasMany(() => History)
    history!: History[];

  @HasMany(() => Photo)
    photos!: Photo[];
}
