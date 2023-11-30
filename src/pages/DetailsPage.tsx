import Alert from '@/components/common/Alert';
import Progress from '@/components/common/Progress';
import { useAppParams } from '@/hooks';
import { Animal } from '@/interfaces/animal';
import { useGetAnimalQuery } from '@/redux';
import { FC } from 'react';

const DetailsPage: FC = () => {
  const { details } = useAppParams();
  const { data, isUninitialized, isError, isLoading, isFetching } =
    useGetAnimalQuery(details, { skip: !details });

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
    if (isUninitialized) {
      return null;
    }

    if (isLoading || isFetching) {
      return <Progress />;
    }

    if (isError) {
      return (
        <div className="flex justify-center p-6">
          <Alert message="Something went wrong" severity="error" />
        </div>
      );
    }

    return animalDetails(data.animal).map((detail, index) => (
      <div key={index}>
        {detail.label} {detail.value}
      </div>
    ));
  };

  return <div className="flex flex-col">{renderPage()}</div>;
};

export default DetailsPage;
