import { useAuth } from "../providers/AuthProvider";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children } :any){
    const auth = useAuth();
  return (
    <div>
      <Header />
      {children}
     {
        auth.user ?  <Footer /> :null
     }
    </div>
  );
};