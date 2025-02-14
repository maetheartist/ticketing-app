import { Link, useLocation } from 'react-router-dom';
import { ABOUT_PAGE, EVENTS_PAGE, TICKET_PAGE } from '../../config/routes';
import Logo from '../common/logo';
import { ArrowRightIcon } from '../icons';
import { Button } from 'antd';
import useNavigation from '../../hooks/use-navigate';

const navList = [
  {
    label: 'Events',
    href: EVENTS_PAGE,
  },
  {
    label: 'My Tickets',
    href: TICKET_PAGE,
  },
  {
    label: 'About',
    href: ABOUT_PAGE,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { navigate } = useNavigation();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-200/[0.8] backdrop-blur-md border-b border-teal shadow-md">
      <div className="max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-10">
        <Logo />
        <div className="hidden md:flex items-center gap-9">
          {navList.map((nav, i) => (
            <Link
              key={i}
              to={nav.href}
              className={`${
                nav.href === pathname
                  ? 'text-white font-semibold'
                  : 'text-darkgray hover:text-white transition-all'
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
        <Button
          type="default"
          size="large"
          className="flex gap-2 items-center justify-start text-base text-gray-100"
          onClick={() => {
            navigate(TICKET_PAGE);
          }}
        >
          <p className="uppercase font-jeju">My Tickets</p>
          <ArrowRightIcon className="text-base" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
