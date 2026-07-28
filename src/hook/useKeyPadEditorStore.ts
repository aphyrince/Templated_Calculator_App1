import { create } from 'zustand';
import useKeyPadsStore from './useKeyPadsStore';

interface KeyPadEditorStore {
    keyPad: KeyPad_Type | undefined;
    setKeyPad: (id: string) => void;
}

const useKeyPadEditorStore = create<KeyPadEditorStore>()((set) => ({
    keyPad: undefined,
    setKeyPad: (id: string) => {
        const newKeyPad = useKeyPadsStore.getState().getKeyPadById(id);
        useKeyPadEditorStore.setState({ keyPad: newKeyPad });
    },
}));

export default useKeyPadEditorStore;
