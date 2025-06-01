'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarClient() {
  return (
    <ProgressBar
      height="4px"
      color="#FFDB00"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
