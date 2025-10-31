
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products') 
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true }) 
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;
}