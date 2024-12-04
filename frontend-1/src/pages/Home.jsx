import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>Hello!</div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default Home;
