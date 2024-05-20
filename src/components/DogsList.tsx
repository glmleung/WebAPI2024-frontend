import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import {
  getGetDogsQueryKey,
  useDeleteDogsIdLike,
  useGetDogs,
  usePostDogsIdLike,
} from "../api/dogs/dogs";
import { Dog, GetDogsParams } from "../api/model";
import { useAuth } from "./AuthContext";
import { useBreeds } from "./useBreeds";
import { useState } from "react";

const DogsList = () => {
  const [search, setSearch] = useState<GetDogsParams>({});
  const { data } = useGetDogs(search);
  const { data: breeds } = useBreeds();
  const dogs = data?.data ?? [];

  return (
    <div>
      <Form<GetDogsParams>
        onFinish={(values) => {
          setSearch(values);
        }}
      >
        <Flex gap={12} wrap>
          <Form.Item<GetDogsParams> label="Breed" name="breed" style={{ width: 300 }}>
            <Select placeholder="Select breed" allowClear showSearch>
              {breeds?.map((breed) => (
                <Select.Option key={breed} value={breed}>
                  {breed}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<GetDogsParams> label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item<GetDogsParams> label="Age from" name="ageFrom">
            <InputNumber />
          </Form.Item>
          <Form.Item<GetDogsParams> label="Age to" name="ageTo">
            <InputNumber />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </Flex>
      </Form>
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
