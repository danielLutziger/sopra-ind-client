import Header from "components/views/Header";
import AppRouter from "components/routing/routers/AppRouter";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 */
const App = () => {
  return (
    <div>
      <Header height="100"/>
      <AppRouter/>
    </div>
  );
};

export default App;
