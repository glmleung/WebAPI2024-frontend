import { Button, Card, Descriptions, Flex, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {
  getGetDogsQueryKey,
  useDeleteDogsIdLike,
  useGetDogs,
  usePostDogsIdLike,
} from "../api/dogs/dogs";
import { useAuth } from "./AuthContext";
import { Dog } from "../api/model";
import { useQueryClient } from "@tanstack/react-query";

const DogsList = () => {
  const { user } = useAuth();
  const { data, refetch } = useGetDogs();
  const dogs = data?.data;

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
                <LikeButton dog={dog} />
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

const LikeButton = ({dog}:{dog:Dog}) => {
  const {user} = useAuth()
  const client = useQueryClient();

  const { mutateAsync: likeDog } = usePostDogsIdLike();
  const { mutateAsync: unlikeDog } = useDeleteDogsIdLike();
  const refetch = () => {
    client.invalidateQueries({ queryKey: getGetDogsQueryKey() });
  }
  if(!user) return null;

  if (!dog.liked) return (
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
  )
  return (
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

