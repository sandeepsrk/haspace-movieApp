import { createContext, useContext } from 'react';

export enum Reload {
    reload = "false",
    load = "true"
}

export type ReloadContextType = {
    reload: Reload;
    setReload: (Reload: Reload) => void;
}

export const ReloadContext = createContext<ReloadContextType>({ reload: Reload.reload, setReload: reload => console.warn('no theme provider')});
export const useReload = () => useContext(ReloadContext);