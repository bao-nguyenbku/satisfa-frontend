import React, { useRef, useEffect, useState, RefObject } from 'react';
import NavigationBar from '@/components/navigation-bar';
import SimpleBar from 'simplebar-react';
import SimpleBarCore from 'simplebar-core';
import 'simplebar-react/dist/simplebar.min.css';
import ChatbotButton from '@/components/chatbot-button';
import { useAppDispatch } from '@/hooks';
import { authCurrentUser } from '@/store/reducer/user';
// import { GetServerSideProps } from 'next';
// import { getSession } from 'next-auth/react';

type LayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: LayoutProps) {
  const scrollableNodeRef = useRef<SimpleBarCore>(null);
  const [propsRef, setPropsRef] = useState<RefObject<SimpleBarCore>>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (scrollableNodeRef) {
      setPropsRef(scrollableNodeRef);
    }
  }, [scrollableNodeRef]);
  useEffect(() => {
    dispatch(authCurrentUser());
  }, []);
  return (
    <SimpleBar
      ref={scrollableNodeRef}
      className="bg-primary-dark"
      style={{
        maxHeight: '100vh',
      }}>
      <div className="px-20">
        <NavigationBar scrollableNodeRef={propsRef} />
        <>{children}</>
        <ChatbotButton />
      </div>
    </SimpleBar>
  );
}
