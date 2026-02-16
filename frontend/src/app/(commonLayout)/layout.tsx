import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";
import { userService } from "@/services/user.service";
import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  const user = await userService.getSession();
  return (
    <div>
      <Navbar user={user}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
