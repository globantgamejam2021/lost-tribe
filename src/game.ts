import Phaser from 'phaser';
import MainScene from './MainScene';

export type CharacterFrameData = {
  start: number;
  end: number;
  frameWidth: number;
  frameHeight: number;
}

export type Level = {
  time: number,
  timeLossOnError: number,
  correctCharacter: number;
  objectCoordinates: [number, number][];
}

export const animatedCharacterKeys: { [key: string]: CharacterFrameData } = {
  character0Level0: {
    start: 0, end: 1, frameWidth: 94, frameHeight: 104,
  },
  character1Level0: {
    start: 0, end: 3, frameWidth: 99, frameHeight: 108,
  },
};

export const levels: Level[] = [
  {
    time: 60,
    timeLossOnError: 3,
    correctCharacter: 19, // ???
    objectCoordinates: [[100, 300], [250, 300], [400, 300]],
  },
];

const width = 512;
const height = 512;

const configuration: Phaser.Types.Core.GameConfig = {
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
