import { Animal } from '@/interfaces/animal';
import { RouterParams } from '@/types';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from './common/Alert';
import Card from './common/Card';

interface CardListProps {
  list: Animal[];
}

const CardList: FC<CardListProps> = ({ list }) => {
  const navigate = useNavigate();
  const { details } = useParams<RouterParams>();

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
    if (!details) {
      return () => {
        navigate({ pathname });
      };
    }
  };

  if (!list.length) {
    return (
      <div className="flex justify-center p-6 w-full">
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
