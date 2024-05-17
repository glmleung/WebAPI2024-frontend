import { Card, Descriptions, Flex, Typography } from "antd";
import { useGetDogs } from "../api/dogs/dogs";

const DogsList = () => {
  const { data } = useGetDogs();
  const dogs = data?.data;
  return (
    <div>
      <Typography.Title>Dogs List</Typography.Title>
      <Flex vertical gap={12}>
        {dogs?.map((dog) => (
          <Card key={dog.id} title={`${dog.name} (ID: ${dog.id})`}>
            <Descriptions>
              <Descriptions.Item label="Name">{dog.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{dog.age}</Descriptions.Item>
              <Descriptions.Item label="Breed">{dog.breed}</Descriptions.Item>
              <Descriptions.Item label="Charity">{dog.charity?.name}</Descriptions.Item>
            </Descriptions>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default DogsList;
