import _ from 'lodash';
import Phaser from 'phaser';
import CharacterChard from './CharacterCard';
import { animatedCharacterKeys, Level, levels } from './game';

export default class MainScene extends Phaser.Scene {
  clock: Phaser.Time.Clock;
  private currentLevel: Level;
  private characterCards: Phaser.GameObjects.Group;

  preload() {
    this.load.image('background', 'assets/background.png');
    for (let level = 0; level < levels.length; level += 1) {
      for (let character = 0; character < 9; character += 1) {
        this.loadFramesForLevelCharacter(level, character);
      }
    }
  }

  private loadFramesForLevelCharacter(level: number, character: number) {
    const key = `character${character}Level${level}`;
    const path = `assets/level${level}/character-${character}.png`;
    const frameData = animatedCharacterKeys[key];
    if (!frameData) this.load.image(key, path);
    else {
      const { frameWidth, frameHeight } = frameData;
      this.load.spritesheet(`${key}Frames`, path, { frameWidth, frameHeight });
    }
  }

  create() {
    this.add.image(0, 0, 'background');
    this.setUpStartingLevel();
    this.createAnimations();
    this.characterCards = this.add.group();
    this.addPressableObjectsToScene();
    this.setUpClock();
  }

  createAnimations() {
    Object.entries(animatedCharacterKeys).forEach(
      ([key, { start, end }]) => this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(`${key}Frames`, { start, end }),
        frameRate: 4,
        repeat: -1,
      }),
    );
  }

  setUpStartingLevel() {
    this.registry.set('currentLevel', 0);
    [this.currentLevel] = levels;
  }

  addPressableObjectsToScene() {
    this.currentLevel.objectCoordinates.forEach(([x, y], index) => {
      const characterKey = `character${index}Level${this.registry.values.currentLevel}`;
      const characterCard = new CharacterChard(this, x, y, {
        characterKey,
        pressAction: index === this.currentLevel.correctCharacter
          ? this.handleCorrectPress : this.handleWrongPress,
      });
      this.characterCards.add(characterCard);
    });
  }

  handleCorrectPress() {

  }

  handleWrongPress() {

  }

  setUpClock() {

  }
}
