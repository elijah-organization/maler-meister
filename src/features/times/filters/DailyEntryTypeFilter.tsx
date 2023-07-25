import { MenuItem } from '@mui/material';

import { AppGridField } from '../../../components/AppGridField';
import { AppTextField } from '../../../components/aa-shared/AppTextField';

interface Props {
  type: DailyEntryType | undefined;
  setType(type: DailyEntryType): void;
}

export default function DailyEntryTypeFilter({ setType, type }: Props) {
  return (
    <AppGridField>
      <AppTextField value={type} onChange={(ev) => setType(ev.target.value as DailyEntryType)} label="Tätigkeit" select>
        <MenuItem>Alle</MenuItem>
        <MenuItem value={'Arbeit'}>Arbeit</MenuItem>
        <MenuItem value={'Urlaub'}>Urlaub</MenuItem>
        <MenuItem value={'Krank'}>Krank</MenuItem>
        <MenuItem value={'Schule'}>Schule</MenuItem>
      </AppTextField>
    </AppGridField>
  );
}
