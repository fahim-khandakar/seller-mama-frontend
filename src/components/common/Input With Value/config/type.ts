export type InputProps = {
  labelName?: string;
  inputPlaceholder?: string;
  inputType?: string;
  inputName?: string;
  IsDisabled?: boolean;
  className?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  required?: boolean;
};
