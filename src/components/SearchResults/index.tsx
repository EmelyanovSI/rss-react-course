import { FC } from 'react';
import { Animal } from '../../interfaces/Animal';
import Alert from '../Alert';
import Card from '../Card';

interface SearchResultsProps {
  results: Animal[];
}

const SearchResults: FC<SearchResultsProps> = ({ results }) => {
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

  if (!results.length) {
    return <Alert message="No results found." severity="warning" />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {results.map((animal) => (
        <Card key={animal.uid} title={animal.name}>
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

export default SearchResults;
