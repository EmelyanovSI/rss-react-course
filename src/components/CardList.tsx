import { Animal } from '@/interfaces/animal';
import { FC } from 'react';
import Alert from './common/Alert';
import Card from './common/Card';

interface CardListProps {
  list: Animal[];
  onCardClick?: (pathname: string) => (() => void) | undefined;
}

const CardList: FC<CardListProps> = ({ list, onCardClick }) => {
  const renderAnimalFeatures = ({
    earthAnimal,
    avian,
    earthInsect,
    feline,
    canine,
  }: Animal) => {
    const features = [];

    if (earthAnimal) features.push('Animal');
    if (avian) features.push('Bird');
    if (earthInsect) features.push('Insect');
    if (feline) features.push('Kitty');
    if (canine) features.push('Doggy');

    return features;
  };

  const handleCardClick = (pathname: string) => {
    if (onCardClick) {
      return onCardClick(pathname);
    }
  };

  if (!list.length) {
    return (
      <div className="flex justify-center p-6">
        <Alert message="Not found." severity="warning" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center p-6 gap-4">
      {list.map((animal) => (
        <Card
          key={animal.uid}
          title={animal.name}
          onClick={handleCardClick(animal.uid)}
        >
          <ul>
            {renderAnimalFeatures(animal).map((feature) => (
              <li key={feature} className="font-thin text-sm">
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
