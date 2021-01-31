import Phaser from 'phaser';
import MainScene from './MainScene';

const width = 512;
const height = 512;

const configuration : Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  scale: {
    width,
    height,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    expandParent: true,
  },
  title: 'Lost Tribe',
  scene: MainScene,
};

const game = new Phaser.Game(configuration);
export default game;
