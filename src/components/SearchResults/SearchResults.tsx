import { Component } from 'react';
import { Animal } from '../../interfaces/Animal';
import Alert from '../Alert/Alert';
import Card from '../Card/Card';
import './SearchResults.css';

interface SearchResultsProps {
  searchResults: Animal[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { searchResults } = this.props;

    if (!searchResults.length) {
      return <Alert message="No results found." />;
    }

    return (
      <div className="result">
        {searchResults.map(
          ({ uid, name, earthAnimal, avian, earthInsect, feline, canine }) => (
            <Card key={uid} title={name}>
              <ul>
                {earthAnimal && <li>Animal</li>}
                {avian && <li>Bird</li>}
                {earthInsect && <li>Insect</li>}
                {feline && <li>Kitty</li>}
                {canine && <li>Doggy</li>}
              </ul>
            </Card>
          )
        )}
      </div>
    );
  }
}

export default SearchResults;
