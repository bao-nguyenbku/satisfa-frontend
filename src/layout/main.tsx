import React, { useEffect } from 'react';
import NavigationBar from '@/components/navigation-bar';
import { useAppDispatch } from '@/hooks';
import { authCurrentUser } from '@/store/reducer/user';
// import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import FooterSection from '@/components/landing/footer';
import FloatMenu from '@/components/float';

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
    <div className="bg-primary bg-repeat h-auto">
      <NavigationBar />
      {children}
      <FloatMenu />
      <FooterSection />
    </div>
  );
}
