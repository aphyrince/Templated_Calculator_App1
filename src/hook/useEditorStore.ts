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
        useEditorStore.setState({ editorPadId: id });
    },
    setEditorKeyId: (id: string) => {
        useEditorStore.setState({ editorKeyId: id });
    },
}));

export default useEditorStore;
