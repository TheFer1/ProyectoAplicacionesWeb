import StorageManager from '../managers/StorageManager.js';
import GameManager from '../managers/GameManager.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 4, 'Guardian of the Andes', {
            fontSize: '48px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const playBtn = this.add.text(width / 2, height / 2, 'Play', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                GameManager.reset();
                this.scene.start('GameScene');
            });

        const level = StorageManager.getLastLevel();
        if (level > 1) {
            this.add.text(width / 2, height / 2 + 50, `Continue (Level ${level})`, { fontSize: '32px', fill: '#ff0' })
                .setOrigin(0.5)
                .setInteractive()
                .on('pointerdown', () => {
                    GameManager.reset();
                    GameManager.state.level = level;
                    this.scene.start('GameScene');
                });
        }

        const audioConfig = StorageManager.getAudioConfig();
        const audioText = this.add.text(width / 2, height / 2 + 100, `Audio: ${audioConfig ? 'ON' : 'OFF'}`, { fontSize: '32px', fill: '#0ff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                const current = StorageManager.getAudioConfig();
                StorageManager.setAudioConfig(!current);
                audioText.setText(`Audio: ${!current ? 'ON' : 'OFF'}`);
            });
            
        this.add.text(width / 2, height - 50, `High Score: ${StorageManager.getHighScore()}`, { fontSize: '24px', fill: '#fff' })
            .setOrigin(0.5);
    }
}
