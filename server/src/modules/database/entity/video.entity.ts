import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CustomerVideoEntity } from './customer-video.entity';

@Entity({ name: 'video' })
export class VideoEntity {
  @PrimaryGeneratedColumn({ name: 'v_id' })
  id: number;

  @Column({ name: 'v_name' })
  name: string;

  @Column({ name: 'v_description' })
  description: string;

  @Column({ name: 'v_episode' })
  episode: number;
  
  @Column({ name: 'v_original_link' })
  originalLink: string;
  
  @Column("text", { name: 'v_materials', array: true })
  materials: string[];

  @CreateDateColumn({ name: 'v_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'v_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(
    () => CustomerVideoEntity,
    (customerVideoEntity) => customerVideoEntity.videoEntity, { onDelete: 'CASCADE' }
  )
  customerVideoEntity: CustomerVideoEntity[];
  
  constructor(name: string, description: string, episode: number, originalLink: string, materials: Array<string>) {
    this.name = name;
    this.description = description;
    this.episode = episode;
    this.originalLink = originalLink;
    this.materials = materials;
  }
}
