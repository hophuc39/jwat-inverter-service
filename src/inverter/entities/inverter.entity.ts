import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inverter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'inverter_code', unique: true })
  inverterCode: string;

  @Column({ name: 'inverter_name' })
  inverterName: string;

  @Column({ name: 'slave_address' })
  slaveAddress: string;

  @Column({ name: 'start_address' })
  startAddress: string;

  @Column({ name: 'number_of_poles' })
  numberOfPoles: number;

  @UpdateDateColumn({ name: 'updated_date', type: 'timestamptz' })
  updatedDate: Date;

  @Column({ name: 'use_flag', default: false })
  useFlag: boolean;
}
