import { Component, ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  title: string;
}

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
