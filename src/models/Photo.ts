import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique, BelongsTo } from 'sequelize-typescript';
import Property from './Property';

@Table({
  tableName: 'photos'
})
export default class Photo extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
    id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(36))
    aws_key!: string;
    
  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => Property)
    property_id!: number;

  @BelongsTo(() => Property)
    property!: Property;
}
