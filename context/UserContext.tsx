'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the shape of the User data
interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    token: string;
}

// Define the context types
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void; // Add logout function
    checkAuth: () => boolean; // Add function to check authentication
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const router = useRouter();
    
    // Function to check if user is authenticated
    const checkAuth = (): boolean => {
        const token = localStorage.getItem('auth_token');
        return !!token; // Returns true if token exists, false otherwise
    };
    
    // Check for existing auth on mount
    useEffect(() => {
        const isAuthenticated = checkAuth();
        setIsLoggedIn(isAuthenticated);
        
        // If not authenticated and on a protected route, redirect to login
        if (!isAuthenticated) {
            const path = window.location.pathname;
            const protectedRoutes = ['/dashboard', '/profile', '/settings'];
            
            if (protectedRoutes.some(route => path.startsWith(route))) {
                router.push('/login');
            }
        }
        
        setIsInitialized(true);
    }, [router]);
    

    // Logout function to clear user data and auth tokens
    const logout = () => {
        // Clear user state
        setUser(null);
        setIsLoggedIn(false);
        
        // Clear localStorage
        localStorage.removeItem('auth_token');
        
        // Clear cookies - fixing the cookie deletion
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; domain=' + window.location.hostname;
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;';
        
        // Redirect to login page after logout
        router.push('/login');
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout, checkAuth }}>
            {isInitialized ? children : null}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
