import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";
import { getSession } from "@/services/user.service";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getSession();
  return (
    <div>
      <Navbar user={user}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
