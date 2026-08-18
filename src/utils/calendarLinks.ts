import { ExportService } from '../services/exportService';
import { VacationPlan } from '../types/vacationPlan';
import { format } from 'date-fns';

export function buildGoogleCalendarUrl(
  summary: string,
  start: Date,
  end: Date,
  description?: string
): string {
  const fmt = (d: Date) => format(d, "yyyyMMdd'T'HHmmss'Z'");
  const endExclusive = new Date(end);
  endExclusive.setDate(endExclusive.getDate() + 1);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: summary,
    dates: `${fmt(start)}/${fmt(endExclusive)}`,
  });
  if (description) params.set('details', description);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookCalendarUrl(
  summary: string,
  start: Date,
  end: Date,
  description?: string
): string {
  const fmt = (d: Date) => format(d, "yyyy-MM-dd'T'HH:mm:ss");
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: summary,
    startdt: fmt(start),
    enddt: fmt(end),
  });
  if (description) params.set('body', description);
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadVacationIcs(vacations: VacationPlan[], filename: string): void {
  const events = vacations
    .filter((v) => v.isVisible !== false)
    .map((vacation) => ({
      start: vacation.start,
      end: vacation.end,
      summary: 'Urlaub',
      description: 'Geplant mit ferien-planung.de',
    }));
  const ics = ExportService.createICSFile(events);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
