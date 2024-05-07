import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Center,
  FormErrorMessage,
  CheckboxGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FieldError, Merge, SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";
import FormDataSchema from '../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

type FormFields = z.infer<typeof FormDataSchema>

const steps = [
  { title: 'First', description: 'Personal Info', fields: ["firstName", "lastName", "password", "confirmPassword", "interests"] },
  { title: 'Second', description: 'Avatar', fields: ["avatar"] },
  { title: 'Third', description: 'Congratulations' },
]

function Form() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(FormDataSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const onPrevClick = () => {
    if (activeStep >= 1) {
      setActiveStep(activeStep - 1);
    }
  }

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
    <Box w={[null, null, 480]}>
      <Stepper display={["none", "none", "flex"]} index={activeStep} mb="40px">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}

      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <>
            <FormControl mb="20px" isRequired isInvalid={!!errors.firstName}>
              <FormLabel>First Name:</FormLabel>
              <Input type="text" {...register('firstName')} />
              <FormErrorMessage color="red" mt="10px">{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb="20px" isRequired isInvalid={!!errors.lastName}>
              <FormLabel>Last Name:</FormLabel>
              <Input type="text" {...register('lastName')} />
              <FormErrorMessage color="red" mt="10px">{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb="20px" isRequired isInvalid={!!errors.password}>
              <FormLabel>Password:</FormLabel>
              <Input type="password" {...register('password')} />
              <FormErrorMessage color="red" mt="10px">{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb="20px" isRequired isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password:</FormLabel>
              <Input type="password" {...register('confirmPassword')} />
              <FormErrorMessage color="red" mt="10px">{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb="20px" isRequired isInvalid={!!errors.interests}>
              <FormLabel>Interests:</FormLabel>
              <CheckboxGroup value={watch('interests')}>
                <Stack direction={["column"]}>
                  <Checkbox {...register('interests')} id="sports" value="Sports">Sports</Checkbox>
                  <Checkbox {...register('interests')} id="music" value="Music">Music</Checkbox>
                  <Checkbox {...register('interests')} id="dancing" value="Dancing">Dancing</Checkbox>
                  <Checkbox {...register('interests')} id="games" value="Games">Games</Checkbox>
                </Stack>
              </CheckboxGroup>
              <FormErrorMessage color="red" mt="10px">{errors.interests?.message}</FormErrorMessage>
            </FormControl>
          </>
        )}
        {activeStep === 1 && (
          <FormControl mb="20px" isRequired isInvalid={!!errors.avatar}>
            <FormLabel>Upload avatar:</FormLabel>
            <Input type="file" {...register('avatar')} />
            <FormErrorMessage color="red" mt="10px"> {(errors.avatar as Merge<FieldError, (FieldError | undefined)[]> | undefined)?.message}</FormErrorMessage>
          </FormControl>
        )}

        {activeStep === 2 && (
          <Center mb="20px">
            <Text align="center" fontSize="3xl">Thanks for registering!</Text>
          </Center>
        )}
        <Flex justifyContent="center" gap="20px">
          {activeStep >= 1 && (
            <Button onClick={onPrevClick} type="button">Previous</Button>
          )}
          <Button onClick={onNextClick} type={activeStep === 2 ? "submit" : "button"}>{activeStep === 1 ? "Submit" : "Next"}</Button>
        </Flex>

      </form>
    </Box >
  );
}

export default Form;
