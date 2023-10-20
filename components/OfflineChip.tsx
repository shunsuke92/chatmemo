import { useRecoilValue } from 'recoil';

import CircleIcon from '@mui/icons-material/Circle';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { isOnlineState } from '../states/isOnlineState';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[0],
    fontSize: 11,
    padding: 0,
  },
}));

export const OfflineChip = () => {
  const isOnline = useRecoilValue(isOnlineState);

  return (
    <>
      {isOnline ? (
        <CustomTooltip title='オンライン' placement='left'>
          <CircleIcon sx={{ width: '10px', mr: { xs: 2, sm: 4 }, color: 'primary.dark' }} />
        </CustomTooltip>
      ) : (
        <CustomTooltip title='オフライン' placement='left'>
          <CircleIcon sx={{ width: '10px', mr: { xs: 2, sm: 4 }, color: 'error.main' }} />
        </CustomTooltip>
      )}
    </>
  );
};
