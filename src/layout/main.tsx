import NavigationBar from "@/components/navigation-bar";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

type LayoutProps = {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <SimpleBar style={{
      maxHeight: '100vh'
    }}>
      <NavigationBar />
      <main>{children}</main>
    </SimpleBar>
    </>
  )
}