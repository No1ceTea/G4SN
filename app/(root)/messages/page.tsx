import React, { useEffect, useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import Chat from '@/components/chat/Chat';


const IndexPage: React.FC = () => {
  const clerk = useClerk();
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Assuming you have an API route to fetch user info by ID
        const response = await fetch(`/api/user-info?id=${clerk.user?.id}`);
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (clerk.user) {
      fetchUserInfo();
    }
  }, [clerk.user]);

  if (!clerk.user || !userInfo) {
    // Redirect to login or show loading spinner
    return null;
  }

  return (
    <div>
      <h1 className="head-text">Mon Chat en temps réel</h1>
      <Chat user={clerk.user.emailAddresses} />
    </div>
  );
};

export default IndexPage;

