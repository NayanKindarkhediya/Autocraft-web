import { Link, useLocation } from 'react-router-dom';

// Link to a section on the home page: smooth-scrolls if already there, otherwise navigates then scrolls.
export default function HashLink({ to, onClick, children, ...rest }) {
  const { pathname } = useLocation();
  const hash = to.includes('#') ? to.split('#')[1] : '';
  const handle = (e) => {
    onClick?.(e);
    if (pathname === '/' && to.startsWith('/#') && hash) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', to);
    }
  };
  return <Link to={to} onClick={handle} {...rest}>{children}</Link>;
}
