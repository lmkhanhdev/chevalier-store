import { create } from "zustand";

import { Product } from "@/types";

interface PreviewModalStore {
    isOpen: boolean;
    data?: Product
    selectedSize?: string;
    onOpen: (data: Product) => void
    onClose: () => void,
    onSelectSize: (size: string) => void;
}

const usePreviewStore = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    selectedSize: undefined,
    onOpen: (data: Product) => set({ data, isOpen: true }),
    onClose: () => set({isOpen: false}),
    onSelectSize: (size: string) => set({ selectedSize: size })
}))
 
export default usePreviewStore;