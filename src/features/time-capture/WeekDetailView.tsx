import { Box, CircularProgress, Typography } from '@mui/material';

import { DEFAULT_HOURS } from '../../constants';

import { eachDayOfInterval, endOfWeek, formatISO, startOfWeek } from 'date-fns';

interface Props {
  data: DailyEntry[];
}
export function WeekDetailView({ data }: Props) {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });

  const allDays = eachDayOfInterval({ end, start });

  const getValue = (date: Date) => {
    const ISODate = formatISO(date, { representation: 'date' });
    const entries = data.filter((d) => d.date === ISODate);
    const sum = entries.reduce((acc, next) => {
      return acc + next.sum;
    }, 0);

    return {
      sum,
      value: Math.min(100, (sum / DEFAULT_HOURS) * 100),
    };
  };

  return (
    <Box display="flex" justifyContent="space-between">
      {allDays.map((date, index) => {
        return (
          <Box key={index} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption">
              {new Intl.DateTimeFormat('de-DE', {
                weekday: 'short',
              }).format(date)}
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress color="secondary" variant="determinate" value={getValue(date).value} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div">
                  {getValue(date).sum}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
