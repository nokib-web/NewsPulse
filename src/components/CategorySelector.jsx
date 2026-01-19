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
            <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                News Category
            </label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-12 bg-white/50 backdrop-blur-sm border-white/20 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all rounded-xl">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 backdrop-blur-lg border-white/20 rounded-xl shadow-xl">
                    {categories.map((cat) => (
                        <SelectItem
                            key={cat.value}
                            value={cat.value}
                            className="py-3 px-4 focus:bg-blue-50 focus:text-blue-600 rounded-lg cursor-pointer"
                        >
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
