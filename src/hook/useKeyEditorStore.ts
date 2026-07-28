import { create } from 'zustand';
import useKeyPadsStore from './useKeyPadsStore';

interface KeyEditorStore {
    key: Key_Type | undefined;
    setKey: (padId: string, id: string) => void;
}

const useKeyEditorStore = create<KeyEditorStore>()((set) => ({
    key: undefined,
    setKey: (padId: string, id: string) => {
        const newKey = useKeyPadsStore.getState().getKeyByIds(padId, id);
        useKeyEditorStore.setState({ key: newKey });
    },
}));

export default useKeyEditorStore;
