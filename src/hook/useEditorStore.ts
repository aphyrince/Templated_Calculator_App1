import { create } from 'zustand';

interface EditorStore {
    padId: string | null;
    keyId: string | null;
    setPadId: (id: string) => void;
    setKeyId: (id: string) => void;
}

const useEditorStore = create<EditorStore>()((set) => ({
    padId: null,
    keyId: null,
    setPadId: (id: string) => {
        console.log('useEditorStore -> setPadId! before : ', useEditorStore.getState().padId);
        useEditorStore.setState({ padId: id });
        console.log('useEditorStore -> setPadId! after : ', useEditorStore.getState().padId);
    },
    setKeyId: (id: string) => {
        console.log('useEditorStore -> setKeyId! before : ', useEditorStore.getState().keyId);
        useEditorStore.setState({ keyId: id });
        console.log('useEditorStore -> setKeyId! after : ', useEditorStore.getState().keyId);
    },
}));
