import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"
import { Merge, FieldError } from "react-hook-form"
import IFormStepProps from "../../lib/interfaces"


function FormSecondStep({ register, errors }: IFormStepProps) {
  return (
    <FormControl mb='20px' isRequired isInvalid={!!errors.avatar}>
      <FormLabel>Upload avatar:</FormLabel>
      <Input type='file' {...register('avatar')} />
      <FormErrorMessage color='red' mt='10px'> {(errors.avatar as Merge<FieldError, (FieldError | undefined)[]> | undefined)?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default FormSecondStep