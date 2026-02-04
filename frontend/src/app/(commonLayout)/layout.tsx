import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
