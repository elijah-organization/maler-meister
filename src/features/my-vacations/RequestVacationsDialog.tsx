import BeachAccessIcon from '@mui/icons-material/BeachAccessOutlined';
import { Box, SvgIconProps, Typography } from '@mui/material';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { AppDialog } from '../../components/AppDialog';
import AppGrid from '../../components/AppGrid';
import { AppGridItem } from '../../components/AppGridItem';
import { AppTextField } from '../../components/AppTextField';
import { DEFAULT_HOURS } from '../../constants';
import { dailyEntryById } from '../../fetch/endpoints';
import { appRequest } from '../../fetch/fetch-client';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useHolidays } from '../../hooks/useHolidays';
import { isHoliday, isWeekend } from '../../utilities';

import { eachDayOfInterval, formatISO } from 'date-fns';

interface Props {
  open: boolean;
  onClose(): void;
}

export default function RequestVacationsDialog({ open, onClose }: Props) {
  const user = useCurrentUser();

  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());

  const holidaysStart = useHolidays(start.getFullYear());
  const holidaysEnd = useHolidays(end.getFullYear());
  const allHolidays = useMemo(() => [...holidaysStart, ...holidaysEnd], [holidaysEnd, holidaysStart]);

  const [calDays, setCalDays] = useState(0);
  const [holidayDays, setHolidayDays] = useState(0);

  const invalid = start > end;

  const iconProps: SvgIconProps = useMemo(() => {
    return {
      sx: {
        fontSize: 80,
      },
      color: 'disabled',
    };
  }, []);

  useEffect(() => {
    if (!invalid) {
      let acc = 0;
      try {
        const allDays = eachDayOfInterval({ start: start, end: end });

        for (const date of allDays) {
          if (isHoliday(date, allHolidays)) {
            continue;
          }
          if (isWeekend(date)) {
            continue;
          }
          acc += 1;
        }
        setCalDays(allDays.length);
        setHolidayDays(acc);
      } catch (e) {
        console.log(e);
      }
    }
  }, [start, end, invalid, allHolidays]);

  const handleHolidaysRequest = useCallback(async () => {
    const allDays = eachDayOfInterval({ start: start, end: end });

    const requests = allDays.map((date) => {
      if (!isHoliday(date, allHolidays) && !isWeekend(date)) {
        const dailyEntry: Partial<DailyEntry> = {
          type: 'Urlaub',
          sum: DEFAULT_HOURS,
          tenant: user?.tenant,
          username: user?.username,
          date: formatISO(date, { representation: 'date' }),
        };
        return () => appRequest('post')(dailyEntryById(''), { data: dailyEntry });
      }
    });

    await Promise.allSettled(requests.map((r) => r?.())).then(onClose);
  }, [end, start, user, allHolidays, onClose]);

  return (
    <AppDialog
      confirmDisabled={invalid || holidayDays < 1}
      title="Urlaub eintragen"
      open={open}
      onClose={onClose}
      onConfirm={handleHolidaysRequest}
    >
      <Box p={2} display="flex" flexDirection="column" alignItems={'center'} gap={6}>
        <AppGrid>
          <AppGridItem>
            <AppTextField
              label="Ab"
              type={'date'}
              value={formatISO(start, { representation: 'date' })}
              onChange={(ev) => {
                setStart(new Date(ev.target.value));
              }}
            />
          </AppGridItem>
          <AppGridItem>
            <AppTextField
              inputProps={{ min: formatISO(start, { representation: 'date' }) }}
              label="Bis"
              type={'date'}
              value={formatISO(end, { representation: 'date' })}
              onChange={(ev) => {
                setEnd(new Date(ev.target.value));
              }}
            />
          </AppGridItem>
        </AppGrid>
        <Box>
          <Typography align="center" color={'primary'} variant="h6">
            {`Kalendertage: ${calDays}`}
          </Typography>
          <Typography align="center" color={'primary'} variant="h6">
            {`Urlaubstage: ${holidayDays}`}
          </Typography>
        </Box>
        <>
          <BeachAccessIcon {...iconProps} />
          <Typography variant="subtitle2">Genieße die Zeit!</Typography>
        </>
      </Box>
    </AppDialog>
  );
}
