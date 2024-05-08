import { render, screen } from '@testing-library/react';
import FormSteps from './FormSteps';


const steps = [
  { title: 'Step 1', description: 'Description for Step 1' },
  { title: 'Step 2', description: 'Description for Step 2' },
];


describe('FormSteps component', () => {
  test('renders all steps correctly', () => {
    render(<FormSteps steps={steps} activeStep={0} />);

    steps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

});
