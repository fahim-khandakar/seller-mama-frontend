import { InputProps } from './config/type';

const InputWithValue: React.FC<InputProps> = ({
  labelName,
  inputPlaceholder = 'Write here...',
  inputType = 'text',
  inputName,
  IsDisabled = false,
  className,
  value,
  onChange,
  onKeyDown,
  required,
}) => {
  return (
    <div>
      <div>
        <div className={`w-full ${labelName && 'space-y-1'}`}>
          <div className="label">
            <label className="text-lg font-medium text-shadeOfGray dark:text-solidWhite">
              {labelName}
              {required && <span className="text-red-600"> *</span>}
            </label>
          </div>
          <input
            required={required}
            value={value}
            name={inputName}
            type={inputType}
            disabled={IsDisabled}
            placeholder={inputPlaceholder}
            className={`${className} border-2 w-full rounded-lg  py-2 pl-2 text-black bg-white bg-opacity-25  `}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default InputWithValue;
