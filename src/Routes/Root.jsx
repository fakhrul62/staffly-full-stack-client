import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
    return (
        <div className="px-5 pb-5 pt-24">
            <Header></Header>
            <Outlet></Outlet>

        </div>
    );
};

export default Root;