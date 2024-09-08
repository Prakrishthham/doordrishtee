import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigateTo = useNavigate();
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    navigateTo('/home');
  }

  return (
    <>
      <div>
        This is Login page
      </div>
      <div>
        <input type="email" />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </div>
    </>
  )
};

export default Login;