import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Descriptions,
  Flex,
  Form,
  Image,
  Input,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getGetCharitiesIdDogsQueryKey,
  useDeleteDogsId,
  useGetCharitiesIdDogs,
  usePostDogs,
  usePutDogsId,
} from "../api/dogs/dogs";
import { CreateDogBody, Dog, UpdateDogBody } from "../api/model";
import { useAuth } from "./AuthContext";
import { useBreeds } from "./useBreeds";

const DogsManage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, refetch } = useGetCharitiesIdDogs(user?.charityId as number, {
    query: { enabled: !!user?.charityId },
  });

  const { mutateAsync: addDog } = usePostDogs();
  const dogs = data?.data ?? [];
  const [addDogForm] = Form.useForm();
  useEffect(() => {
    if (user?.role !== "worker") {
      navigate("/");
    }
  });

  const { data: breeds } = useBreeds();

  return (
    <Flex vertical gap={12}>
      <Typography.Title>Manage dogs</Typography.Title>

      <Card title="Add Dogs">
        <Form<CreateDogBody>
          form={addDogForm}
          onFinish={async (values) => {
            await addDog({ data: values });
            addDogForm.resetFields();
            refetch();
          }}
        >
          <Form.Item<CreateDogBody>
            name="name"
            label="Name"
            rules={[{ required: true, message: "required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<CreateDogBody>
            name="breed"
            label="Breed"
            rules={[{ required: true, message: "required" }]}
          >
            <Select>
              {breeds?.map((breed) => (
                <Select.Option key={breed} value={breed}>
                  {breed}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item<CreateDogBody>
            name="age"
            label="Age"
            rules={[{ required: true, message: "required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item<CreateDogBody>
            name="image"
            label="Image"
            rules={[{ required: true, message: "required" }]}
          >
            <UploadItem />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      </Card>
      {dogs.map((dog) => (
        <DogItem dog={dog} key={dog.id} />
      ))}
    </Flex>
  );
};

const UploadItem = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) => {
  return (
    <Flex>
      <input
        type="file"
        max={1}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] as Blob;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("loadend", (ev) => {
            if (ev.target?.result) onChange?.(ev.target?.result.toString());
          });
        }}
      />
      {value && (
        <Image
          src={value}
          height={100}
          width={100}
          style={{ objectFit: "contain" }}
        />
      )}
    </Flex>
  );
};

const DogItem = ({ dog }: { dog: Dog }) => {
  const client = useQueryClient();
  const [updateDogForm] = Form.useForm();
  const { mutateAsync: updateDog } = usePutDogsId();
  const { mutateAsync: deleteDog } = useDeleteDogsId();
  const { data: breeds } = useBreeds();

  const [editing, setEditing] = useState(false);
  if (!editing) {
    return (
      <Card
        title={
          <Flex justify="space-between">
            <span>ID: {dog.id}</span>
            <Flex gap={8}>
              <Button type="primary" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={async () => {
                  await deleteDog({ id: dog.id });
                  client.refetchQueries({
                    queryKey: getGetCharitiesIdDogsQueryKey(dog.charityId),
                  });
                }}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        }
        key={dog.id}
      >
        <Flex gap={16}>
          <Image
            src={dog.image}
            height={200}
            width={200}
            style={{ objectFit: "contain" }}
          />
          <Descriptions style={{ flex: 1 }}>
            <Descriptions.Item label="Name">{dog.name}</Descriptions.Item>
            <Descriptions.Item label="Age">{dog.age}</Descriptions.Item>
            <Descriptions.Item label="Breed">{dog.breed}</Descriptions.Item>
          </Descriptions>
        </Flex>
      </Card>
    );
  }

  return (
    <Form<UpdateDogBody>
      form={updateDogForm}
      onFinish={async (values) => {
        await updateDog({ id: dog.id, data: values });
        setEditing(false);
        client.refetchQueries({
          queryKey: getGetCharitiesIdDogsQueryKey(dog.charityId),
        });
      }}
      initialValues={dog}
    >
      <Card
        title={
          <Flex justify="space-between">
            <span>Update Dog ID:{dog.id}</span>
            <Flex gap={8}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                type="default"
                onClick={() => {
                  updateDogForm.resetFields();
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        }
        key={dog.id}
      >
        <Form.Item<UpdateDogBody>
          name="name"
          label="Name"
          rules={[{ required: true, message: "required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UpdateDogBody>
          name="breed"
          label="Breed"
          rules={[{ required: true, message: "required" }]}
        >
          <Select>
            {breeds?.map((breed) => (
              <Select.Option key={breed} value={breed}>
                {breed}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item<UpdateDogBody>
          name="age"
          label="Age"
          rules={[{ required: true, message: "required" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item<CreateDogBody>
          name="image"
          label="Image"
          rules={[{ required: true, message: "required" }]}
        >
          <UploadItem />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default DogsManage;
