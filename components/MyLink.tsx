import Link from 'next/link';

import Typography from '@mui/material/Typography';

interface MyLinkProps {
  href: string;
  children: any;
}

export const MyLink = (props: MyLinkProps) => {
  const { href, children } = props;

  return (
    <Link href={href}>
      <Typography
        variant='subtitle2'
        component='span'
        color='text.secondary'
        sx={{
          textDecoration: 'underline',
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' },
        }}
      >
        {children}
      </Typography>
    </Link>
  );
};
