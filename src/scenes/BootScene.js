export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load some minimal assets, like loading bar graphics, if we had them
    }

    create() {
        this.scene.start('PreloadScene');
    }
}
