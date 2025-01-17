import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMenu = () => {
  const axiosSecure = useAxiosSecure();
  const {data: menu = [], isPending: loading, refetch} = useQuery({
    queryKey: ["menus"],
    queryFn: async()=>{
      const res = await axiosSecure.get("/menus");
      return res.data;
    }
  })
  return [menu, loading, refetch];
};

export default useMenu;
