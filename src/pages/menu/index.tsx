import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useAppSelector } from '../../hooks';
import { selectUser } from '../../store/reducer/user';
import BasicTabs from './menu';
type Props = {};

export default function Menu(props: Props) {
  return (
    <div className="menu-page bg-dark-theme h-screen">
      <div className={styles.menuHeader}>
        <div className={styles.firstLine} style={{ marginRight: '30px' }} />{' '}
        MENU <div style={{ marginLeft: '30px' }} className={styles.endLine} />
      </div>
      <div className="mt-12 menu-content relative">
        <BasicTabs />
      </div>
    </div>
  );
}
