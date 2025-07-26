interface StepHeaderProps {
  stepNumber: number;
  title: string;
}

export default function StepHeader({ stepNumber, title }: StepHeaderProps) {
  return (
    <div className="step-header">
      <div className="step-number">{stepNumber}</div>
      <h2 className="step-title">{title}</h2>
    </div>
  );
} 