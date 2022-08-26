import { useState, createContext  , useContext} from "react";
import { IUser } from "../interfaces/IUser";
const AuthContext = createContext<any>({});

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>();

    const login =(user :any) =>{
        setUser(user);
    }

    const logout =() =>{
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}