import { Stack } from '@mui/material';
import { OTPInput } from 'components';
import { OnCompleteHandler } from 'helpers/types';

const HomePage = () => {
  const onOTPComplete: OnCompleteHandler = ({
    value,
    reset = () => {},
    setError = () => {},
  }) => {
    console.log(value);
    setError('hello');
    reset();
  };

  return (
    <Stack
      sx={{
        width: 1,
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
      }}
    >
      <OTPInput onComplete={onOTPComplete} />
    </Stack>
  );
};

export default HomePage;
