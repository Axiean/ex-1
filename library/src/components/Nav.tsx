import React from "react";
import { Layout, Flex, Space, Menu, Badge, Drawer, Button } from "antd";
import {
  ShoppingOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useState } from "react";

const { Header } = Layout;

// Main Navigation Items
const navItems = [
  { key: "women", label: <Link href="/women">Women</Link> },
  { key: "men", label: <Link href="/men">Men</Link> },
  { key: "kids", label: <Link href="/kids">Kids</Link> },
  { key: "gift-cards", label: <Link href="/gift-cards">Gift Cards</Link> },
];

interface NavProps {
  basketItemCount?: number;
}

export const Nav: React.FC<NavProps> = ({ basketItemCount = 0 }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // --- Render Desktop View ---
  const DesktopNav = () => (
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
  );

  // --- Render Mobile View ---
  const MobileNav = () => (
    <Flex
      justify="space-between"
      align="center"
      style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}
    >
      {/* Left side: Hamburger Menu and Search */}
      <Space size="middle">
        <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
        <SearchOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </Space>

      {/* Center: Shopping Bag Icon */}
      <Link href={"/"}>
        <ShoppingOutlined style={{ fontSize: "28px", color: "#1677ff" }} />
      </Link>

      {/* Right side: User and Basket */}
      <Space size="middle">
        <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <Badge count={basketItemCount}>
          <Link href={"/basket"}>
            <ShoppingCartOutlined
              style={{ fontSize: "20px", cursor: "pointer" }}
            />
          </Link>
        </Badge>
      </Space>
    </Flex>
  );

  return (
    <>
      <Header
        style={{
          padding: 0,
          backgroundColor: "#fff",
          height: "auto",
          lineHeight: "initial",
        }}
      >
        {isMobile ? <MobileNav /> : <DesktopNav />}
      </Header>
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Menu mode="inline" items={navItems} onClick={closeDrawer} />
      </Drawer>
    </>
  );
};
