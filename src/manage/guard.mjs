// /manage merge doar local până există autentificare: fără parolă doar pe localhost.
// Pe un server public (ex. Vercel) panoul e închis; se poate deschide explicit cu MANAGE_PUBLIC=1.
import {headers} from 'next/headers';

const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

export const managePublic = () => process.env.MANAGE_PUBLIC === '1';
export const isLocalHost = host => !process.env.VERCEL && LOCAL.test(host ?? '');
export const canManage = host => isLocalHost(host) || managePublic();

export async function canManageRequest() {
  return canManage((await headers()).get('host'));
}
