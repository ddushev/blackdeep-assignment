import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
} from '@chakra-ui/react';

interface IStep {
  title: string,
  description: string,
  fields?: string[]
}

interface IFormStepsProps {
  steps: IStep[],
  activeStep: number,
}

function FormSteps({ steps, activeStep }: IFormStepsProps) {
  return (
    <Stepper data-testid="stepper" display={['none', 'none', 'flex']} index={activeStep} mb='40px'>
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
  )
}

export default FormSteps