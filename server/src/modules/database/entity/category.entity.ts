import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CustomerVideoEntity } from './customer-video.entity';
import { CategoryVideoEntity } from './category-video.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'ca_id' })
  id: number;

  @Column({ name: 'ca_name' })
  name: string;

  @OneToMany(
    () => CategoryVideoEntity,
    (categoryVideoEntity) => categoryVideoEntity.categoryEntity, { onDelete: 'CASCADE' }
  )
  categoryVideoEntity: CategoryVideoEntity[];
  
  constructor(name: string) {
    this.name = name;
  }
}
