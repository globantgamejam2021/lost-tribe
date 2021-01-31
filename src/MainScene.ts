import _ from 'lodash';
import Phaser from 'phaser';
import CharacterChard, { CharacterCardProps } from './CharacterCard';

export type CharacterFrameData = {
  key: string;
  start: number;
  end: number;
}

const objectCoordinates: [number, number][] = [[100, 300], [250, 300], [400, 300]];
export const characterKeys: CharacterFrameData[] = [
  { key: 'character1', start: 0, end: 1 },
  { key: 'character2', start: 0, end: 3 },
];

export default class MainScene extends Phaser.Scene {
  clock: Phaser.Time.Clock;
  private characterCards: Phaser.GameObjects.Group;

  preload() {
    this.load.spritesheet('character1Frames', 'assets/character-1.png', { frameWidth: 94, frameHeight: 104 });
    this.load.spritesheet('character2Frames', 'assets/character-2.png', { frameWidth: 99, frameHeight: 108 });
  }

  create() {
    this.createAnimations();
    this.characterCards = this.add.group();
    this.registry.set('correctCharacterKey', _.sample(characterKeys).key);
    this.addPressableObjectsToScene();
  }

  createAnimations() {
    characterKeys.forEach(({ key, start, end }) => this.anims.create({
      key,
      frames: this.anims.generateFrameNumbers(`${key}Frames`, { start, end }),
      frameRate: 4,
      repeat: -1,
    }));
  }

  addPressableObjectsToScene() {
    objectCoordinates.forEach(([x, y]) => {
      const characterCard = new CharacterChard(this, x, y, this.characterCardProps);
      this.characterCards.add(characterCard);
    });
  }

  characterCardProps: CharacterCardProps = {
    correctPressAction: this.handleCorrectPress,
    wrongPressAction: this.handleWrongPress,
  };

  handleCorrectPress() {

  }

  handleWrongPress() {

  }
}
