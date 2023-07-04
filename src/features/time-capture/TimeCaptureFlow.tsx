import { Alert, AlertColor, Snackbar } from '@mui/material';

import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import AddFab from '../../components/aa-shared/AddFab';
import { AppFullScreenDialog } from '../../components/aa-shared/AppFullScreenDialog';
import { DEFAULT_HOURS } from '../../constants';
import { appRequest } from '../../fetch/fetch-client';
import { useLoadActiveConstructions } from '../../hooks/useLoadActiveConstructions';
import { useLoadJobs } from '../../hooks/useLoadJobs';
import { AppState } from '../../store';
import { getCurrentDBDate } from '../../utils';
import DailyEntryEditor from './DailyEntryEditor';

import { cloneDeep } from 'lodash';

interface Props {
  requestUpdate(): void;
}

export function TimeCaptureFlow({ requestUpdate }: Props) {
  useLoadActiveConstructions();
  useLoadJobs();

  const username = useSelector<AppState, string>((s) => s.login.user?.username || '');

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const initialDailyEntry = {
    date: getCurrentDBDate(),
    type: 'Arbeit',
    username,
  } as DailyEntry;

  const [dailyEntry, setDailyEntry] = useState<DailyEntry>(initialDailyEntry);

  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);

  const workEntriesIds = useRef<number[]>([]);
  const severity = useRef<AlertColor>('error');
  const alertMessage = useRef('');

  const errorHandler = useCallback((e: any) => {
    console.log(e);
    severity.current = 'error';
    alertMessage.current = 'Zeiten konnten nicht gespeichert werden';
    setOpenSnackbar(true);
    return;
  }, []);

  const handleSave = async () => {
    if (dailyEntry.type === 'Arbeit') {
      /*
      UPLOAD WORK ENTRIES
      */
      for (const we of workEntries) {
        we.username = username;
        we.date = dailyEntry.date;
        await appRequest('post')('work-entries', {
          data: we,
        })
          .then((res) => {
            workEntriesIds.current = [...workEntriesIds.current, res.data.id];
          })
          .catch((e) => {
            errorHandler(e);
            throw e;
          });
      }
    }

    /*
     CTREATE UPLOAD DAILY ENTRY
    */
    const toPersist = cloneDeep(dailyEntry);
    const sum =
      dailyEntry.type === 'Arbeit'
        ? workEntries.reduce((acc, next) => {
            return acc + Number(next.hours);
          }, 0) || 0
        : DEFAULT_HOURS;

    toPersist.sum = sum;
    if (sum > DEFAULT_HOURS) {
      toPersist.overload = sum - DEFAULT_HOURS;
    }
    if (sum < DEFAULT_HOURS) {
      toPersist.underload = sum - DEFAULT_HOURS;
    }
    if (workEntriesIds.current.length > 0) {
      toPersist.work_entries = workEntriesIds.current;
    }

    appRequest('post')('daily-entries', { data: toPersist })
      .then(() => {
        severity.current = 'success';
        alertMessage.current = 'Zeiten erfolgreich gespeichert';
        setOpenSnackbar(true);
      })
      .catch(errorHandler)
      .finally(() => {
        workEntriesIds.current = [];
        setWorkEntries([]);
        setDailyEntry(initialDailyEntry);
        setOpen(false);
        requestUpdate();
      });
  };

  return (
    <>
      <AppFullScreenDialog title="Zeit eintragen" open={open} onClose={() => setOpen(false)} onConfirm={handleSave}>
        <DailyEntryEditor
          workEntries={workEntries}
          dailyEntry={dailyEntry}
          setWorkEntries={setWorkEntries}
          setDailyEntry={setDailyEntry}
        />
      </AppFullScreenDialog>
      <AddFab onClick={() => setOpen(true)} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={3000}
      >
        <Alert severity={severity.current}>{alertMessage.current}</Alert>
      </Snackbar>
    </>
  );
}
