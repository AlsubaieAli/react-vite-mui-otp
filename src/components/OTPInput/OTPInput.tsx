import { Stack, TextField } from '@mui/material';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import {
  OTPInputType,
  OTPInputCellProps,
  OTPInputProps,
  OnBackHandler,
  OnCompleteHandler,
  OnCompletePayload,
  OnNextHandler,
  OnPasteHandler,
} from 'helpers/types';

const defaultLength = 4;
const defaultSize = 40;
const defaultType: OTPInputType = 'number';
const defaultOnCompleteHandler: OnCompleteHandler = ({
  value,
  reset = () => {},
}) => {
  const delay = 1000;

  console.log(`Value is: ${value}`);
  console.log(`Resetting in ${delay} ms`);

  const timeout = setTimeout(() => {
    reset();
    clearInterval(timeout);
  }, 1000);
};

const OTPInputCell: FC<OTPInputCellProps> = (props) => {
  const {
    value = '',
    size = defaultSize,
    isFocused = false,
    onNext = (_value) => {},
    onBack = () => {},
    inputProps = {},
    error = '',
  } = props;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onNext(target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const preventedKeys = ['ArrowUp', 'ArrowDown', '-', '+', 'e'];

    if (
      (inputProps.type === 'number' && preventedKeys.includes(key)) ||
      key === 'Tab'
    )
      event.preventDefault();

    if (key === 'Backspace') {
      onBack();
    }
  };

  const handlePase: OnPasteHandler = (event) => {
    event.preventDefault();
    onNext(event.clipboardData.getData('text'), true);
  };

  return (
    <TextField
      value={value}
      onPaste={handlePase}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      inputRef={(input) => input && isFocused && input.focus()}
      disabled={!!value}
      error={!!error}
      className={error ? 'error' : ''}
      sx={{
        '& .MuiInputBase-input': {
          p: 0,
          width: size,
          height: size,
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          caretColor: 'transparent',
        },
        '&.error': {
          animation: 'shakeEffect 0.5s cubic-bezier(.36,.07,.19,.97) both',
        },
      }}
      {...inputProps}
    />
  );
};

const OTPInput: FC<OTPInputProps> = (props) => {
  const {
    length = defaultLength,
    size = defaultSize,
    inputProps = {},
    types = [],
    onComplete = defaultOnCompleteHandler,
  } = props;

  const initialValues = Array(length).fill('');
  const initialPosition = 0;

  const [activeCell, setActiveCell] = useState(initialPosition);
  const [inputValue, setInputValue] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState('');

  const resetInput = () => {
    setInputValue(initialValues);
    setActiveCell(initialPosition);
  };

  const onNext: OnNextHandler = (value: string, isMultiple = false) => {
    setErrorMessage('');

    let newActiveCell = activeCell;
    const newInputValue = inputValue;

    if (isMultiple) {
      value
        .slice(0, inputValue.length - activeCell)
        .split('')
        .forEach((singleValue) => {
          newInputValue[newActiveCell] = singleValue;
          newActiveCell++;
        });
    } else {
      newInputValue[newActiveCell] = value;
      newActiveCell++;
    }

    setInputValue([...newInputValue]);
    setActiveCell(newActiveCell);

    if (newActiveCell === length) {
      const payload: OnCompletePayload = {
        value: inputValue.join(''),
        reset: resetInput,
        setError: setErrorMessage,
      };
      onComplete(payload);
    }
  };

  const onBack: OnBackHandler = () => {
    if (activeCell <= 0) return;

    setInputValue((prev) => {
      prev[activeCell - 1] = '';
      return [...prev];
    });
    setActiveCell((prev) => prev - 1);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap={4}>
      {inputValue.map((value, index) => (
        <OTPInputCell
          key={index}
          value={value}
          onNext={onNext}
          onBack={onBack}
          error={errorMessage}
          size={size}
          isFocused={index === activeCell}
          inputProps={{
            type: types[index] || defaultType,
            ...inputProps,
          }}
        />
      ))}
    </Stack>
  );
};

export default OTPInput;
