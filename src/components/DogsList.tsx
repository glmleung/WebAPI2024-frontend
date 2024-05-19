import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Typography } from "antd";
import {
  getGetDogsQueryKey,
  useDeleteDogsIdLike,
  useGetDogs,
  usePostDogsIdLike,
} from "../api/dogs/dogs";
import { Dog } from "../api/model";
import { useAuth } from "./AuthContext";

const DogsList = () => {
  const { data } = useGetDogs();
  const dogs = data?.data ?? [];

  return (
    <div>
      <Typography.Title>Dogs List</Typography.Title>
      <div className="dog-list">
        {dogs?.map((dog) => (
          <div className="dog-card" key={dog.id}>
            <div className="dog-image">
              <img src={dog.image} />
            </div>
            <div className="dog-content">
              <div className="dog-name">
                {dog.name} <LikeButton dog={dog} />
              </div>
              <div className="dog-breed">Breed: {dog.breed}</div>
              <div className="dog-age">Age: {dog.age}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogsList;

const LikeButton = ({ dog }: { dog: Dog }) => {
  const { user } = useAuth();
  const client = useQueryClient();

  const { mutateAsync: likeDog } = usePostDogsIdLike();
  const { mutateAsync: unlikeDog } = useDeleteDogsIdLike();
  const refetch = () => {
    client.invalidateQueries({ queryKey: getGetDogsQueryKey() });
  };
  if (!user) return null;

  if (!dog.liked)
    return (
      <Button
        type="text"
        onClick={async () => {
          await likeDog({ id: dog.id });
          refetch();
        }}
        danger
        icon={<HeartOutlined />}
      ></Button>
    );
  return (
    <Button
      type="text"
      onClick={async () => {
        await unlikeDog({ id: dog.id });
        refetch();
      }}
      danger
      icon={<HeartFilled />}
    ></Button>
  );
};
