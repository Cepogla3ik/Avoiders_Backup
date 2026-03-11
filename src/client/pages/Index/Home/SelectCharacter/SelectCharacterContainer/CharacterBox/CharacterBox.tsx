import styles from './CharacterBox.module.scss';
import { setPagesState } from "@client/store/slices";
import { useAppDispatch } from "@client/store/storep";

interface SelectCharacterBoxProps {
  hero: string;
  boxColor: string;
  circleColor: string;
}

export default function SelectCharacterBox({ hero, boxColor, circleColor }: SelectCharacterBoxProps) {
  const dispatch = useAppDispatch();
  
  return (
    <div onClick={() => dispatch(setPagesState({ game: true }))} className={styles["character-box"]} style={{ backgroundColor: boxColor, borderColor: circleColor }}>
      <div className={styles["character-hero"]} style={{ color: circleColor }}>{hero}</div>
      <div className={styles["character-circle"]} style={{ backgroundColor: circleColor }}  ></div>
    </div>
  );
}