import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  create() {
    this.add.rectangle(0, 0, 200, 200, 0x6666ff);
  }
}

const configuration : Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    expandParent: true,
  },
  title: 'Lost Tribe',
  scene: MainScene,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(configuration);
