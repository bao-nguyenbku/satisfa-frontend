import React, { useEffect } from 'react';
import NavigationBar from '@/components/navigation-bar';
import ChatbotButton from '@/components/chatbot-button';
import { useAppDispatch } from '@/hooks';
import { authCurrentUser } from '@/store/reducer/user';
// import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { ChatbotProvider } from '@/context/chatbot-context';
import FooterSection from '@/components/landing/footer';

type LayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const sessionData = useSession();
  useEffect(() => {
    if (sessionData.status === 'authenticated' && sessionData.data) {
      dispatch(authCurrentUser());
    }
  }, [sessionData]);
  return (
    <div className="px-20 overflow-y-auto overflow-x-hidden bg-primary-dark">
      <NavigationBar />
      <>{children}</>
      <ChatbotProvider>
        <ChatbotButton />
      </ChatbotProvider>
      <FooterSection />
    </div>
  );
}
