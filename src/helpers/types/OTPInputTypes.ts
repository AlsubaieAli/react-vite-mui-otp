import { TextFieldProps } from '@mui/material';
import { ClipboardEvent, Dispatch, SetStateAction } from 'react';

export type OTPInputType = 'text' | 'number';
export type OnCompletePayload = {
  value: string;
  reset?: OnResetHandler;
  setError?: Dispatch<SetStateAction<string>>;
};

export type OnNextHandler = (value: string, isMultiple?: boolean) => void;
export type OnBackHandler = () => void;
export type OnResetHandler = () => void;
export type OnCompleteHandler = (payload: OnCompletePayload) => void;
export type OnPasteHandler = (values: ClipboardEvent<HTMLInputElement>) => void;

export type OTPInputCellProps = {
  isFocused: boolean;
  value: string;
  size: number;
  onNext: OnNextHandler;
  onBack: OnBackHandler;
  inputProps?: TextFieldProps;
  error?: string;
};

export type OTPInputProps = {
  length?: number;
  size?: number;
  types?: OTPInputType[];
  inputProps?: TextFieldProps;
  onComplete?: OnCompleteHandler;
};
