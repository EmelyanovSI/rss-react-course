import Alert from '@/components/common/Alert';
import Progress from '@/components/common/Progress';
import { CardPageContext, Status } from '@/constants';
import { Animal } from '@/interfaces/animal';
import { FC } from 'react';
import { useOutletContext } from 'react-router-dom';

const CardPage: FC = () => {
  const { animal, status, message } = useOutletContext<CardPageContext>();

  const animalDetails = ({
    name,
    uid,
    earthAnimal,
    avian,
    earthInsect,
    feline,
    canine,
  }: Animal) => [
    { label: 'Name:', value: name },
    { label: 'ID:', value: uid },
    { label: 'Is Animal:', value: earthAnimal ? 'Yes' : 'No' },
    { label: 'Is Avian:', value: avian ? 'Yes' : 'No' },
    { label: 'Is Earth Insect:', value: earthInsect ? 'Yes' : 'No' },
    { label: 'Is Feline:', value: feline ? 'Yes' : 'No' },
    { label: 'Is Canine:', value: canine ? 'Yes' : 'No' },
  ];

  const renderPage = () => {
    if (status === Status.Idle) {
      return null;
    }

    if (status === Status.Loading) {
      return <Progress />;
    }

    if (status === Status.Failed) {
      return (
        <div className="flex justify-center p-6 w-full">
          <Alert message={message} severity="error" />
        </div>
      );
    }

    return animalDetails(animal).map((detail, index) => (
      <div key={index}>
        {detail.label} {detail.value}
      </div>
    ));
  };

  return <div className="flex flex-col">{renderPage()}</div>;
};

export default CardPage;
