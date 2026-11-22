import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
