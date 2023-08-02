import {useProductProvider} from '@shopify/hydrogen/client';

export default function ProductOptions() {
  const {options, setSelectedOption} = useProductProvider();

  return options.map(({name, values}) => {
    return (
      <div key={name} className="my-6">
        <label
          className="text-gray-900 text-xl font-semibold mb-4 block"
          htmlFor={name}
        >
          {name}
        </label>
        <select
          id={name}
          className="border border-gray-300 text-lg p-2 rounded w-full"
          onChange={(event) => {
            setSelectedOption(name, event.target.value);
          }}
        >
          {values.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    );
  });
}
