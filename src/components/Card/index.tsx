import { Component, ReactNode } from 'react';
import './index.css';

interface CardProps {
  children: ReactNode;
  title: string;
}

class Card extends Component<CardProps> {
  render() {
    const { title, children } = this.props;

    return (
      <div className="card">
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
}

export default Card;
