import Txt from "~/components/Txt";
import { useRefundEstimateContext } from "./context";
import { formatToKoreanWon } from "~/components/shared/utils";
import { useUser } from "../user/hooks";

export default function RefundEstimatePage() {
  const user = useUser();
  const { lastName } = user.data;

  const { refundResult } = useRefundEstimateContext();
  const { refundAmount } = refundResult;

  const displayAmount =
    refundAmount < 0 ? Math.abs(refundAmount) : refundAmount;

  return (
    <Txt size="xl" weight="bold">
      {lastName}님의 환급액은 {formatToKoreanWon(displayAmount)}원 입니다.
    </Txt>
  );
}
