import { Input } from "@/components/ui/input";
import { forwardRef, useMemo, useState } from "react";
import citiesList from "@/lib/cities-list";
type LocationInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onLocationSelected: (location: string) => void;
};
export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [lotationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus,setHasFocus] = useState(false)

    const cities = useMemo(() => {
      if (!lotationSearchInput.trim()) return [];

      const searchWords = lotationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [lotationSearchInput]);

    return (
      <div className="relative">
        <Input

        placeholder="Busca por departamento de Catamarca"
        type="search"
          value={lotationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          ref={ref}
        />
        <div>
          {lotationSearchInput.trim()&& hasFocus && (
            <div className="absolute bg-background shadow-xl border-x border-b rounded-b-lg z-20 divide-y w-full">
              {!cities.length && <p className="p-3"> No hay resultados</p>}
              {cities.map((city) => (
                <button 
                onMouseDown={(e=> {
                    e.preventDefault();
                    onLocationSelected(city)
                    setLocationSearchInput("")
                })}
                className="block w-full text-start p-2 hover:bg-slate-300" key={city}>{city}</button>
              ))}
            </div>
          )}
        </div>{" "}
      </div>
    );
  },
);
