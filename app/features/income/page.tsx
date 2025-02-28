import { useNavigate } from 'react-router';
import CTAButton from '~/components/CTAButton';
import TextInput from '~/components/TextInput';
import Txt from '~/components/Txt';
import { useIncome } from '~/features/income/context';

export default function SalaryInputPage() {
  const { income, setIncome } = useIncome();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/deductions');
  };

  return (
    <>
      <Txt size="2xl" weight="bold" style={{ marginBottom: '1rem' }}>
        세금 계산기
      </Txt>

      <form onSubmit={handleSubmit}>
        <TextInput
          name="annualIncome"
          label="연봉"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="연봉을 입력하세요"
          required
        />

        <CTAButton type="submit">다음</CTAButton>
      </form>
    </>
  );
}
