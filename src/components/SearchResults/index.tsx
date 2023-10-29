import { Component } from 'react';
import { Animal } from '../../interfaces/Animal';
import Alert from '../Alert';
import Card from '../Card';
import './index.css';

interface SearchResultsProps {
  searchResults: Animal[];
}

class SearchResults extends Component<SearchResultsProps> {
  renderAnimalFeatures({
    earthAnimal,
    avian,
    earthInsect,
    feline,
    canine,
  }: Animal) {
    const features = [];

    if (earthAnimal) features.push('Animal');
    if (avian) features.push('Bird');
    if (earthInsect) features.push('Insect');
    if (feline) features.push('Kitty');
    if (canine) features.push('Doggy');

    return features;
  }

  renderCards() {
    const { searchResults } = this.props;

    return searchResults.map((animal) => (
      <Card key={animal.uid} title={animal.name}>
        <ul>
          {this.renderAnimalFeatures(animal).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </Card>
    ));
  }

  render() {
    const { searchResults } = this.props;

    if (!searchResults.length) {
      return <Alert message="No results found." />;
    }

    return <div className="result">{this.renderCards()}</div>;
  }
}

export default SearchResults;
