import Stack from '@mui/material/Stack';
import { AddCommentButton } from './AddCommentButton';
import { InternalData, useGetIsAllMemo } from './Timeline';
import { MoreButton } from './MoreButton';

interface LowerButtonsProps {
  data: InternalData;
}

export const LowerButtons = (props: LowerButtonsProps) => {
  const { data } = props;

  const idAllMemoTab = useGetIsAllMemo();

  return (
    <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='center'>
      {idAllMemoTab && <AddCommentButton data={data} />}

      <MoreButton data={data} />
    </Stack>
  );
};
