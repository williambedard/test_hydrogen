import {useProductProvider} from '@shopify/hydrogen/client';

export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions} = useProductProvider();

  return (
    <>
      {options.map(({name, values}) => {
        return (
          <fieldset key={name}>
            <legend className="mb-4 text-xl font-semibold">{name}</legend>
            <div className="flex items-center flex-wrap space-x-4">
              {values.map((value) => {
                const checked = selectedOptions[name] === value;
                const id = `option-${name}-${value}`;

                return (
                  <label key={id} htmlFor={id}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name={`option[${name}]`}
                      value={value}
                      checked={checked}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    <span
                      className={`p-2 border text-lg rounded-full cursor-pointer ${
                        checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                      }`}
                    >
                      {value}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </>
  );
}
