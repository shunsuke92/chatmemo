import { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ResponsiveStyleValue } from '@mui/system';

interface MyTypography {
  variant?:
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
  color?: string;
  sx?: SxProps<Theme>;
  fontWeight?:
    | ResponsiveStyleValue<string | (string & {}) | (number & {}) | undefined>
    | ((theme: Theme) => ResponsiveStyleValue<string | (string & {}) | (number & {}) | undefined>);
  fontSize?: string;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  children: any;
}

export const MyTypography = (props: MyTypography) => {
  // Safariでテキストを表示すると動作が遅くなる事象の対応として、button要素でテキストを表示する
  const { children, variant, color, sx, fontWeight, fontSize, mt, mb, mr, ml, pt, pb, pr, pl } =
    props;

  return (
    <Typography
      variant={variant}
      component='button'
      role='article'
      color={color ?? 'text.primary'}
      fontWeight={fontWeight}
      fontSize={fontSize}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      pt={pt}
      pb={pb}
      pr={pr}
      pl={pl}
      sx={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'auto',
        outline: 'none',
        pt: 0,
        pb: 0,
        pr: 0,
        pl: 0,
        appearance: 'none',
        flexGrow: 1,
        textAlign: 'left',
        display: 'inline',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
