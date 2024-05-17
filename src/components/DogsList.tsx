import { Button, Card, Descriptions, Flex, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {
  useDeleteDogsIdLike,
  useGetDogs,
  usePostDogsIdLike,
} from "../api/dogs/dogs";
import { useAuth } from "./AuthContext";

const DogsList = () => {
  const { user } = useAuth();
  const { data, refetch } = useGetDogs();
  const dogs = data?.data;
  const { mutateAsync: likeDog } = usePostDogsIdLike();
  const { mutateAsync: unlikeDog } = useDeleteDogsIdLike();
  return (
    <div>
      <Typography.Title>Dogs List</Typography.Title>
      <Flex vertical gap={12}>
        {dogs?.map((dog) => (
          <Card
            key={dog.id}
            title={
              <Flex gap={16}  align="center" justify="space-between">
                <span>
                  {dog.name} (ID: {dog.id})
                </span>
                {user && !dog.liked && (
                  <Button
                  type="text"

                    onClick={async () => {
                      await likeDog({ id: dog.id });
                      refetch();
                    }}
                    danger
                    icon={<HeartOutlined />}
                  >

                  </Button>
                )}
                {user && dog.liked && (
                  <Button
                  type="text"
                    onClick={async () => {
                      await unlikeDog({ id: dog.id });
                      refetch();
                    }}
                    danger
                    icon={<HeartFilled />}
                  >

                  </Button>
                )}
              </Flex>
            }
          >
            <Descriptions>
              <Descriptions.Item label="Name">{dog.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{dog.age}</Descriptions.Item>
              <Descriptions.Item label="Breed">{dog.breed}</Descriptions.Item>
              <Descriptions.Item label="Charity">
                {dog.charity?.name}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default DogsList;
