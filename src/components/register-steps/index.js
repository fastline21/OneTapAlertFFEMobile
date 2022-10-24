import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import Step5 from './step-5';
import Step6 from './step-6';
import Step7 from './step-7';

const RegisterSteps = ({
  step,
  next,
  previous,
  cancel,
  register,
  barangays,
  submit,
  registerUser,
  error,
}) => {
  switch (step) {
    case 1:
      return (
        <Step2
          nextStep={() => next()}
          previousStep={() => previous()}
          registerStep={(data) => register(data)}
          barangays={barangays}
          errorStep={(data) => error(data)}
        />
      );
    case 2:
      return (
        <Step3
          nextStep={() => next()}
          previousStep={() => previous()}
          registerStep={(data) => register(data)}
          barangays={barangays}
          errorStep={(data) => error(data)}
        />
      );
    case 3:
      return (
        <Step4
          nextStep={() => next()}
          previousStep={() => previous()}
          registerStep={(data) => register(data)}
          errorStep={(data) => error(data)}
        />
      );
    case 4:
      return (
        <Step5
          nextStep={() => next()}
          previousStep={() => previous()}
          registerStep={(data) => register(data)}
          errorStep={(data) => error(data)}
        />
      );
    case 5:
      return (
        <Step6
          nextStep={() => next()}
          previousStep={() => previous()}
          registerStep={(data) => register(data)}
          errorStep={(data) => error(data)}
        />
      );
    case 6:
      return (
        <Step7
          nextStep={() => next()}
          previousStep={() => previous()}
          submitRegister={(data) => submit(data)}
          registerUser={registerUser}
          errorStep={(data) => error(data)}
        />
      );
    default:
      return (
        <Step1
          nextStep={() => next()}
          cancelStep={() => cancel()}
          registerStep={(data) => register(data)}
          errorStep={(data) => error(data)}
        />
      );
  }
};

export default RegisterSteps;
