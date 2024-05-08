import {
  Box,
  Button,
  useSteps,
  Center,
  Text,
} from '@chakra-ui/react';
import FormDataSchema from '../../lib/schema';
import FormFields from '../../lib/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FromSteps from '../ui/FormSteps/FormSteps';
import FormFirstStep from '../ui/FormFirstStep';
import FormSecondStep from '../ui/FormSecondStep';


const steps = [
  { title: 'Step 1', description: 'Personal Info', fields: ['firstName', 'lastName', 'password', 'confirmPassword', 'interests'] },
  { title: 'Step 2', description: 'Avatar', fields: ['avatar'] },
  { title: 'Step 3', description: 'Finish' },
]

function Form() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(FormDataSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  type FieldName = keyof FormFields

  const onNextClick = async () => {
    const fields = steps[activeStep].fields;
    const areValid = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!areValid) {
      return;
    }
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <Box w={[null, 380, 480]}>
      <FromSteps steps={steps} activeStep={activeStep} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && <FormFirstStep register={register} errors={errors} />}
        {activeStep === 1 && <FormSecondStep register={register} errors={errors} />}

        {activeStep === 2 && (
          <Center mb='20px'>
            <Text align='center' fontSize='3xl'>Thanks for registering!</Text>
          </Center>
        )}
        <Center>
          <Button onClick={onNextClick} type={activeStep === 2 ? 'submit' : 'button'}>{activeStep === 1 ? 'Submit' : 'Next'}</Button>
        </Center>

      </form>
    </Box >
  );
}

export default Form;
