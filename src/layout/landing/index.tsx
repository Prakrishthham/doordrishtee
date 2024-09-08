import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../errorBoundary";

const Landing = () => {
  return (
    <>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default Landing;