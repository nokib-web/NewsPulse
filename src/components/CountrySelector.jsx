import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const countries = [
    { name: "United States", code: "us" },
    { name: "United Kingdom", code: "gb" },
    { name: "India", code: "in" },
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Japan", code: "jp" },
    { name: "Brazil", code: "br" },
    { name: "South Africa", code: "za" },
];

export function CountrySelector({ value, onChange }) {
    return (
        <div className="flex flex-col gap-2 w-full max-w-[240px]">
            <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Select Region
            </label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-12 bg-white/50 backdrop-blur-sm border-white/20 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all rounded-xl">
                    <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 backdrop-blur-lg border-white/20 rounded-xl shadow-xl">
                    {countries.map((country) => (
                        <SelectItem
                            key={country.code}
                            value={country.code}
                            className="py-3 px-4 focus:bg-blue-50 focus:text-blue-600 rounded-lg cursor-pointer"
                        >
                            {country.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
