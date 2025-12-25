import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Entity for storing summarization history
 */
@Entity('history')
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text' })
  keyPoints: string;

  @Column({ type: 'text' })
  conclusions: string;

  @Column({ type: 'text' })
  actionItems: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'int' })
  pageCount: number;

  @Column({ type: 'int' })
  characterCount: number;

  @Column({ type: 'int' })
  processingTimeMs: number;

  @Column({ type: 'text', nullable: true })
  originalText: string | null;

  @CreateDateColumn()
  createdAt: Date;
}

