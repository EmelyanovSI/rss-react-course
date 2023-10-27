import { Component } from 'react';
import { Animal } from '../interfaces/Animal';

interface SearchResultsProps {
  searchResults: Animal[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    return (
      <div>
        <ul>
          {this.props.searchResults.map((item) => (
            <li key={item.uid}>
              <h3>{item.name}</h3>
              <p>{item.earthAnimal && 'Animal'}</p>
              <p>{item.avian && 'Bird'}</p>
              <p>{item.earthInsect && 'Insect'}</p>
              <p>{item.feline && 'Kitty'}</p>
              <p>{item.canine && 'Doggy'}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
