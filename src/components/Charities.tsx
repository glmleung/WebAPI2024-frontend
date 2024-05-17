import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import {
  useDeleteCharitiesId,
  useGetCharities,
  usePostCharities,
} from "../api/charities/charities";
import { Button, Flex, Form, Input, Typography } from "antd";
import { PostCharitiesBody } from "../api/model";

const Charities = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, refetch } = useGetCharities();
  const charities = data?.data || [];

  const { mutateAsync: addCharity } = usePostCharities();
  const { mutateAsync: deleteCharity } = useDeleteCharitiesId();
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  });
  return (
    <div>
      <Typography.Title>Charities</Typography.Title>
      <Typography.Title>Add Charities</Typography.Title>
      <Form<PostCharitiesBody>
        onFinish={async (values) => {
          await addCharity({ data: values });
          refetch();
        }}
      >
        <Form.Item<PostCharitiesBody> name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      <Flex vertical>
        {charities.map((charity) => (
          <Flex key={charity.id}>
            {charity.name}{" "}
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deleteCharity({ id: charity.id });
                refetch()
              }}
            >
              Delete
            </Button>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default Charities;
