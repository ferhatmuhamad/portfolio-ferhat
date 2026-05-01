import { ChangeEvent } from "react";
import { Plus, X } from "lucide-react";

interface Props {
    label?: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
}

export function StringListInput({
    label,
    items,
    onChange,
    placeholder = "Add item",
}: Props) {
    const update = (i: number, v: string) => {
        const next = [...items];
        next[i] = v;
        onChange(next);
    };
    const add = () => onChange([...items, ""]);
    const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

    return (
        <div>
            {label && (
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-300">
                    {label}
                </p>
            )}
            <div className="space-y-2">
                {items.map((it, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            value={it}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                update(i, e.target.value)
                            }
                            placeholder={placeholder}
                            className="input-field flex-1"
                        />
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={add}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-3 py-2 text-xs font-medium text-ink-300 hover:border-brand-500/40 hover:text-brand-300"
                >
                    <Plus size={14} />
                    Add
                </button>
            </div>
        </div>
    );
}
