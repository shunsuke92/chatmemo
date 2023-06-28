import Link from 'next/link';

import { MyTypography } from './MyTypography';

interface MyLinkProps {
  href: string;
  children: any;
}

export const MyLink = (props: MyLinkProps) => {
  const { href, children } = props;

  return (
    <Link href={href}>
      <MyTypography
        variant='subtitle2'
        color='text.secondary'
        sx={{
          textDecoration: 'underline',
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' },
        }}
      >
        {children}
      </MyTypography>
    </Link>
  );
};
