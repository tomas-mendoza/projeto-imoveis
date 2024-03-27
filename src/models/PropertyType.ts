import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import Property from './Property';

@Table({
  tableName: 'property_types'
})
export default class PropertyType extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
    id!: number;

  @AllowNull(false) 
  @Unique
  @Column(DataType.STRING)
    description!: string;

  @HasMany(() => Property)
    properties!: Property[];
}
