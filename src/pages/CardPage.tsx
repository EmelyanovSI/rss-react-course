import { useLoaderData } from 'react-router-dom';
import { AnimalResponse } from '../interfaces/animal';

const CardPage = () => {
  const {
    animal: { name, uid, earthAnimal, earthInsect, feline, canine, avian },
  } = useLoaderData() as AnimalResponse;

  const animalDetails = [
    { label: 'Name:', value: name },
    { label: 'ID:', value: uid },
    { label: 'Is Animal:', value: earthAnimal ? 'Yes' : 'No' },
    { label: 'Is Avian:', value: avian ? 'Yes' : 'No' },
    { label: 'Is Earth Insect:', value: earthInsect ? 'Yes' : 'No' },
    { label: 'Is Feline:', value: feline ? 'Yes' : 'No' },
    { label: 'Is Canine:', value: canine ? 'Yes' : 'No' },
  ];

  return (
    <div className="flex flex-col">
      {animalDetails.map((detail, index) => (
        <div key={index}>
          {detail.label} {detail.value}
        </div>
      ))}
    </div>
  );
};

export default CardPage;
