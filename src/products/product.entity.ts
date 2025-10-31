
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products') // اسم الجدول في قاعدة البيانات
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true }) // يمكن أن يكون الوصف فارغاً
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;
}