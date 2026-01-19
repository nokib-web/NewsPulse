import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const countries = [
    // North America
    { name: "United States", code: "us" },
    { name: "Canada", code: "ca" },
    { name: "Mexico", code: "mx" },

    // Europe
    { name: "United Kingdom", code: "gb" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Italy", code: "it" },
    { name: "Spain", code: "es" },
    { name: "Netherlands", code: "nl" },
    { name: "Belgium", code: "be" },
    { name: "Switzerland", code: "ch" },
    { name: "Austria", code: "at" },
    { name: "Poland", code: "pl" },
    { name: "Sweden", code: "se" },
    { name: "Norway", code: "no" },
    { name: "Denmark", code: "dk" },
    { name: "Finland", code: "fi" },
    { name: "Ireland", code: "ie" },
    { name: "Portugal", code: "pt" },
    { name: "Greece", code: "gr" },
    { name: "Czech Republic", code: "cz" },
    { name: "Romania", code: "ro" },
    { name: "Ukraine", code: "ua" },
    { name: "Russia", code: "ru" },

    // Asia
    { name: "India", code: "in" },
    { name: "China", code: "cn" },
    { name: "Japan", code: "jp" },
    { name: "South Korea", code: "kr" },
    { name: "Singapore", code: "sg" },
    { name: "Malaysia", code: "my" },
    { name: "Indonesia", code: "id" },
    { name: "Thailand", code: "th" },
    { name: "Philippines", code: "ph" },
    { name: "Vietnam", code: "vn" },
    { name: "Pakistan", code: "pk" },
    { name: "Bangladesh", code: "bd" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "United Arab Emirates", code: "ae" },
    { name: "Israel", code: "il" },
    { name: "Turkey", code: "tr" },

    // Oceania
    { name: "Australia", code: "au" },
    { name: "New Zealand", code: "nz" },

    // South America
    { name: "Brazil", code: "br" },
    { name: "Argentina", code: "ar" },
    { name: "Colombia", code: "co" },
    { name: "Chile", code: "cl" },
    { name: "Peru", code: "pe" },
    { name: "Venezuela", code: "ve" },

    // Africa
    { name: "South Africa", code: "za" },
    { name: "Nigeria", code: "ng" },
    { name: "Egypt", code: "eg" },
    { name: "Kenya", code: "ke" },
    { name: "Morocco", code: "ma" },
];

export function CountrySelector({ value, onChange }) {
    return (
        <div className="flex flex-col gap-2 w-full max-w-[240px]">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Region
            </label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full h-12 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all rounded-xl dark:text-white text-slate-900 font-medium">
                    <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900/90 backdrop-blur-lg border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                    {countries.map((country) => (
                        <SelectItem
                            key={country.code}
                            value={country.code}
                            className="py-3 px-4 focus:bg-blue-50 dark:focus:bg-blue-900/30 focus:text-blue-700 dark:focus:text-blue-400 rounded-lg cursor-pointer dark:text-slate-200 text-slate-700 font-medium"
                        >
                            {country.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
