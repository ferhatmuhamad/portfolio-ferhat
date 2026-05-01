import { ChangeEvent, useRef, useState } from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";

interface Props {
    value?: string | null;
    onChange: (file: File | null) => void;
    label?: string;
    accept?: string;
}

export function ImageUpload({
    value,
    onChange,
    label = "Upload image",
    accept = "image/*",
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(value || null);

    const handle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const clear = () => {
        onChange(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div>
            {preview ? (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-32 w-32 rounded-xl border border-white/10 object-cover"
                    />
                    <button
                        type="button"
                        onClick={clear}
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-ink-300 transition-colors hover:border-brand-500/40 hover:bg-brand-500/5 hover:text-brand-300"
                >
                    <ImageIcon size={22} />
                    <span className="text-[10px] uppercase tracking-wider">
                        {label}
                    </span>
                </button>
            )}
            {preview && (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="ml-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink-100 hover:bg-white/10"
                >
                    <Upload size={12} />
                    Replace
                </button>
            )}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                onChange={handle}
            />
        </div>
    );
}
