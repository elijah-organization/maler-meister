import { MenuItem, TextFieldProps } from '@mui/material';

import { useSelector } from 'react-redux';

import { AppTextField } from '../../../../components/AppTextField';
import { AppState } from '../../../../store';

export function JobGroupSelect({ onChange, value }: TextFieldProps) {
  const appJobs = useSelector<AppState, AppJob[]>((s) => s.jobs.jobs || []);

  return (
    <AppTextField onChange={onChange} label="Tätigkeitsgruppe" value={value} select>
      {appJobs.map(({ id, name, position }) => (
        <MenuItem value={id}>{`${position === null ? '' : position} ${name}`}</MenuItem>
      ))}
    </AppTextField>
  );
}
