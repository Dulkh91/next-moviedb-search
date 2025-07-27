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
  const [activeTabKey, setActiveTabKey] = useState(pathname);


  useEffect(() => {
    setActiveTabKey(pathname);
    segLoading(true);
  }, [pathname]);

  if (!loading)
    return (
      <div className="flex justify-center">
        <Skeleton.Button active />
      </div>
    );

    const handleTabChange = (key: string) => {

    if (key !== pathname) {
      router.push(key);
    }
  };

  return (
    <>
      <nav className="flex justify-center w-full min-h-[40px]">
        <Tabs
          activeKey={activeTabKey}
          onChange={handleTabChange}
          items={items.map((item) => ({ ...item, children: null }))}
          className="flex flex-row"
        />
      </nav>
    </>
  );
};

export default Navbar;
