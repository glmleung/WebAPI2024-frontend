import { useQueryClient } from "@tanstack/react-query";
import { Button,Card,Flex,Form,Input,Tag,Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  getGetCharitiesQueryKey,
  useDeleteCharitiesId,
  useGetCharities,
  usePostCharities,
  usePostCharitiesIdCodesCode,
  useDeleteCharitiesIdCodesCode,
  usePutCharitiesId,
} from "../api/charities/charities";
import {
  Charity,
  PostCharitiesBody,
  PutCharitiesIdBody,
} from "../api/model";
import { useAuth } from "./AuthContext";

const Charities = () => {
  const navigate = useNavigate();
  const {user } =useAuth();

  const {data,refetch}= useGetCharities();
  const charities = data?.data || [];

  const {mutateAsync: addCharity} = usePostCharities();
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  });
  return (
    <div>
      <Typography.Title>Charities</Typography.Title>
      <Form<PostCharitiesBody>
        onFinish={async (values) => {
          await addCharity({ data: values });
          refetch();
        }}
      >
        <Typography.Text strong>Add Charities</Typography.Text>
        <Flex gap={8}>
          <Form.Item<PostCharitiesBody> name="name" label="Name">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Flex>
      </Form>
      <Flex vertical gap={12}>
        {charities.map((charity) => (
          <CharityItem charity={charity} key={charity.id} />
        ))}
      </Flex>
    </div>
  );
};

type CodeInput = {
  code: string;
};

const CharityItem = ({ charity }: { charity: Charity }) => {
  const [addCodeForm] = Form.useForm();
  const client = useQueryClient();
  const {mutateAsync:deleteCharity} = useDeleteCharitiesId();
  const {mutateAsync:updateCharity} = usePutCharitiesId();
  const {mutateAsync:addCodeToCharity} = usePostCharitiesIdCodesCode();

  const {mutateAsync:deleteCodeFromCharity} =useDeleteCharitiesIdCodesCode();
  return (
    <Card
      title={
        <Flex justify="space-between" align="center">
          <Form<PutCharitiesIdBody>
            onFinish={async ({ name }) => {
              await updateCharity({ id: charity.id,data: { name } });
              client.invalidateQueries({ queryKey: getGetCharitiesQueryKey()} );
            }}
            initialValues={{ name: charity.name }}
          >
            <Flex align="center" gap={8}>
              <Typography.Text strong>Name</Typography.Text>
              <Form.Item<PutCharitiesIdBody>
                style={{ marginBottom: 0 }}
                name="name"
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Flex>
          </Form>
          <Button
            danger  type="primary"
            htmlType="button"
            onClick={async () => {
              await deleteCharity({ id: charity.id });
              client.invalidateQueries({queryKey: getGetCharitiesQueryKey(),
              });
            }}
          >
            Delete
          </Button>
        </Flex>
      }
    >
      <Typography.Text strong>Charity login codes</Typography.Text>
      <Flex>
        {charity.codes?.map((code) => (
          <Tag
            key={code}
            closeIcon
            onClose={async (e) => {
              e.preventDefault();
              await deleteCodeFromCharity({ id: charity.id,code });
              client.refetchQueries({ queryKey: getGetCharitiesQueryKey() });
            }}>
            {code}
          </Tag>
        ))}
      </Flex>

      <Form<CodeInput>
        form={addCodeForm}
        onFinish={async ({ code }) => {
          try {
            await addCodeToCharity({id:charity.id,code});
            client.invalidateQueries({ queryKey: getGetCharitiesQueryKey() });
            addCodeForm.resetFields()
          } catch (e) {
            alert("Code already exists");
          }
        }}>
        <Flex align="center">
          <Form.Item<CodeInput>
            name="code"
            label="New Code"
            style={{ marginBottom: 0 }}
            rules={[{ required: true,message: "Please input your code!" }]}>
            <Input size="small" />
          </Form.Item>
          <Form.Item<CodeInput> style={{ marginBottom: 0 }}>
            <Button size="small" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Card>
  );
};

export default Charities;
