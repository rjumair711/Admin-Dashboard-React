import { SaveButton, useForm } from "@refinedev/antd";
import type { HttpError } from "@refinedev/core";
import type { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin, Typography } from "antd";

import type {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/types";
import { getNameInitials } from "@/utilities";

import CustomAvatar from "../custom-avatar";
import { UPDATE_USER_MUTATION } from "./queries";

const { Text } = Typography;

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  const {
    saveButtonProps,
    formProps,
    query: queryResult,
  } = useForm<
    GetFields<UpdateUserMutation>,
    HttpError,
    GetVariables<UpdateUserMutationVariables>
  >({
    mutationMode: "optimistic",
    resource: "users",
    action: "edit",
    id: userId,
    meta: {
      gqlMutation: UPDATE_USER_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {};

  const closeModal = () => {
    setOpened(false);
  };

  if (queryResult?.isLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        styles={{
          body: {
            background: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin />
      </Drawer>
    );
  }

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={closeModal}
        />
      </div>

      {/* Form */}
      <div style={{ padding: "16px" }}>
        <Card>
          <Form {...formProps} layout="vertical">
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px",
              }}
            />

            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Job Title" name="jobTitle">
              <Input placeholder="Job Title" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone" />
            </Form.Item>
          </Form>

          <SaveButton
            {...saveButtonProps}
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
