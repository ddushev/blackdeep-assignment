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
  Text,
  Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import FormDataSchema from '../../lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';

type FormFields = z.infer<typeof FormDataSchema>

const steps = [
  { title: 'First', description: 'Personal Info' },
  { title: 'Second', description: 'Avatar' },
  { title: 'Third', description: 'Congratulations' },
]

function Form() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onPrevClick = () => {
    if (activeStep >= 1) {
      setActiveStep(activeStep - 1);
    }
  }

  const onNextClick = async () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }
  }


  return (
    <Box w="480px">
      <Stepper index={activeStep} mb="40px">
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
            <FormControl mb="20px">
              <FormLabel>First Name:</FormLabel>
              <Input type="text" {...register('firstName')} />
              {errors.firstName && <span>This field is required</span>}
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Last Name:</FormLabel>
              <Input type="text" {...register('lastName')} />
              {errors.lastName && <span>This field is required</span>}
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Password:</FormLabel>
              <Input type="password" {...register('password')} />
              {errors.password && <span>This field is required</span>}
            </FormControl>
            <FormControl mb="20px">
              <FormLabel>Confirm Password:</FormLabel>
              <Input type="password" {...register('confirmPassword')} />
              {errors.confirmPassword && <span>This field is required</span>}
            </FormControl>
            <FormControl mb="20px" >
              <FormLabel>Interests:</FormLabel>
              <Flex direction="column">
                <Checkbox {...register('interests')} id="sports" value="Sports">Sports</Checkbox>
                <Checkbox {...register('interests')} id="music" value="Music">Music</Checkbox>
                <Checkbox {...register('interests')} id="dancing" value="Dancing">Dancing</Checkbox>
                <Checkbox {...register('interests')} id="games" value="Games">Games</Checkbox>
              </Flex>
              {errors.interests && <span>Please select at least one interest</span>}
            </FormControl>
          </>
        )}
        {activeStep === 1 && (
          <FormControl mb="20px">
            <FormLabel>Upload avatar:</FormLabel>
            <Input type="file" {...register('avatar')} />
            {errors.avatar && <span>This field is required</span>}
          </FormControl>
        )}

        {activeStep === 2 && (
          <Center mb="20px">
            <Text fontSize="3xl">Thanks for registering!</Text>
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
