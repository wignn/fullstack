import Dashboard from "./dashboard";

import Navbar from "../components/NavbarComponents";
import Search from "../components/searchBook";


interface SearchParams {
  query?: string;
}

const Dash = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const query = searchParams?.query || "";
  console.log(`Query: ${query}`);

  return (
    <div>
      <Navbar/>
      <Search/>
      <Dashboard query={query} /></div>
  );
};

export default Dash;
