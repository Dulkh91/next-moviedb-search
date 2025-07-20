"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs, Skeleton } from "antd";
import { useEffect, useState } from "react";

const items = [
  {
    key: "/",
    label: "Home",
  },
  {
    key: "/search",
    label: "Search",
  },
  {
    key: "/rated",
    label: "Rated",
  },
];
const Navbar = () => {
  const [loading, segLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    segLoading(true);
  }, []);

  if (!loading)
    return (
      <div className="flex justify-center">
        <Skeleton.Button active />
      </div>
    );

  return (
    <>
      <nav className="flex justify-center w-full min-h-[40px]">
        <Tabs
          activeKey={pathname ?? ""}
          onChange={(key) => router.push(key)}
          items={items.map((item) => ({ ...item, children: null }))}
          className="flex flex-row"
        />
      </nav>
    </>
  );
};

export default Navbar;
