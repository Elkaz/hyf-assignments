import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from './Navbar.module.css';

const navbarItems = [
  {
    title: 'ABOUT US',
    link: '/about_us',
  },
  {
    title: 'DESTINATION',
    link: '/destination',
  },
  {
    title: 'NASA COLLABORATION',
    link: '/nasa_collaboration',
  }
];

export const Navbar = () => {
  const currentPath = useLocation().pathname;

  return (
    <header className={styles.headerContainer}>
      <div className={styles.navbarLogo}>
        <a href="/"><img src="/shared/logo.svg" alt="" /> GALACTICA</a>
      </div>
      <div className={styles.decorativeLine} />
      <nav className={styles.navbar}>
        <div className={styles.navbarBG} />
        <ul className={styles.navbarList}>
          {/* Task - Week 2 */}
          {/* Create a <NavItem> component, which accepts the following:  */}
          {/* title, link, isActive  */}
          <li className={classNames(styles.navbarLinks, {
            [styles.isLinkActive]: navbarItems[0].link === currentPath,
          })}>
            <Link to={navbarItems[0].link}><b>01</b> {navbarItems[0].title}</Link>
          </li>
          <li className={classNames(styles.navbarLinks, {
            [styles.isLinkActive]: navbarItems[1].link === currentPath,
          })}>
            <Link to={navbarItems[1].link}><b>02</b> {navbarItems[1].title}</Link>
          </li>
          <li className={classNames(styles.navbarLinks, {
            [styles.isLinkActive]: navbarItems[2].link === currentPath,
          })}>
            <Link to={navbarItems[2].link}><b>03</b> NASA COLLABORATION</Link>
          </li>
          {/* Task - Week 3 */}
          {/* replace repeating content by using navbarItems.map(() => <NavLink />) */}
        </ul>
      </nav>
    </header>
  );
}