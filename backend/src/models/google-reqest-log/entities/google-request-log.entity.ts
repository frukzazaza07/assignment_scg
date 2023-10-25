import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
const moment = require('moment');
@Entity({ name: 'google_map_log' })
export class GoogleRequestLog {
    @PrimaryGeneratedColumn('increment')
    gml_id?: number;

    @Column()
    gml_user_ip: string;

    @Column()
    gml_request_url: string;

    @Column()
    gml_request_payload: string;

    @Column()
    gml_google_key: string;

    @Column()
    gml_google_url: string;

    @Column()
    gml_google_request: string;

    @Column()
    gml_google_request_method: string;

    @Column()
    gml_google_response: string;

    @CreateDateColumn({ name: 'gml_created_at' })
    gml_created_at?: string;

    @UpdateDateColumn({ name: 'gml_updated_at', nullable: false })
    gml_updated_at?: string;

    @BeforeInsert()
    insertCreated() {
        this.gml_created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        this.gml_updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
