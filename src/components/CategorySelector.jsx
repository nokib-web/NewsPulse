import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const categories = [
    { name: "General", value: "general" },
    { name: "Business", value: "business" },
    { name: "Technology", value: "technology" },
    { name: "Entertainment", value: "entertainment" },
    { name: "Health", value: "health" },
    { name: "Science", value: "science" },
    { name: "Sports", value: "sports" },
];

export function CategorySelector({ value, onChange }) {
    return (
        <div className="flex flex-col gap-2 w-full max-w-[240px]">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                News Category
            </label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-12 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all rounded-xl dark:text-white text-slate-900 font-medium">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900/90 backdrop-blur-lg border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                    {categories.map((cat) => (
                        <SelectItem
                            key={cat.value}
                            value={cat.value}
                            className="py-3 px-4 focus:bg-blue-50 dark:focus:bg-blue-900/30 focus:text-blue-700 dark:focus:text-blue-400 rounded-lg cursor-pointer dark:text-slate-200 text-slate-700 font-medium"
                        >
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
