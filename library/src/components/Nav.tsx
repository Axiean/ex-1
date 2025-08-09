import React from "react";
import { Layout, Flex, Space, Dropdown, Menu, Typography, Badge } from "antd";
import {
  DownOutlined,
  ShoppingOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { Header } = Layout;

// --- Main Navigation Items ---
const navItems = [
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "kids", label: "Kids" },
  { key: "gift-cards", label: "Gift Cards" },
];

interface NavProps {
  basketItemCount?: number;
}

export const Nav: React.FC<NavProps> = ({ basketItemCount = 0 }) => {
  return (
    <Header
      style={{
        padding: 0,
        backgroundColor: "#fff",
        height: "auto",
        lineHeight: "initial",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ padding: "12px 24px", borderBottom: "1px solid #f0f0f0" }}
      >
        <Flex align="center">
          <Link href={"/"}>
            <ShoppingOutlined
              style={{
                fontSize: "32px",
                color: "#1677ff",
                marginRight: "24px",
              }}
            />
          </Link>
          <Menu
            mode="horizontal"
            items={navItems}
            style={{ borderBottom: "none", minWidth: "300px" }}
          />
        </Flex>

        <Space size="large">
          <SearchOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <Badge count={basketItemCount}>
            <Link href={"/basket"}>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </Link>
          </Badge>
          <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </Space>
      </Flex>
    </Header>
  );
};
