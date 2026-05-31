import StorageManager from '../managers/StorageManager.js';
import GameManager from '../managers/GameManager.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;

        // Fondo
        this.add.image(width / 2, height / 2, 'menu-bg').setDisplaySize(width, height);

        // Overlay sutil
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.25);

        // Panel botones derecha
        const panelX = width * 0.78;
        const panelY = height * 0.5;
        const btnW = 280;
        const btnH = 52;
        const gap = 65;

        // Fondo panel
        this.add.rectangle(panelX, panelY - gap * 0.5, btnW + 24, btnH * 3 + gap * 2 + 20, 0x0a0500, 0.75)
            .setStrokeStyle(3, 0xc8a000);

        const makeBtn = (y, label, color, callback) => {
            const bg = this.add.rectangle(panelX, y, btnW, btnH, color)
                .setStrokeStyle(2, 0xc8a000)
                .setInteractive({ useHandCursor: true });
            const txt = this.add.text(panelX, y, label, {
                fontFamily: 'Arial Black',
                fontSize: '16px',
                color: '#ffffff',
                stroke: '#000',
                strokeThickness: 3
            }).setOrigin(0.5);
            bg.on('pointerover', () => bg.setAlpha(0.75));
            bg.on('pointerout', () => bg.setAlpha(1));
            bg.on('pointerdown', callback);
            return { bg, txt };
        };

        const startY = panelY - gap * 1.5;

        makeBtn(startY, '⚔  COMENZAR', 0x3a8a00, () => {
        GameManager.reset();
        localStorage.removeItem('guardian_lastlevel');
        this.scene.start('GameScene');
        });

        const level = StorageManager.getLastLevel();
        if (level > 1) {
            makeBtn(startY + gap, `🛡  CONTINUAR (NIVEL ${level})`, 0x8a6a00, () => {
                GameManager.reset();
                GameManager.state.level = level;
                this.scene.start('GameScene');
            });
        } else {
            makeBtn(startY + gap, '🛡  CONTINUAR', 0x444444, () => {});
        }

        const audioLabel = () => `🔊  AUDIO: ${StorageManager.getAudioConfig() ? 'ON' : 'OFF'}`;
        const audioBtn = makeBtn(startY + gap * 2, audioLabel(), 0x006a8a, () => {
            StorageManager.setAudioConfig(!StorageManager.getAudioConfig());
            audioBtn.txt.setText(audioLabel());
        });

        // Personaje pequeño abajo izquierda
        this.add.image(width * 0.12, height * 0.78, 'player').setScale(0.5).setOrigin(0.5);
    }
}