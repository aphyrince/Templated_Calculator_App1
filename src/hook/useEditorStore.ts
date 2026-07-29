import { create } from 'zustand';

interface EditorStore {
    editorPadId: string | null;
    editorKeyId: string | null;
    setEditorPadId: (id: string) => void;
    setEditorKeyId: (id: string) => void;
}

const useEditorStore = create<EditorStore>()((set) => ({
    editorPadId: null,
    editorKeyId: null,
    setEditorPadId: (id: string) => {
        console.log('useEditorStore -> setPadId! before : ', useEditorStore.getState().editorPadId);
        useEditorStore.setState({ editorPadId: id });
        console.log('useEditorStore -> setPadId! after : ', useEditorStore.getState().editorPadId);
    },
    setEditorKeyId: (id: string) => {
        console.log('useEditorStore -> setKeyId! before : ', useEditorStore.getState().editorKeyId);
        useEditorStore.setState({ editorKeyId: id });
        console.log('useEditorStore -> setKeyId! after : ', useEditorStore.getState().editorKeyId);
    },
}));

export default useEditorStore;
