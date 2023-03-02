import {
  useRef,
  createRef,
  useEffect,
  useCallback,
  useState,
  RefObject,
} from 'react';
import NavigationBar from '@/components/navigation-bar';
import SimpleBar from 'simplebar-react';
import SimpleBarCore from 'simplebar-core';
import 'simplebar-react/dist/simplebar.min.css';
import CircleButton from '@/components/circle-button';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

type LayoutProps = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: LayoutProps) {
  const scrollableNodeRef = useRef<SimpleBarCore>(null);

  const [propsRef, setPropsRef] = useState<RefObject<SimpleBarCore>>();
  useEffect(() => {
    if (scrollableNodeRef) {
      setPropsRef(scrollableNodeRef);
    }
  }, [scrollableNodeRef]);
  return (
    <>
      <SimpleBar
        ref={scrollableNodeRef}
        style={{
          maxHeight: '100vh',
        }}>
        <NavigationBar scrollableNodeRef={propsRef} />
        <>{children}</>
        <CircleButton />
      </SimpleBar>
    </>
  );
}
