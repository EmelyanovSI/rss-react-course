import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Animal } from '../interfaces/Animal';
import Alert from './Alert';
import Card from './Card';

interface CardListProps {
  list: Animal[];
}

const CardList: FC<CardListProps> = ({ list }) => {
  const navigate = useNavigate();

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

  if (!list.length) {
    return <Alert message="No list found." severity="warning" />;
  }

  return (
    <div className="flex flex-wrap justify-center p-6 gap-4">
      {list.map((animal) => (
        <Card
          key={animal.uid}
          title={animal.name}
          onClick={() => navigate(animal.uid)}
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
