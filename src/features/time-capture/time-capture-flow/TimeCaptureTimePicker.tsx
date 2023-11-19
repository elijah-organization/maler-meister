import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';

export function TimeCaptureTimePicker(props: TimePickerProps<Date>) {
  return <TimePicker<Date> minutesStep={10} slotProps={{ textField: { size: 'small' } }} {...props} />;
}
