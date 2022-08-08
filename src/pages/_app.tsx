import "../styles/globals.css"
import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import superjson from "superjson"
import type { AppRouter } from '../backend/router';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson
    };
  },
  ssr: false,
})(MyApp);