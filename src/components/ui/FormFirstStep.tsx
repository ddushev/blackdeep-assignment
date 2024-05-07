import { Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import IFormStepProps from '../../lib/interfaces';



function FormFirstStep({ register, errors }: IFormStepProps) {
  return (
    <>
      <FormControl mb='20px' isRequired isInvalid={!!errors.firstName}>
        <FormLabel>First Name:</FormLabel>
        <Input type='text' {...register('firstName')} />
        <FormErrorMessage color='red' mt='10px'>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb='20px' isRequired isInvalid={!!errors.lastName}>
        <FormLabel>Last Name:</FormLabel>
        <Input type='text' {...register('lastName')} />
        <FormErrorMessage color='red' mt='10px'>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb='20px' isRequired isInvalid={!!errors.password}>
        <FormLabel>Password:</FormLabel>
        <Input type='password' {...register('password')} />
        <FormErrorMessage color='red' mt='10px'>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb='20px' isRequired isInvalid={!!errors.confirmPassword}>
        <FormLabel>Confirm Password:</FormLabel>
        <Input type='password' {...register('confirmPassword')} />
        <FormErrorMessage color='red' mt='10px'>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb='20px' isRequired isInvalid={!!errors.interests}>
        <FormLabel>Interests:</FormLabel>
        <Stack direction={['column']}>
          <Checkbox {...register('interests')} id='sports' value='Sports'>Sports</Checkbox>
          <Checkbox {...register('interests')} id='music' value='Music'>Music</Checkbox>
          <Checkbox {...register('interests')} id='dancing' value='Dancing'>Dancing</Checkbox>
          <Checkbox {...register('interests')} id='games' value='Games'>Games</Checkbox>
        </Stack>
        <FormErrorMessage color='red' mt='10px'>{errors.interests?.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}

export default FormFirstStep