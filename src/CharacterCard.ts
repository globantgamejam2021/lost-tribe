import _ from 'lodash';
import Phaser from 'phaser';
import { animatedCharacterKeys } from './game';
import MainScene from './MainScene';

export type CharacterCardProps = {
  characterKey: string;
  pressAction: () => void;
}

export default class CharacterChard extends Phaser.GameObjects.Sprite {
  private props: CharacterCardProps;

  constructor(scene: MainScene, x: number, y: number, props: CharacterCardProps) {
    const isAnimated = props.characterKey in animatedCharacterKeys;
    super(scene, x, y, isAnimated ? null : props.characterKey);
    this.props = props;
    this.setInteractive().on('pointerdown', _.debounce(this.handleClick, 2000, { leading: true }));
    if (isAnimated) this.anims.play(props.characterKey);
  }

  handleClick() {
    const { pressAction } = this.props;
    pressAction();
  }
}
