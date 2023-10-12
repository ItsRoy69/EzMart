import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('user changed', user);
        const localUser = JSON.parse(localStorage.getItem("walmart-user"));
        if (user || localUser) {
            setUser(prev => user ?? localUser);
            localStorage.setItem("walmart-user", JSON.stringify(user ?? localUser));
        };
    }, [user]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("walmart-user");
        window.location.href = '/';
    }

    const value = {
        user,
        setUser,
        logout,
        isDistributor: user && user.role === "distributor", // Check if user is a distributor
        isRetailer: user && user.role === "retailer" // Check if user is a retailer
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
