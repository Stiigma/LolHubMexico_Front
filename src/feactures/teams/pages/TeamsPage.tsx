
import Header from "../components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import PreviewPage from "./PreviewPage";

const TeamsPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <PreviewPage />
      </div>
    </div>
  );
};

export default TeamsPage;
